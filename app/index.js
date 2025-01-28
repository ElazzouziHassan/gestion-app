import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      
      <Image
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />

      <Text style={styles.welcomeMessage}>
        Bienvenue sur, l'application de gestion dédiée aux promotions du cycle master de l'Université Chouaib Doukkali - Faculté des Sciences. Simplifiez l'organisation de vos emplois du temps et accédez facilement aux informations essentielles.
      </Text>

      <Link href="/auth/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.footerText}>
        Tous les droits sont réservés à l'Université Chouaib Doukkali © {currentYear}
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 290,
    height: 290,
    marginBottom: 30,
    marginTop:40,
  },
  welcomeMessage: {
    fontSize: 14,
    textAlign:"center",
    color: '#333',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#0b1320',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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
  footerText: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});