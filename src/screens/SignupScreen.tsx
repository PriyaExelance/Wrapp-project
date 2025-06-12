//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {images} from '../assets/images';
import {fontSize, wp} from '../helper/responsive';
import {hp} from '../helper/responsive';
import SignupComponent from '../components/SignupComponent';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {StackNavigationProp} from '@react-navigation/stack';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';

type RootStackParamList = {
  EmailScreen: undefined;
};

// create a component
const SignupScreen = () => {
  const [isVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isVisible);
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.main_view}>
        <Image style={styles.img} source={images.emojis} />
        <SignupComponent
          btn={texts.btn_sign}
          style={styles.signup}
          onPress={toggleModal}
        />

        <SignupComponent btn={texts.btn_profile} style={styles.create} />
      </View>
      <View style={styles.terms_view}>
        <Text style={styles.txt}>{texts.terms_policy}</Text>
        <View style={styles.terms_border} />
      </View>

      <Modal
        style={styles.modal_view}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isVisible}>
        <View style={styles.modal_size}>
          <Text style={styles.header_txt}>{texts.signup_with}</Text>
          <SignupComponent
            btn={texts.btn_email}
            style={styles.email_btn}
            txt={styles.email_txt}
            img_source={images.email}
            img_style={styles.icon_image}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('EmailScreen');
            }}
          />
          <SignupComponent
            btn={texts.btn_gmail}
            style={styles.email_btn}
            txt={styles.email_txt}
            img_source={images.gmail}
            img_style={styles.icon_image}
            onPress={() => setModalVisible(false)}
          />
          <SignupComponent
            btn={texts.btn_apple}
            style={{
              ...styles.email_btn,
              backgroundColor: color.black,
            }}
            txt={[styles.email_txt, {color: color.white}]}
            img_source={images.apple}
            img_style={styles.icon_image}
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  main_view: {flex: 1},
  icon_image: {
    width: wp(5.33),
    height: hp(2.09),
    marginLeft: wp(5.33),
    resizeMode: 'contain',
  },
  email_txt: {marginLeft: wp(2.67)},
  email_btn: {
    borderWidth: 2,
    borderColor: color.black,
    marginTop: hp(2.9),
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_txt: {fontWeight: 'bold', fontSize: fontSize(32)},
  modal_size: {
    backgroundColor: color.white,
    padding: 20,
    height: hp(43.42),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modal_view: {justifyContent: 'flex-end', margin: 0},
  terms_border: {borderWidth: 0.5, width: wp(30), borderColor: color.black},
  txt: {fontSize: fontSize(15)},
  terms_view: {
    alignItems: 'center',
    marginBottom: hp(4.18),
  },
  create: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.9),
    marginHorizontal: wp(12.8),
  },
  signup: {
    backgroundColor: color.pink,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(9.8),
    marginHorizontal: wp(12.8),
  },
  img: {width: '100%', height: hp(56.77), resizeMode: 'stretch'},
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});

//make this component available to the app
export default SignupScreen;
