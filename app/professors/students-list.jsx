import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as XLSX from 'xlsx';
import { MaterialIcons } from '@expo/vector-icons';
import Menu from '../../components/menu';

const StudentsListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [masterPrograms, setMasterPrograms] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://192.168.0.109:3000/api/mobile/students');
        const data = await response.json();

        if (response.ok) {
          // Group students by cycleName
          const groupedStudents = data.reduce((acc, student) => {
            const cycleName = student.cycleName;
            if (!acc[cycleName]) {
              acc[cycleName] = [];
            }
            acc[cycleName].push(student);
            return acc;
          }, {});

          // Transform grouped data into masterPrograms format
          const programs = Object.keys(groupedStudents).map((cycleName, index) => ({
            id: String(index + 1),
            name: cycleName,
            count: groupedStudents[cycleName].length,
            students: groupedStudents[cycleName].map((student, i) => ({
              id: student._id,
              name: `${student.firstName} ${student.lastName}`,
              matricule: student.studentNumber,
            })),
          }));

          setMasterPrograms(programs);
        } else {
          setError(data.message || 'Failed to fetch students');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsFetching(false);
      }
    };

    fetchStudents();
  }, []);

  const handleExport = async (type, students) => {
    try {
      setLoading(true);

      if (type === 'pdf') {
        const html = `
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h1 { color: #0b1320; text-align: center; }
              </style>
            </head>
            <body>
              <h1>Liste des Étudiants</h1>
              <table>
                <tr>
                  <th>Nom</th>
                  <th>Matricule</th>
                </tr>
                ${students.map(student => `
                  <tr>
                    <td>${student.name || 'N/A'}</td>
                    <td>${student.matricule || 'N/A'}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
          </html>
        `;

        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
      } else if (type === 'excel') {
        const wsData = [
          ['Nom', 'Matricule'],
          ...students.map(student => [
            student.name || 'N/A', // Fallback to 'N/A' if name is undefined
            student.matricule || 'N/A' // Fallback to 'N/A' if matricule is undefined
          ])
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Étudiants');
        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

        const uri = FileSystem.documentDirectory + 'etudiants.xlsx';
        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Erreur export:', error);
      alert('Erreur lors de l\'exportation');
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0b1320" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <Text style={styles.mainTitle}>Liste des Étudiants</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0b1320" />
          <Text style={styles.loadingText}>Génération du fichier...</Text>
        </View>
      )}

      <FlatList
        data={masterPrograms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programName}>{item.name}</Text>
              <Text style={styles.studentCount}>{item.count} étudiants</Text>
            </View>
            
            <View style={styles.exportButtons}>
              <TouchableOpacity 
                style={[styles.exportButton, styles.pdfButton]}
                onPress={() => handleExport('pdf', item.students)}
              >
                <MaterialIcons name="picture-as-pdf" size={18} color="white" />
                <Text style={styles.exportText}>PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.exportButton, styles.excelButton]}
                onPress={() => handleExport('excel', item.students)}
              >
                <MaterialIcons name="description" size={18} color="white" />
                <Text style={styles.exportText}>Excel</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 25,
    textAlign: 'center',
  },
  programCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b1320',
  },
  studentCount: {
    fontSize: 14,
    color: '#666',
  },
  exportButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 5,
  },
  pdfButton: {
    backgroundColor: '#d32f2f',
  },
  excelButton: {
    backgroundColor: '#2e7d32',
  },
  exportText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default StudentsListScreen;