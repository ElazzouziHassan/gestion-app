import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router";  // Import Link for navigation

const StudentRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cycle, setCycle] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [major, setMajor] = useState("");
  const [promo, setPromo] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/mobile-auth/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          studentNumber,
          email,
          password,
          cycle,
          currentSemester,
          major,
          promo,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Succès", "Étudiant créé avec succès!", [
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
      <Text style={styles.title}>Inscription Étudiant</Text>
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
        value={studentNumber}
        onChangeText={setStudentNumber}
        style={styles.input}
        placeholder="Numéro d'étudiant"
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
        value={cycle}
        onChangeText={setCycle}
        style={styles.input}
        placeholder="Cycle"
      />
      <TextInput
        value={currentSemester}
        onChangeText={setCurrentSemester}
        style={styles.input}
        placeholder="Semestre actuel"
      />
      <TextInput
        value={major}
        onChangeText={setMajor}
        style={styles.input}
        placeholder="Majeure"
      />
      <TextInput
        value={promo}
        onChangeText={setPromo}
        style={styles.input}
        placeholder="Promo"
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

export default StudentRegister;
