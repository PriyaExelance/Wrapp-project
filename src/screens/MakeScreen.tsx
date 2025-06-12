//import liraries
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {images} from '../assets/images';
import {useNavigation} from '@react-navigation/native';
import {wp} from '../helper/responsive';
import {hp} from '../helper/responsive';
import {fontSize} from '../helper/responsive';
import {StackNavigationProp} from '@react-navigation/stack';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';
import AppIntroSlider from 'react-native-app-intro-slider';

type AppIntroSliderRef = {
  goToSlide: (index: number, animated?: boolean) => void;
};

type RootStackParamList = {
  SignupScreen: undefined;
};

const slides = [
  {
    key: 1,
    image: require('../assets/images/hurrah.png'),
    text: 'Make new friends',
    long_text:
      'Wrapp helps you truly connect with cool \npeople in your area that share the same\n interests as you',
  },
  {
    key: 2,
    image: require('../assets/images/enjoy.png'),
    text: 'Find new events',
    long_text:
      'Wrapp up your week with a fun event in your area or even \ncreate your own!',
  },
  {
    key: 3,
    image: require('../assets/images/lovable.png'),
    text: "Let's begin ",
    long_text: 'Kick off your experience\n by exploring the app',
  },
];
// create a component
const MakeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const sliderRef = useRef<AppIntroSliderRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const _renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.container}>
        <View style={[styles.emoji_container]}>
          <View style={[styles.img_view]}>
            <Image style={[styles.img_size]} source={item.image} />
          </View>
          <Text style={styles.title}>{item.text}</Text>
          <View style={[styles.long_view]}>
            <Text style={[styles.long_text]}>{item.long_text}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <TouchableOpacity style={styles.btn_style} onPress={onNext}>
        <Text style={styles.btn_text}>Continue</Text>
      </TouchableOpacity>
    );
  };
  const onNext = () => {
    if (sliderRef.current) {
      sliderRef.current.goToSlide(currentSlide + 1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const renderSkipButton = () => {
    return (
      <TouchableOpacity
        style={[styles.skip_style, {marginTop: hp(5.41)}]}
        onPress={onSkip}>
        <Text style={styles.skip_text}>Skip</Text>
        <Image style={[styles.img_arrow]} source={images.arrow} />
      </TouchableOpacity>
    );
  };
  const onSkip = () => {
    if (sliderRef.current) {
      sliderRef.current.goToSlide(slides.length - 1); // Go to last slide
    }
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.btn_style} onPress={onDone}>
        <Text style={styles.btn_text}>Explore</Text>
      </TouchableOpacity>
    );
  };
  const onDone = () => {
    console.log('done');
    navigation.navigate('SignupScreen');
  };
  return (
    <AppIntroSlider
      ref={sliderRef as unknown as React.Ref<any>}
      renderItem={_renderItem}
      data={slides}
      showSkipButton={true}
      showNextButton={true}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      onDone={onDone}
      onSkip={onSkip}
    />
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
    alignSelf: 'center',
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

export default MakeScreen;
