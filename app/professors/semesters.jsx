import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu from '../../components/menu';

const Semesters = () => {
  // Mock semestres et modules
  const semesters = [
    { id: '1', semester: "Semestre 1", modules: ["Big Data", "Cloud Computing", "Machine Learning"] },
    { id: '2', semester: "Semestre 2", modules: ["Deep Learning", "IA Avancée", "Blockchain"] },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <Text style={styles.sectionTitle}>Mes Semestres</Text>
      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.semesterCard}>
            <Text style={styles.semesterTitle}>{item.semester}</Text>
            {item.modules.map((module, index) => (
              <Text key={index} style={styles.moduleItem}>• {module}</Text>
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0b1320', marginBottom: 15 },
  semesterCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  semesterTitle: { fontSize: 16, fontWeight: '600', color: '#0b1320', marginBottom: 5 },
  moduleItem: { fontSize: 14, color: '#666' },
  listContent: { paddingBottom: 100 },
});

export default Semesters;
