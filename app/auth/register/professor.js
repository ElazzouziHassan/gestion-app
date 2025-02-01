import { Button, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const RegisterProfessor = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    status: '',
    module: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = () => {
    const professorData = {
      ...form,
      role: 'professor',
      createdAt: new Date().toISOString(),
    };
    console.log('Registering professor:', professorData);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" hidden={false} />
        <Image source={require('../../../assets/logo.png')} style={styles.image} />
        <Text style={styles.title}>Inscription Professeur</Text>
        
        <TextInput placeholder="Prénom" style={styles.input} onChangeText={(text) => handleChange('firstName', text)} />
        <TextInput placeholder="Nom" style={styles.input} onChangeText={(text) => handleChange('lastName', text)} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={(text) => handleChange('email', text)} />
        <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry onChangeText={(text) => handleChange('password', text)} />
        <TextInput placeholder="Statut (Permanent/Vacataire)" style={styles.input} onChangeText={(text) => handleChange('status', text)} />
        <TextInput placeholder="Modules enseignés" style={styles.input} onChangeText={(text) => handleChange('module', text)} />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <Link href="/auth/login" style={styles.link}>Déjà inscrit ? Connectez-vous</Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#0b1320',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 15,
    marginBottom: 120,
    color: '#48A6A7',
    textDecorationLine: 'underline',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default RegisterProfessor;
