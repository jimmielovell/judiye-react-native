import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigator from './login';
import SignupNavigator from './signup';
import wrapper from 'hoc/wrapper';

const Stack = createNativeStackNavigator();

const AuthNavigator = wrapper(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginNavigator} />
      <Stack.Screen name="Signup" component={SignupNavigator} />
    </Stack.Navigator>
  );
});

export default AuthNavigator;
