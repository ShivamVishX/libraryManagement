import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      navigation.navigate('Home');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Invalid Email', 'The email address is badly formatted.');
          break;
        case 'auth/user-not-found':
          Alert.alert('User Not Found', 'No user found with this email.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Incorrect Password', 'The password is incorrect.');
          break;
        default:
          Alert.alert('Login Error', error.message);
      }
    } finally {
      setLoading(false);
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
            placeholderTextColor="black"
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
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


