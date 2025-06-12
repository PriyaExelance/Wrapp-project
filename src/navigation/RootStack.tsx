//import liraries
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OopsScreen from '../screens/OopsScreen';
import {NavigationContainer} from '@react-navigation/native';
import ExploreScreen from '../screens/ExploreScreen';
import MakeScreen from '../screens/MakeScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailScreen from '../screens/EmailScreen';
import MainInfoScreen from '../screens/MainInfoScreen';
import LocationScreen from '../screens/LocationScreen';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OopsScreen" component={OopsScreen} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
        <Stack.Screen name="MakeScreen" component={MakeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="MainInfoScreen" component={MainInfoScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
