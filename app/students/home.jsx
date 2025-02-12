import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SMenu from '../../components/smenu';

const StudentHomeScreen = () => {
  // Données de l'étudiant
  const studentData = {
    name: "ELAZZOUZI HASSAN",
    program: "Cycle de Master 2IAD",
    email: "elazzouzi.h855@ucd.ac.ma",
    avatar: require('../../assets/prof-avatar.png') // Image d'avatar étudiant
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* En-tête avec avatar et infos */}
      <View style={styles.header}>
        <Image source={studentData.avatar} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{studentData.name}</Text>
          <Text style={styles.program}>{studentData.program}</Text>
          <Text style={styles.email}>{studentData.email}</Text>
        </View>
      </View>

      {/* Carte de bienvenue */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Bienvenue, {studentData.name}</Text>
        <Text style={styles.welcomeText}>
          Vous êtes inscrit au cycle de Master en Ingénierie Informatique et Analyse des Données. 
          Actuellement, vous suivez la session autonome S1.
        </Text>
      </View>

      {/* Menu de navigation */}
      <SMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b1320',
    textTransform: 'uppercase',
  },
  program: {
    fontSize: 14,
    color: '#48A6A7',
    marginTop: 4,
  },
  email: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  
});

export default StudentHomeScreen;
