import { Button, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
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
        <Text style={styles.title}>Accéder à votre compte</Text>
        <TextInput
          placeholder="Entrez votre nom d'utilisateur"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Entrez votre mot de passe"
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />        
        <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Connexion</Text>
                </TouchableOpacity>
        <Link href="/auth/forgot-password" style={styles.link}>
          Mot de passe oublié ?
        </Link>
        <Text style={styles.footerText}>
          Les identifiants de connexion sont fournis par l'établissement. Contactez l'administration en
          cas de problème.
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

export default Login;