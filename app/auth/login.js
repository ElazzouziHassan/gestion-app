import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.0.115:3000/api/mobile'; // Replace with your actual API URL

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { success, token, user } = response.data;

      if (success) {
        // Store user data
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userRole', user.role);
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));

        // Navigate based on role
        if (user.role === 'student') {
          router.replace('/students/home');
        } else if (user.role === 'professor') {
          router.replace('/professors/home');
        }
      }
    } catch (error) {
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      if (error.response) {
        // Server responded with an error
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'Impossible de joindre le serveur';
      }
      
      Alert.alert('Erreur de connexion', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
          placeholder="Entrez votre adresse e-mail"
          style={styles.input}
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />
        <TextInput
          placeholder="Entrez votre mot de passe"
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Connexion</Text>
          )}
        </TouchableOpacity>
        <Link href="/auth/forgot-password" style={[styles.link, isLoading && styles.linkDisabled]}>
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
  buttonDisabled: {
    opacity: 0.7,
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
  linkDisabled: {
    opacity: 0.7,
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