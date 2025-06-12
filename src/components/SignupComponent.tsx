//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {images} from '../assets/images';
import {wp} from '../helper/responsive';
import {hp} from '../helper/responsive';
import {fontSize} from '../helper/responsive';
// create a component
interface Signup {
  btn?: string;
  style?: any;
  txt?: any;
  onPress?: any;
  img_source?: any;
  img_style?: any;
  isSelected?: any;
}
const SignupComponent: React.FC<Signup> = ({
  btn,
  style,
  txt,
  img_source,
  img_style,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={img_source} style={img_style} />
      <Text style={[styles.text_style, txt]}>{btn} </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  text_style: {fontWeight: 'bold'},
  container: {
    height: hp(7.88),
    borderRadius: wp(13.3),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default SignupComponent;
