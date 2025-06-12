//import liraries
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {images} from '../assets/images';
import {fontSize} from '../helper/responsive';
import {wp, hp} from '../helper/responsive';
import SignupComponent from './SignupComponent';
import {useNavigation} from '@react-navigation/native';

interface Header {
  header: string;
}
// create a component
const HeaderComponent: React.FC<Header> = ({header}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header_view}>
        <Image style={styles.img} source={images.arrow_right} />
        <View style={styles.swipe_view}>
          <View style={styles.swipe} />
        </View>
      </View>
      <View>
        <Text style={styles.header_txt}>{header}</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header_txt: {fontWeight: 'bold', fontSize: fontSize(32)},
  swipe: {borderRadius: wp(8), flex: 0.15, backgroundColor: '#FAA8D1'},
  swipe_view: {
    width: wp(74.4),
    height: hp(2.46),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginLeft: wp(2.6),
    borderRadius: wp(8),
    flexDirection: 'row',
  },
  img: {width: wp(2.13), height: hp(1.84)},
  header_view: {
    marginVertical: hp(2.4),
    height: hp(2.95),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default HeaderComponent;
