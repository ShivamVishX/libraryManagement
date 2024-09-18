import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import addbookScreen from './addbook';
import availBooksScreen from './availbook';
import listofbookScreen from './listofissuedbook';
const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
   
    <Drawer.Navigator >
      <Drawer.Screen  name="AvailableBook" component={availBooksScreen} />
      
      <Drawer.Screen name="AddBook" component={addbookScreen} />
      <Drawer.Screen name="list of issued book" component={listofbookScreen} />
    </Drawer.Navigator>
    
  );
};


export default HomeScreen;
