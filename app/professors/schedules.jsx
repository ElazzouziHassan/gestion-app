import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons';
import Menu from '../../components/menu';

const ScheduleScreen = () => {
  const scheduleData = [
    {
      subject: "Développement Multiplateforme",
      day: "Lundi",
      time: "14:30-17:15",
      room: "Salle 21",
      program: "MASTER 2IAD"
    },
    {
      subject: "Machine Learning",
      day: "Mardi",
      time: "10:30-11:45",
      room: "Salle 20",
      program: "MASTER BIBDA"
    },
    {
      subject: "Cloud Computing",
      day: "Jeudi",
      time: "14:30-15:30",
      room: "Salle 21",
      program: "MASTER 2IAD"
    }
  ];

  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #0b1320; text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #000; padding: 10px; text-align: left; }
              th { background-color: #f5f5f5; }
            </style>
          </head>
          <body>
            <h1>Emploi du Temps</h1>
            <table>
              <tr>
                <th>Matière</th>
                <th>Jour</th>
                <th>Heure</th>
                <th>Salle</th>
                <th>Cycle de Master</th>
              </tr>
              ${scheduleData.map(item => `
                <tr>
                  <td>${item.subject}</td>
                  <td>${item.day}</td>
                  <td>${item.time}</td>
                  <td>${item.room}</td>
                  <td>${item.program}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      alert("Erreur lors de la génération du PDF");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Mon Emploi du Temps</Text>
        <TouchableOpacity onPress={generatePDF} style={styles.downloadButton}>
          <MaterialIcons name="file-download" size={24} color="#0b1320" />
          <Text style={styles.downloadText}>Télécharger</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {scheduleData.map((item, index) => (
          <View key={index} style={styles.scheduleCard}>
            <Text style={styles.subject}>{item.subject}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>{item.day} {item.time}</Text>
              <Text style={styles.detailText}>{item.room}</Text>
            </View>
            <Text style={styles.program}>{item.program}</Text>
          </View>
        ))}
      </ScrollView>

      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0b1320',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  downloadText: {
    color: '#0b1320',
    fontWeight: '500',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  scheduleCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b1320',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: {
    color: '#666',
    fontSize: 14,
  },
  program: {
    color: '#48A6A7',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ScheduleScreen;