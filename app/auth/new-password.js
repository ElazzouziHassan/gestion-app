import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const SetUpNewPassword = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" hidden={false} />
        <Image
          source={require('../../assets/logo.png')}
          style={styles.image}
        />
        
        <Text style={styles.label}>Créez un nouveau mot de passe sécurisé.</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nouveau mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmez votre nouveau mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
        />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
        
        <Link href="/auth/login" style={styles.link}>
          Revenir à l'écran de connexion
        </Link>
        
        <Text style={styles.info}>
          Pour des raisons de sécurité, assurez-vous de choisir un mot de passe unique et de ne pas le partager.
        </Text>
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
  label: {
    width: '100%',
    fontSize: 14,
    fontWeight:"bold",
    marginBottom: 12,
    textAlign:"center",
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
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
  info: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});

export default SetUpNewPassword;