import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const listofbookScreen = ({ navigation, route }) => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await firestore().collection("issuedbook").get();
      const books = data.docs.map(doc => {
        const docData = doc.data();
        // Convert Firestore Timestamp to Date string
        if (docData.date && docData.date.toDate) {
          docData.date = docData.date.toDate().toLocaleString();
        }
        return {
          id: doc.id,
          ...docData,
        };
      });
      setMyData(books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Deposit',
      'Do you want to deposit this book?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await firestore().collection('issuedbook').doc(id).delete();
              setMyData(myData.filter(item => item.id !== id));
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={myData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.studentName}>Student Name: {item.student}</Text>
              <Text style={styles.bookname}>Book Name: {item.bookName}</Text>
              <Text style={styles.authorName}>Author: {item.authorName}</Text>
              <Text style={styles.Date}>Date: {item.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Deposit Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "lightblue",
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
  },
  authorName: {
    fontSize: 16,
    marginTop: 4,
    color: "white",
  },
  bookname: {
    fontSize: 16,
    marginTop: 4,
    color: "white",
  },
  Date: {
    fontSize: 16,
    marginTop: 4,
    color: "white",
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 7,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default listofbookScreen;
