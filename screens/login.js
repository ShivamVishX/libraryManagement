import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'The email address is badly formatted.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User Not Found', 'There is no user corresponding to this email.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect Password', 'The password is incorrect.');
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground
      source={require('/Users/opshi/OneDrive/Desktop/projects/libraryManagement02/images/bookimage.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Library Management</Text>
        <View style={styles.container}>
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
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.signupText}>Create a new account?</Text>
          </TouchableOpacity>
        </View>
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    
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
  loginButton: {
    backgroundColor: 'blue',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default LoginScreen;
