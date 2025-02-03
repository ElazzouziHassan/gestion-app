// app/prof/profile.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu from '../../components/menu';

const ProfessorProfile = () => {
  const professorData = {
    name: "Dr. Ahmed Karim",
    email: "ahmed.karim@ucd.ac.ma",
    department: "Informatique",
    phone: "+212 6 12 34 56 78",
    office: "Bureau 305, Bâtiment Principal",
    bio: "Professeur en systèmes informatiques avec 15 ans d'expérience dans l'enseignement et la recherche.",
    avatar: require('../../assets/prof-avatar.png'),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={professorData.avatar} style={styles.avatar} />
          <Text style={styles.name}>{professorData.name}</Text>
          <Text style={styles.department}>{professorData.department}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Personnelles</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{professorData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone:</Text>
            <Text style={styles.infoValue}>{professorData.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bureau:</Text>
            <Text style={styles.infoValue}>{professorData.office}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bio Professionnelle</Text>
          <Text style={styles.bioText}>{professorData.bio}</Text>
        </View>
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
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 5,
  },
  department: {
    fontSize: 18,
    color: '#48A6A7',
    marginBottom: 15,
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
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    width: '40%',
  },
  infoValue: {
    fontSize: 16,
    color: '#0b1320',
    width: '60%',
    fontWeight: '500',
  },
  bioText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  footerText: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default ProfessorProfile;