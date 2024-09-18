import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';

const AvailBooksScreen = ({ navigation, route }) => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await firestore().collection("books").get();
      const books = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMyData(books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBoxChange = (id, value, bookDetails) => {
    setCheckedItems(prevState => ({ ...prevState, [id]: value }));

    if (value) {
      Alert.alert(
        'Confirm Issuing',
        `Do you want to issue "${bookDetails.bookName}" by "${bookDetails.authorName}"?`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              setCheckedItems(prevState => ({ ...prevState, [id]: false }));
            },
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              bookDetails.quantity = bookDetails.quantity - 1;
              navigation.navigate('Issued book', {
                bookDetails
              });
            }
          }
        ],
        { cancelable: false }
      );
    }
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
              <Text style={styles.bookName}>Book Name: {item.bookName}</Text>
              <Text style={styles.authorName}>Author: {item.authorName}</Text>
              <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            </View>
            <CheckBox
              value={checkedItems[item.id] || false}
              onValueChange={(newValue) => handleCheckBoxChange(item.id, newValue, item)}
              style={styles.checkBox}
              tintColors={{ true: 'white', false: 'white' }}
            />
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
    backgroundColor: "lightblue"
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
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white"
  },
  authorName: {
    fontSize: 16,
    marginTop: 4,
    color: "white"
  },
  quantity: {
    fontSize: 14,
    marginTop: 4,
    color: "white"
  },
  checkBox: {
    alignSelf: 'flex-end',
  },
});

export default AvailBooksScreen;
