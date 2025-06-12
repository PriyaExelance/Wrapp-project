//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {images} from '../assets/images';
import {fontSize} from '../helper/responsive';
import {wp, hp} from '../helper/responsive';
import SignupComponent from '../components/SignupComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';

type RootStackParamList = {
  MainInfoScreen: {location: string};
};

interface Location {
  route?: any;
}
// create a component
const LocationScreen: React.FC<Location> = ({route}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [errorCity, setErrorCity] = useState('');
  const [errorCountry, setErrorCountry] = useState('');

  const validate = () => {
    let valid = true;

    if (!country.trim()) {
      setErrorCountry('Country name is required');
      valid = false;
    } else {
      setErrorCountry('');
    }

    if (!city.trim()) {
      setErrorCity('City name is required');
      valid = false;
    } else {
      setErrorCity('');
    }
    return valid;
  };

  const sendDataBack = () => {
    if (validate()) {
      console.log('Country name ', country);
      console.log('City name ', city);
      const location_str = `${city}, ${country}`;
      navigation.popTo('MainInfoScreen', {location: location_str});
    }
  };

  useEffect(() => {
    if (route.params.location) {
      const ab = route.params.location.split(',');
      setCountry(ab[0]);
      setCity(ab[1]);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.main_view}>
        <View style={styles.flex_view}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image style={styles.arrow_img} source={images.arrow_right} />
          </TouchableOpacity>
          <Text style={styles.header}>{texts.location}</Text>
          <TextInput
            style={styles.country}
            label="Country"
            value={country}
            autoCapitalize="words"
            onChangeText={text => {
              setCountry(text);
            }}
            activeUnderlineColor="black"
            underlineColor="black"
          />
          {errorCountry && <Text style={styles.error_msg}>{errorCountry}</Text>}

          <TextInput
            style={styles.country}
            label="City"
            value={city}
            autoCapitalize="words"
            onChangeText={text => {
              setCity(text);
            }}
            activeUnderlineColor="black"
            underlineColor="black"
          />
          {errorCity ? <Text style={styles.error_msg}>{errorCity}</Text> : null}
        </View>
        <View style={styles.confirm_btn}>
          <SignupComponent
            btn="Confirm"
            style={styles.continue_btn}
            onPress={sendDataBack}
          />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  flex_view: {flex: 1},
  confirm_btn: {marginBottom: hp(6.89)},
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  error_msg: {color: color.red, fontSize: fontSize(15)},
  main_view: {
    marginTop: wp(12),
    marginHorizontal: wp(8.5),
    flex: 1,
  },
  arrow_img: {width: wp(2.1), height: hp(1.84)},

  header: {
    fontSize: fontSize(32),
    fontWeight: 'bold',
    marginTop: hp(3.9),
  },
  country: {backgroundColor: color.white, fontSize: fontSize(15)},
  continue_btn: {
    backgroundColor: color.pink,
    borderRadius: wp(13.33),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});

//make this component available to the app
export default LocationScreen;
