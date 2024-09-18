import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack =createNativeStackNavigator();
import AvailBooksScreen from './availableBook';
import issuedbookScreen from './issuedbook';


const BooksManagement = () => {
  return (
   
      <stack.Navigator screenOptions={{ headerShown: false, }}>
        
      <stack.Screen name="Available Book" component={AvailBooksScreen} />
      <stack.Screen name="Issued book" component={issuedbookScreen} />
 
      </stack.Navigator>
   
  );
}

export default BooksManagement;

