import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

function AddBookScreen() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addBook = async () => {
    if (bookName.trim() === '' || authorName.trim() === '' || quantity.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      await firestore().collection('books').add({
        bookName,
        authorName,
        quantity: parseInt(quantity, 10),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Book added successfully.');
      setBookName('');
      setAuthorName('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding book: ', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ImageBackground
      source={require('C:/Users/opshi/OneDrive/Desktop/projects/libraryManagement02/images/addbook.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TextInput
          placeholder='Name of book'
          placeholderTextColor={"black"}
          value={bookName}
          onChangeText={setBookName}
          style={styles.input}
        />
        <TextInput
          placeholder='Author name'
          placeholderTextColor={"black"}
          value={authorName}
          onChangeText={setAuthorName}
          style={styles.input}
        />
        <TextInput
          placeholder='Quantity'
          placeholderTextColor={"black"}
          value={quantity}
          onChangeText={setQuantity}
          style={styles.input}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.addButton} onPress={addBook}>
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
  addButton: {
    backgroundColor: 'blue',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddBookScreen;

