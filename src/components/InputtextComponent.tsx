//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontSize} from '../helper/responsive';
interface Inputtext {
  label?: string;
  required?: boolean;
}
const InputtextComponent: React.FC<Inputtext> = ({label, required = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.style}>
        {label}
        {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  style: {
    fontSize: fontSize(15),
  },
});

//make this component available to the app
export default InputtextComponent;
