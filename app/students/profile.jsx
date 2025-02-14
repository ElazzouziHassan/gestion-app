import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SMenu from '../../components/smenu';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const StudentProfileScreen = () => {
  const studentData = {
    name: "ELAZZOUZI HASSAN",
    program: "Cycle de Master 2IAD",
    email: "elazzouzi.h855@ucd.ac.ma",
    phone: "+212 6 12 34 56 78",
    bio: "Étudiant en cycle de master Ingénierie Informatique et Analyse des Données. Actuellement inscrit à la session autonome S1.",
    avatar: require('../../assets/student-avatar.png')
  };

  const generateStudentCard = async () => {
    const qrCodeData = JSON.stringify({
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      program: studentData.program,
    });

    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 20px; }
          .card { border: 2px solid #48A6A7; padding: 20px; border-radius: 10px; width: 300px; margin: auto; }
          .avatar { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px; }
          .name { font-size: 18px; font-weight: bold; color: #0b1320; }
          .info { font-size: 14px; color: #27445D; margin-top: 5px; }
          .qr-code { margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="card">
          <img src="data:image/png;base64,${await getBase64Image(studentData.avatar)}" class="avatar" />
          <div class="name">${studentData.name}</div>
          <div class="info">${studentData.program}</div>
          <div class="info">${studentData.email}</div>
          <div class="info">${studentData.phone}</div>
          <div class="qr-code">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrCodeData)}" />
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de générer la carte étudiant.");
    }
  };

  // Fonction pour convertir une image locale en base64
  const getBase64Image = async (image) => {
    const response = await fetch(Image.resolveAssetSource(image).uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={studentData.avatar} style={styles.avatar} />
          <Text style={styles.name}>{studentData.name}</Text>
          <Text style={styles.program}>{studentData.program}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generateStudentCard}>
              <MaterialIcons name="picture-as-pdf" size={20} color="#48A6A7" />
              <Text style={styles.buttonText}>Carte d'Étudiant</Text>
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
            <Text style={styles.infoValue}>{studentData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#48A6A7" />
            <Text style={styles.infoValue}>{studentData.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="certificate-outline" size={20} color="#48A6A7" />
            <Text style={styles.infoValue}>{studentData.program}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio Professionnelle</Text>
          <Text style={styles.bioText}>{studentData.bio}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <SMenu />
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
  program: {
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
    backgroundColor: '#d9534f',
    width:300,
    marginLeft:50,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 100,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StudentProfileScreen;
