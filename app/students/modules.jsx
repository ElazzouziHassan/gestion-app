import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import SMenu from '../../components/smenu';

const StudentModules = () => {
  const [loading, setLoading] = useState(false);
  const [expandedSemesters, setExpandedSemesters] = useState({});
  const animationValues = {};

  const generateModules = (semester) => {
    return Array.from({ length: 7 }, (_, i) => ({
      id: `${semester}-${i + 1}`,
      name: `Module ${i + 1}`,
      description: `Cours avancé sur les concepts clés du ${semester.toLowerCase()}`
    }));
  };

  const semesters = [
    { id: '1', name: 'Premier Semestre (S1)', period: 'Session Automne - 2IAD', modules: generateModules('Premier Semestre') },
    { id: '2', name: 'Deuxième Semestre (S2)', period: 'Session Printemps - 2IAD', modules: generateModules('Deuxième Semestre') },
    { id: '3', name: 'Troisième Semestre (S3)', period: 'Session Automne - 2IAD', modules: generateModules('Troisième Semestre') },
    { id: '4', name: 'Quatrième Semestre (S4)', period: 'Session Printemps - 2IAD', modules: generateModules('Quatrième Semestre') },
  ];

  semesters.forEach(semester => {
    animationValues[semester.id] = new Animated.Value(0);
  });

  const toggleSemester = (id) => {
    const isExpanded = expandedSemesters[id];

    Animated.timing(animationValues[id], {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandedSemesters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = async (modules, semesterName) => {
    try {
      setLoading(true);

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 30px; }
              .header { background: #0b1320; padding: 20px; color: white; border-radius: 10px; margin-bottom: 25px; }
              h1 { color: #48A6A7; text-align: center; margin: 0; font-size: 24px; }
              h2 { color: #ffffff; text-align: center; margin: 5px 0 0 0; font-size: 18px; }
              table { width: 100%; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
              th, td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #48A6A7; color: white; font-weight: 600; }
              tr:nth-child(even) { background-color: #f8f9fa; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Université Chouaib Doukkali</h1>
              <h2>${semesterName}</h2>
            </div>
            <table>
              <tr>
                <th>Module</th>
                <th>Description</th>
              </tr>
              ${modules.map(module => `<tr><td>${module.name}</td><td>${module.description}</td></tr>`).join('')}
            </table>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Erreur export:', error);
      alert('Erreur lors de la génération du PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <LinearGradient colors={['#0b1320', '#1a237e']} style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="school" size={32} color="#fff" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.faculty}>Faculté des Sciences</Text>
            <Text style={styles.title}>Programme Master 2IAD</Text>
          </View>
        </View>
      </LinearGradient>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0b1320" />
          <Text style={styles.loadingText}>Génération du fichier...</Text>
        </View>
      )}

      <FlatList
        data={semesters}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }} // Correction pour éviter que le dernier élément soit caché
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSemester(item.id)} activeOpacity={0.8}>
            <View style={styles.semesterContainer}>
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterTitle}>{item.name}</Text>
                <Text style={styles.semesterPeriod}>{item.period}</Text>
              </View>

              <Animated.View style={{ height: animationValues[item.id].interpolate({ inputRange: [0, 1], outputRange: [0, 150] }), overflow: 'hidden' }}>
                <View style={styles.modulesContainer}>
                  {item.modules.map((module) => (
                    <Text key={module.id} style={styles.moduleText}>{module.name}</Text>
                  ))}
                </View>
              </Animated.View>

              <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(item.modules, item.name)}>
                <MaterialIcons name="file-download" size={20} color="white" />
                <Text style={styles.downloadText}>Télécharger</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <SMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, paddingTop: 15, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, marginBottom: 10 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerTextContainer: { marginLeft: 15 },
  faculty: { color: '#48A6A7', fontSize: 14, fontWeight: '500' },
  title: { color: 'white', fontSize: 20, fontWeight: '700' },
  semesterContainer: { backgroundColor: 'white', borderRadius: 15, padding: 20, marginBottom: 20, marginHorizontal: 20 },
  semesterHeader: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10, marginBottom: 10 },
  semesterTitle: { fontSize: 18, fontWeight: '700', color: '#0b1320' },
  semesterPeriod: { fontSize: 14, color: '#48A6A7' },
  modulesContainer: { paddingTop: 10 },
  moduleText: { fontSize: 14, color: '#0b1320', marginBottom: 5 },
  downloadButton: { backgroundColor: '#0b1320', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center' },
  downloadText: { color: 'white', fontSize: 14, fontWeight: '600' },
});

export default StudentModules;
