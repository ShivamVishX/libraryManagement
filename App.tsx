import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack =createNativeStackNavigator();
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import signUpScreen from './screens/signUp';


const App = () => {
  return (
    <NavigationContainer  >
      <stack.Navigator >
      
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Home" component={HomeScreen} />
      <stack.Screen name="SignUp" component={signUpScreen} />
     
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;