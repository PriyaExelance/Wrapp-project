/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OopsScreen from './src/screens/OopsScreen';
import {RootStack} from './src/navigation/RootStack';
import ExploreScreen from './src/screens/ExploreScreen';
import EmojiComponent from './src/components/EmojiComponent';
import SignupComponent from './src/components/SignupComponent';
import MaininfoComponent from './Wrapp-project/src/components/MaininfoComponent';
function App() {
  return <RootStack />;
}
export default App;
