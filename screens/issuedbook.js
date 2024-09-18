import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';

function IssuedBookScreen({ route }) {
  const { bookName, authorName } = route.params.bookDetails;
  const [student, setStudent] = useState('');
  const [date, setDate] = useState(new Date());

  const handleIssue = async () => {
    if (student.trim() === '') {
      Alert.alert( 'Fill the student name');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear the time part of the date

    if (date < today) {
      Alert.alert( 'Date cannot be in the past');
      return;
    }

    try {
      await firestore().collection('issuedbook').add({
        bookName,
        authorName,
        student,
        date
      });
      Alert.alert('Success', 'Book issued successfully!');
      setStudent(''); // Clear the student input box
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Failed to issue book.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Book name'
        value={bookName}
        style={styles.text}
        editable={false} // Make it non-editable
      />
      <TextInput
        placeholder='Author name'
        value={authorName}
        style={styles.text}
        editable={false} // Make it non-editable
      />
      <TextInput
        style={styles.text}
        placeholder='Student name'
        value={student}
        onChangeText={setStudent}
        placeholderTextColor="black"
      />
      <View style={styles.dateWrapper}>
        <DatePicker
          date={date}
          onDateChange={setDate}
          minimumDate={new Date()} // Set the minimum date to today
         
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleIssue}>
        <Text style={styles.buttontext}>Issue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"lightblue" 
  },
  
  dateWrapper: {
    
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    borderWidth: 1,
    margin: 10,
    width: 200,
    padding: 10,
  },
  buttontext: {
    color:"black",
    fontWeight:"bold",
    fontSize:30,
    paddingVertical:10,
    paddingHorizontal:20,
  },
  button: {
   borderColor:"black",
   borderWidth:2,
borderRadius:20
  }
});

export default IssuedBookScreen;

