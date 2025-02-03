import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu from '../../components/menu';

const Schedules = () => {
  // Mock emploi du temps
  const schedules = [
    { id: '1', course: "Big Data", time: "Lundi 10:00 - 12:00", room: "Salle 101" },
    { id: '2', course: "Machine Learning", time: "Mercredi 14:00 - 16:00", room: "Salle 202" },
    { id: '3', course: "Cloud Computing", time: "Vendredi 08:00 - 10:00", room: "Salle 303" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <Text style={styles.sectionTitle}>Mon Emploi du Temps</Text>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.scheduleCard}>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.room}>{item.room}</Text>
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
  scheduleCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  course: { fontSize: 16, fontWeight: '600', color: '#0b1320' },
  time: { fontSize: 14, color: '#666' },
  room: { fontSize: 14, color: '#48A6A7' },
  listContent: { paddingBottom: 100 },
});

export default Schedules;
