//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EmojiComponent from '../components/EmojiComponent';
import {images} from '../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {texts} from '../helper/strings';

type RootStackParamList = {
  ExploreScreen: undefined;
};

const OopsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EmojiComponent
        isSkip={false}
        imageSource={images.girl}
        title={texts.oops}
        long_text={texts.oops_text}
        textToPink={texts.textToPink}
        btn_text={texts.btn_try}
        onPress={() => {
          navigation.navigate('ExploreScreen');
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//make this component available to the app
export default OopsScreen;
