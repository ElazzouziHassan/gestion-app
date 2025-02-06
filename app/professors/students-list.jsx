import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as XLSX from 'xlsx';
import { MaterialIcons } from '@expo/vector-icons';
import Menu from '../../components/menu';

const StudentsListScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const generateStudents = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Étudiant ${i + 1}`,
      matricule: `MAT00${i + 1}`,
      email: `etudiant${i + 1}@ucd.ac.ma`,
      programme: 'Master SIAD',
    }));
  };

  const allStudents = generateStudents(100);
  const totalPages = Math.ceil(allStudents.length / itemsPerPage);

  const getPaginatedStudents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allStudents.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleExport = async (type) => {
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
                  <th>Email</th>
                  <th>Programme</th>
                </tr>
                ${allStudents.map(student => `
                  <tr>
                    <td>${student.name}</td>
                    <td>${student.matricule}</td>
                    <td>${student.email}</td>
                    <td>${student.programme}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
          </html>
        `;

        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
      }
      else if (type === 'excel') {
        const wsData = [
          ['Nom', 'Matricule', 'Email', 'Programme'],
          ...allStudents.map(student => [
            student.name,
            student.matricule,
            student.email,
            student.programme
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Liste des Étudiants</Text>
        
        <View style={styles.exportButtons}>
          <TouchableOpacity 
            style={[styles.exportButton, styles.pdfButton]}
            onPress={() => handleExport('pdf')}
            disabled={loading}
          >
            <MaterialIcons name="picture-as-pdf" size={18} color="white" />
            <Text style={styles.exportText}>PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.exportButton, styles.excelButton]}
            onPress={() => handleExport('excel')}
            disabled={loading}
          >
            <MaterialIcons name="description" size={18} color="white" />
            <Text style={styles.exportText}>Excel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0b1320" />
          <Text style={styles.loadingText}>Génération du fichier...</Text>
        </View>
      ) : (
        <FlatList
          data={getPaginatedStudents()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentInfo}>Matricule: {item.matricule}</Text>
              <Text style={styles.studentInfo}>Email: {item.email}</Text>
              <Text style={styles.studentInfo}>Programme: {item.programme}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
            onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageText}>Précédent</Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            Page {currentPage} sur {totalPages}
          </Text>

          <TouchableOpacity
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
            onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pdfButton: {
    backgroundColor: '#d32f2f',
  },
  excelButton: {
    backgroundColor: '#2e7d32',
    marginLeft: 15,
  },
  exportText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 18,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b1320',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  studentInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pageButton: {
    backgroundColor: '#48A6A7',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
  pageText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  pageInfo: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default StudentsListScreen;