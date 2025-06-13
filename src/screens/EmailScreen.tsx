//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {images} from '../assets/images';
import {fontSize} from '../helper/responsive';
import {wp, hp} from '../helper/responsive';
import SignupComponent from '../components/SignupComponent';
import {useNavigation} from '@react-navigation/native';
import {Formik, validateYupSchema} from 'formik';
import {StackNavigationProp} from '@react-navigation/stack';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';
import * as Yup from 'yup';

/// Branching example

// my name is priyaaa
const a = 'arerrererewe';
const b = 'me and i';

const c = 'me and i';
type RootStackParamList = {
  MainInfoScreen: undefined;
};
///merging both
// create a component
const EmailScreen = () => {
  const [hidePass, setHidePass] = useState(true);
  const handleFocus = () => {
    Keyboard.addListener('keyboardDidShow', () => {});
    Keyboard.addListener('keyboardDidHide', () => {});
  };
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.main_view}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.img_size} source={images.arrow_right} />
        </TouchableOpacity>
        <View style={styles.swipe_view}>
          <View style={styles.inner_swipe} />
        </View>
      </View>

      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('*Invalid email input')
            .required('*Email is required'),
          password: Yup.string()
            .min(3, '*Password is too short')
            .max(8, '*Maximum 8 characters are required')
            .required('*Password is required'),
          confirmPassword: Yup.string()
            .min(3, '*Password is too short')
            .max(8, '*Maximum 8 characters are required')
            .required('*Confirm Password is required')
            .oneOf([Yup.ref('password')], '*Passwords must match'),
        })}
        onSubmit={values => {
          console.log(values);
          navigation.navigate('MainInfoScreen');
        }}>
        {({values, setFieldValue, handleSubmit, touched, errors}) => {
          return (
            <View style={styles.view2}>
              <Text style={styles.header_txt}>{texts.signup}</Text>
              <TextInput
                style={styles.txt_input}
                activeUnderlineColor="black"
                label="Email"
                value={values.email}
                onChangeText={txt => setFieldValue('email', txt)}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={handleFocus}
              />
              {errors.email && touched.email && (
                <Text style={styles.error_msg}>{errors.email}</Text>
              )}

              <TextInput
                style={styles.txt_input}
                label="Password"
                activeUnderlineColor="black"
                value={values.password}
                onChangeText={txt => setFieldValue('password', txt)}
                secureTextEntry={hidePass}
                autoCapitalize="none"
                right={
                  <TextInput.Icon
                    onPress={() => setHidePass(!hidePass)}
                    icon={() =>
                      hidePass ? (
                        <Image source={images.eyeclose} style={styles.eye} />
                      ) : (
                        <Image source={images.eye} style={styles.eye} />
                      )
                    }
                  />
                }
              />
              {errors.password && touched.password && (
                <Text style={styles.error_msg}>{errors.password}</Text>
              )}

              <TextInput
                style={styles.txt_input}
                label="Confirm Password"
                value={values.confirmPassword}
                activeUnderlineColor="black"
                onChangeText={txt => setFieldValue('confirmPassword', txt)}
                secureTextEntry={isConfirmPasswordVisible}
                autoCapitalize="none"
                right={
                  <TextInput.Icon
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    icon={() =>
                      isConfirmPasswordVisible ? (
                        <Image source={images.eyeclose} style={styles.eye} />
                      ) : (
                        <Image source={images.eye} style={styles.eye} />
                      )
                    }
                  />
                }
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error_msg}>{errors.confirmPassword}</Text>
              )}

              <SignupComponent
                btn="Sign Up"
                style={styles.sign_upbtn}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  sign_upbtn: {
    marginTop: hp(4.92),
    backgroundColor: color.pink,
    borderRadius: wp(13.33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {width: wp(5.3), height: hp(2.4)},
  error_msg: {color: 'red', fontSize: fontSize(15)},
  header_txt: {fontWeight: 'bold', fontSize: fontSize(32)},
  view2: {marginHorizontal: wp(8.5), marginTop: hp(3.94)},
  txt_input: {backgroundColor: color.white, fontSize: fontSize(15)},
  inner_swipe: {borderRadius: wp(8), flex: 0.15, backgroundColor: color.pink},

  swipe_view: {
    width: wp(74.4),
    height: hp(2.46),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginLeft: wp(0.27),
    borderRadius: wp(8),
    flexDirection: 'row',
    padding: 1,
  },

  img_size: {width: wp(2.13), marginRight: wp(6.4), height: hp(1.84)},

  main_view: {
    marginTop: wp(12),
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(8.5),
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});

//make this component available to the app
export default EmailScreen;
