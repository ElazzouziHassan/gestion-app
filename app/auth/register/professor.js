import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router";  // Import Link for navigation

const ProfessorRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [module, setModule] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(" http://192.168.0.134:3000/api/mobile-auth/professors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          status,
          module,
        }),
      });

      console.log("Making registration request", { firstName, lastName, email, password });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Succès", "Professeur créé avec succès!", [
          {
            text: "OK",
          },
        ]);
      } else {
        Alert.alert("Erreur", data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription Professeur</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        placeholder="Prénom"
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        placeholder="Nom"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
      />
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        placeholder="Statut"
      />
      <TextInput
        value={module}
        onChangeText={setModule}
        style={styles.input}
        placeholder="Module"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <Link href="/login" style={styles.link}>
        Retour à la connexion
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0b1320",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#48A6A7",
    textDecorationLine: "underline",
  },
});

export default ProfessorRegister;
