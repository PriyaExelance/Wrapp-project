//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {images} from '../assets/images';
import EmojiComponent from '../components/EmojiComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';

type RootStackParamList = {
  MakeScreen: undefined;
};

// create a component
const ExploreScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <EmojiComponent
        isSkip={false}
        imageSource={images.emoji}
        title={texts.explore}
        long_text={texts.wrap}
        textstyle={{textAlign: 'center'}}
        onPress={() => navigation.navigate('MakeScreen')}
        btn_text={texts.btn_explore}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
});

//make this component available to the app
export default ExploreScreen;
