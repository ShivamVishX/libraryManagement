import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';

const signUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Account created successfully!');
      setEmail("");
      setPassword("");
      navigation.navigate('Home'); // Navigate back to home screen after successful sign-up
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'The email address is already in use by another account.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is badly formatted.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'The password is too weak.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('C:/Users/opshi/OneDrive/Desktop/projects/libraryManagement02/images/bookimage.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"black"}
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"black"}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color:"black"
  },
  signupButton: {
    backgroundColor: 'blue',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default signUpScreen;
