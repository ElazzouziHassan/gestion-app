import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      <Text style={styles.header}>This is home Page</Text>
      <Link href="/auth/login" style={styles.link}>Go to login</Link>
      <Link href="/auth/forgot-password" style={styles.link}>Go to Forgot Password</Link>
      <Link href="/auth/new-password" style={styles.link}>Go to Set Up New Password</Link>
      <Link href="/auth/alert" style={styles.link}>alert</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: '#1e90ff',
    marginVertical: 10,
  },
});