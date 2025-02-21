import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Menu from '../../components/menu';

const API_URL = 'http://192.168.0.109:3000/api/mobile';

const ProfessorHome = () => {
  const [loading, setLoading] = useState(true);
  const [professorData, setProfessorData] = useState(null);
  const [mastersCycles, setMastersCycles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        router.replace('/login');
        return;
      }

      const api = axios.create({
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${token}` }
      });

      const [professorsResponse, cyclesResponse] = await Promise.all([
        api.get('/professors'),
        api.get('/cycles')
      ]);

      if (professorsResponse.data && Array.isArray(professorsResponse.data)) {
        const currentProfessor = professorsResponse.data.find(prof => prof._id === userId);
        if (currentProfessor) {
          setProfessorData(currentProfessor);
        } else {
          throw new Error('Professor not found');
        }
      }

      if (cyclesResponse.data && Array.isArray(cyclesResponse.data)) {
        setMastersCycles(cyclesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        'Impossible de charger les données. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
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
      
      {/* Header Section */}
      <View style={styles.header}>
        <Image 
          source={
            professorData.profilePicture 
              ? { uri: `${API_URL}/uploads/${professorData.profilePicture}` }
              : require('../../assets/prof-avatar.png')
          } 
          style={styles.avatar} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Dr. {professorData.firstName} {professorData.lastName}</Text>
          <Text style={styles.department}>Iformatique</Text>
          <Text style={styles.email}>{professorData.email}</Text>
        </View>
      </View>

      {/* Masters Cycles List */}
      <Text style={styles.sectionTitle}>Mes Cycles Master</Text>
      <FlatList
        data={mastersCycles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.courseCard}
            onPress={() => router.push(`/professors/cycle/${item._id}`)}
          >
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Aucun cycle master assigné</Text>
        }
      />

      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 4,
  },
  department: {
    fontSize: 16,
    color: '#48A6A7',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b1320',
    marginBottom: 15,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b1320',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ProfessorHome;