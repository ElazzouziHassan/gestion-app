import { Image, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" hidden={false} />
        
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
        
        <Text style={styles.title}>
          Bienvenue sur l'application de gestion dédiée aux promotions du cycle master de l'Université Chouaib Doukkali - Faculté des Sciences.
        </Text>
        
        <Text style={styles.subtitle}>
          Simplifiez l'organisation de vos emplois du temps et accédez facilement aux informations essentielles.
        </Text>
        
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/professors/home" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Professeur</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/students/home" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
        </Link>
        
        <Text style={styles.footerText}>
          Tous les droits sont réservés à l'Université Chouaib Doukkali © {currentYear}
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
    width: 280,
    height: 280,
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: "italic",
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
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
  footerText: {
    marginTop: 60,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 20,
  },
});

export default Home;
