//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wp} from '../helper/responsive';
import {hp} from '../helper/responsive';
import {fontSize} from '../helper/responsive';
import {images} from '../assets/images';

const openGoogle = () => {
  Linking.openURL('https://www.google.com');
};

// create a component
interface Emoji {
  isSkip?: Boolean;
  skip_view?: string;
  skip_source?: any;
  imageSource?: any;
  title_style?: any;
  img_view?: any;
  view_style?: any;
  title?: string;
  long_text?: any;
  textToPink?: string;
  btn_text?: string;
  onPress?: any;
  textstyle?: any;
  style_img?: any;
  onPressSkip?: any;
  imgSize?: any;
}
const EmojiComponent: React.FC<Emoji> = ({
  isSkip = false,
  imageSource,
  img_view,
  view_style,
  title,
  long_text,
  textToPink,
  textstyle,
  btn_text,
  style_img,
  onPress,
  onPressSkip,
  imgSize,
}) => {
  const parts = long_text.split(textToPink);

  return (
    <View style={styles.container}>
      {isSkip && (
        <View style={[styles.skip_style, {marginTop: hp(5.41)}]}>
          <Text style={styles.skip_text} onPress={onPressSkip}>
            Skip
          </Text>
          <Image style={[styles.img_arrow, style_img]} source={images.arrow} />
        </View>
      )}
      <View
        style={[
          styles.emoji_container,
          {marginTop: isSkip ? hp(5.79) : hp(11.2)},
        ]}>
        <View style={[styles.img_view, img_view]}>
          <Image style={[styles.img_size, imgSize]} source={imageSource} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.long_view, view_style]}>
          <Text style={[styles.long_text, textstyle]}>
            {parts[0]}
            <Text style={styles.text_pink} onPress={openGoogle}>
              {textToPink}
            </Text>
            {parts[1]}
          </Text>
        </View>
        <TouchableOpacity style={styles.btn_style} onPress={onPress}>
          <Text style={styles.btn_text}>{btn_text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  emoji_container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  btn_text: {fontWeight: 'bold', fontSize: fontSize(15)},
  text_pink: {color: '#FAA8D1'},
  skip_text: {fontWeight: 'bold'},
  skip_style: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: wp(6.58),
  },
  btn_style: {
    width: wp(40.33),
    height: hp(7.3),
    borderRadius: 50,
    backgroundColor: '#FAA8D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4.18),
  },
  long_view: {width: wp(82.94), height: hp(11.33), marginTop: hp(1.23)},
  img_size: {width: wp(24), height: hp(14), resizeMode: 'contain'},
  img_arrow: {width: wp(4.13), height: hp(1.23)},
  img_view: {
    backgroundColor: '#FCE6E9',
    borderRadius: '100%',
    width: wp(64),
    height: hp(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginTop: hp(6.15),
    fontSize: fontSize(32),
    color: '#000000',
    fontWeight: 'bold',
  },
  long_text: {
    fontSize: fontSize(15),
    color: '#000000',
    textAlign: 'center',
  },
});

//make this component available to the app
export default EmojiComponent;
