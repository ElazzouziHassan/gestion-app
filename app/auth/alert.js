import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

const Alert = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      {/* Icône de succès */}
      <Image
        source={require('../../assets/done.png')} // Remplacez par l'icône de succès appropriée
        style={styles.image}
      />
      
      {/* Message de confirmation */}
      <Text style={styles.title}>Réinitialisation réussie !</Text>
      <Text style={styles.message}>
        Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant utiliser votre nouveau mot de passe pour vous connecter.
      </Text>
      
      {/* Bouton pour revenir à la page de connexion */}
      <TouchableOpacity style={styles.button}>
        <Link href="/auth/login" style={styles.buttonText}>
          Revenir à la connexion
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0b1320',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});
