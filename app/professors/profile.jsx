import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Menu from '../../components/menu';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const API_URL = 'http://192.168.0.109:3000/api/mobile';

const ProfessorProfile = () => {
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const avatar = require('../../assets/prof-avatar.png')

  const router = useRouter();

  useEffect(() => {
    fetchProfessorData();
  }, []);

  const fetchProfessorData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        router.replace('/auth/login');
        return;
      }

      const api = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` }
      });

      const response = await api.get('/professors');
      if (response.data && Array.isArray(response.data)) {
        const currentProfessor = response.data.find(prof => prof._id === userId);
        if (currentProfessor) {
          setProfessorData(currentProfessor);
        } else {
          throw new Error('Professor not found');
        }
      }
    } catch (error) {
      console.error('Error fetching professor data:', error.response?.data || error.message);
      Alert.alert('Erreur', 'Impossible de charger les données. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 20px; }
              .card { border: 2px solid #48A6A7; padding: 20px; border-radius: 10px; width: 300px; margin: auto; }
              .info { font-size: 14px; color: #27445D; margin-top: 5px; }
              .qr-container { margin-top: 15px; }
              .avatar { width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; }
              h2, p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="card">
              <div style="text-align: center;">
                <img src="${avatar}" class="avatar" />
                <h2>${professorData.name}</h2>
                <p>${professorData.department}</p>
              </div>
              <div class="info">
                <p><strong>Email :</strong> ${professorData.email}</p>
                <p><strong>Téléphone :</strong> ${professorData.phone}</p>
                <p><strong>Bureau :</strong> ${professorData.office}</p>
              </div>
              <div class="qr-container">
                <p><strong>QR Code :</strong></p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${professorData.qrData}" />
              </div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Partager la carte du professeur' });

    } catch (error) {
      Alert.alert("Erreur", "Échec de la génération du PDF");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      router.replace('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Erreur', 'Échec de la déconnexion. Veuillez réessayer.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#48A6A7" />
      </View>
    );
  }

  if (!professorData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load professor data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={ require('../../assets/prof-avatar.png') } style={styles.avatar} />
          <Text style={styles.name}>{'Dr. '+professorData.firstName+ ' '+ professorData.lastName}</Text>
          <Text style={styles.department}>Informatique</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generatePDF}>
              <MaterialIcons name="picture-as-pdf" size={20} color="#48A6A7" />
              <Text style={styles.buttonText}>Carte Professeur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="edit" size={20} color="#48A6A7" />
              <Text style={styles.buttonText}>Modifier Profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Personnelles</Text>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#48A6A7" />
            <Text style={styles.infoValue}>{professorData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#48A6A7" />
            <Text style={styles.infoValue}>{professorData.telephone}</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="building" size={20} color="#48A6A7" />
            <Text style={styles.infoValue}>Bureau 05, Département Informatique</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio Professionnelle</Text>
          <Text style={styles.bioText}>Professeur en systèmes informatiques avec 7 ans d'expérience dans l'enseignement et la recherche.</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>

      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 5,
  },
  department: {
    fontSize: 18,
    color: '#48A6A7',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#48A6A7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#48A6A7',
    marginLeft: 5,
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b1320',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 14,
    color: '#27445D',
    fontWeight: '500',
  },
  bioText: {
    fontSize: 16,
    color: '#27445D',
    lineHeight: 24,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfessorProfile;