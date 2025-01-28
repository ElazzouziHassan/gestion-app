import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const ForgotPassword = () => {
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
        <Text style={styles.title}>
          Veuillez saisir votre adresse e-mail associée à votre compte. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre email universitaire"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Envoyer le lien de réinitialisation</Text>
        </TouchableOpacity>
        <Link href="/auth/login" style={styles.link}>
          Revenir à l'écran de connexion
        </Link>
        <Text style={styles.info}>
          Pour des raisons de sécurité, seules les demandes des utilisateurs valides peuvent être
          traitées. Merci de vérifier vos informations.
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
    marginBottom: 40,
  },
  input: {
    width: '100%',
    textAlign:"center",
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    textAlign:"center",
    color: '#333',
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

export default ForgotPassword;