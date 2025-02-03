import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu from '../../components/menu';

const ProfessorHome = () => {
  // Mock data
  const professorData = {
    name: "Dr. BOUTKHOUM Omar",
    email: "boutkhoum.omar@ucd.ac.ma",
    department: "Informatique",
    avatar: require('../../assets/prof-avatar.png'),
  };

  const mastersCycles = [
    { id: '1', name: "Cycle de Master 2IAD", description: "Ingénierie Informatique et Analyse des Données" },
    { id: '2', name: "Cycle de Master BIBDA", description: "Business Intelligence et Big Data Analytics" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={professorData.avatar} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{professorData.name}</Text>
          <Text style={styles.department}>{professorData.department}</Text>
          <Text style={styles.email}>{professorData.email}</Text>
        </View>
      </View>

      {/* Masters Cycles List */}
      <Text style={styles.sectionTitle}>Mes Cycles Master</Text>
      <FlatList
        data={mastersCycles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.name}</Text>
            <Text style={styles.courseDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      <Menu />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
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
  footerText: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
});

export default ProfessorHome;