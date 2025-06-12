//import liraries
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {images} from '../assets/images';
import {fontSize} from '../helper/responsive';
import {wp, hp} from '../helper/responsive';
import {useNavigation} from '@react-navigation/native';
import SignupComponent from '../components/SignupComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal_in from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {StackNavigationProp} from '@react-navigation/stack';
import {RenderList} from '../helper/types';
import {color} from '../helper/colors';
import {texts} from '../helper/strings';

type RootStackParamList = {
  LocationScreen: {location: any};
  EmailScreen: undefined;
};
interface Options {
  mediaType: string | any;
  includeBase64: boolean;
  selectionLimit?: number;
  saveToPhotos?: boolean;
}

const MainInfoScreen = ({route}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [picVisible, setPicVisible] = useState(false);
  const [isBtnSelected, setBtnSelected] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mainImageIndex, setImageIndex] = useState('');
  const [genderModal, setGenderModal] = useState(false);
  const [genderList, setGenderList] = useState(false);
  const [img, setimg] = useState<string[]>([]);
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [date, setDate] = useState('');
  const [isReplace, setReplace] = useState(false);

  const gender_data = [
    {id: 1, text: 'Male'},
    {id: 2, text: 'Female'},
  ];

  const genderList_data = [
    {id: 3, text: 'Trans Man'},
    {id: 4, text: 'Trans Woman'},
    {id: 5, text: 'Agender'},
    {id: 6, text: 'Bigender'},
    {id: 7, text: 'Gender Fluid'},
    {id: 8, text: 'Genderqueer'},
    {id: 9, text: 'Intersex'},
    {id: 10, text: 'Third Gender'},
  ];

  const render_Item = (item: any) => {
    return (
      <SignupComponent
        btn={item.text}
        txt={{color: isBtnSelected === item.id ? color.pink : color.black}}
        style={[
          styles.take_btn,
          {
            marginTop: hp(1.97),
            borderColor: isBtnSelected === item.id ? color.pink : color.black,
          },
        ]}
        onPress={() => {
          setGender(item.text);
          setGenderList(false);
          setGenderModal(false);
          handlePress(item.id);
        }}
      />
    );
  };

  const handleDateSelect = (day: any) => setDate(day.dateString);
  const toggleDatemodal = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const gender_modal = () => {
    setGenderModal(!genderModal);
  };
  const picModal = () => {
    setPicVisible(!picVisible);
  };

  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.param?.location);
    }
  }, [route.params?.location]);

  const handleLocation = () => {
    navigation.navigate('LocationScreen', {location: route.params?.location});
  };

  //18 years age
  const maxDate: string = moment()
    .subtract(18, 'years')
    .subtract(1, 'day')
    .toString();

  const handleSelectedMain = () => {
    if (selectedImageIndex && selectedImageIndex !== 0) {
      const newImages = [...img];
      const img_select = newImages.splice(selectedImageIndex, 1)[0];
      newImages.unshift(img_select);
      setimg(newImages);
      setPicVisible(false);
      setSelectedImageIndex(0);
    }
  };

  const handlePress = (button_id: number | any) => {
    setBtnSelected(button_id);
  };

  const handleDelete = () => {
    if (selectedImageIndex) {
      const newImages = [...img];
      newImages.splice(selectedImageIndex, 1);
      setimg(newImages);
      setPicVisible(false);
      setSelectedImageIndex(0);
    }
  };

  const openImagePicker = () => {
    const options: Options = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        const newImages = response.assets.map((item: any) => ({uri: item.uri}));
        if (isReplace && selectedImageIndex) {
          const updated_img: string[] = [...img];
          updated_img[selectedImageIndex] = newImages[0];
          setimg(updated_img);
          setReplace(false);
          setSelectedImageIndex(0);
          setModalVisible(!modalVisible);
        } else {
          setimg((prevImages: any) => [...prevImages, ...newImages]);
          setReplace(false);
          setModalVisible(!modalVisible);
        }
      }
    });
  };

  const handleCameraLaunch = () => {
    const options: Options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
    };

    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        const newImages = response.assets.map((item: any) => ({uri: item.uri}));

        console.log(newImages);
        if (isReplace && selectedImageIndex) {
          const updated_img: string[] = [...img];
          updated_img[selectedImageIndex] = newImages[0];
          console.log(updated_img);
          setimg(updated_img);
          setModalVisible(!modalVisible);
        } else {
          setimg(prevImages => [...prevImages, ...newImages]);
          setReplace(false);
          setModalVisible(!modalVisible);
        }
      }
    });
  };

  const renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!item.uri) {
            toggleModal();
          } else {
            setSelectedImageIndex(index);
            picModal();
          }
        }}
        style={[styles.scroll_img]}>
        <Image
          source={{uri: item.uri}}
          style={[
            styles.img,
            mainImageIndex == index && {
              borderWidth: 3,
              borderColor: color.black,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.main_view}>
        <TouchableOpacity
          onPress={() => {
            navigation.popTo('EmailScreen');
          }}>
          <Image style={styles.arrow_img} source={images.arrow_right} />
        </TouchableOpacity>
        <View style={styles.swipe}>
          <View style={styles.flex_view} />
        </View>
      </View>

      <Text style={styles.header}>{texts.info}</Text>

      <Formik
        initialValues={{
          Picture: '',
          firstname: '',
          lastname: '',
          gender: '',
          date: '',
          location: '',
          instagram: '',
        }}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .required('*Firstname is required')
            .min(3, 'Minimum 3 characters required'),
          lastname: Yup.string()
            .required('*Lastname is required')
            .min(3, 'Minimum 3 characters required'),

          instagram: Yup.string().required('*Instagram is required'),
        })}
        onSubmit={values => console.log(values)}>
        {({values, setFieldValue, handleSubmit, errors, touched}) => {
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.view_start}>
              <Text style={styles.add_photo}>{texts.addpic}</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal
                style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.scroll_img}
                  onPress={() => toggleModal()}>
                  <Image source={images.plus} style={styles.plus_img} />
                </TouchableOpacity>

                <FlatList
                  horizontal={true}
                  data={img}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ScrollView>

              <TextInput
                style={styles.first_name}
                label="Firstname"
                value={values.firstname}
                onChangeText={txt => setFieldValue('firstname', txt)}
                autoCapitalize="none"
                activeUnderlineColor="black"
                underlineColor="black"
              />
              {errors.firstname && touched.firstname && (
                <Text style={styles.error_style}>{errors.firstname}</Text>
              )}

              <TextInput
                style={styles.first_name}
                label="Lastname "
                value={values.lastname}
                onChangeText={txt => setFieldValue('lastname', txt)}
                autoCapitalize="none"
                activeUnderlineColor="black"
                underlineColor="black"
              />
              {errors.lastname && touched.lastname && (
                <Text style={styles.error_style}>{errors.lastname}</Text>
              )}

              <Pressable
                onPress={() => {
                  setGenderModal(true);
                }}>
                <TextInput
                  style={styles.first_name}
                  label="Gender "
                  value={gender}
                  editable={false}
                  onChangeText={setGender}
                  right={
                    <TextInput.Icon
                      onPress={gender_modal}
                      icon={() => <Image source={images.arrow_down} />}
                    />
                  }
                  autoCapitalize="none"
                  activeUnderlineColor="black"
                  underlineColor="black"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setDatePickerVisible(true);
                }}>
                <TextInput
                  style={styles.first_name}
                  label="Date of Birth "
                  value={date && moment(date).format('DD-MM-YYYY')}
                  onChangeText={setDob}
                  autoCapitalize="none"
                  activeUnderlineColor="black"
                  underlineColor="black"
                  editable={false}
                />
              </Pressable>
              <TouchableOpacity onPress={handleLocation}>
                <TextInput
                  style={styles.first_name}
                  label="Location"
                  editable={false}
                  autoCapitalize="words"
                  value={route.params?.location}
                  onChangeText={setLocation}
                  activeUnderlineColor="black"
                  underlineColor="black"
                  onPress={handleLocation}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.first_name}
                label="Instagram "
                value={values.instagram}
                onChangeText={txt => setFieldValue('instagram', txt)}
                autoCapitalize="none"
                activeUnderlineColor="black"
                underlineColor="black"
              />
              {errors.instagram && touched.instagram && (
                <Text style={styles.error_style}>{errors.instagram}</Text>
              )}
              <SignupComponent
                btn={texts.btn_continue}
                style={styles.continue_btn}
                onPress={handleSubmit}
              />
            </ScrollView>
          );
        }}
      </Formik>
      <Modal_in
        onBackdropPress={() => setDatePickerVisible(false)}
        isVisible={isDatePickerVisible}>
        <Calendar
          maxDate={new Date(maxDate).toDateString()}
          current={new Date(maxDate).toDateString()}
          onDayPress={day => {
            handleDateSelect(day), toggleDatemodal();
          }}
          markedDates={{
            [date]: {
              selected: true,
              marked: true,
              selectedColor: color.pink,
              dotColor: color.pink,
            },
          }}
        />
      </Modal_in>

      {/* gender */}
      <Modal_in
        style={styles.modal_photo}
        onBackdropPress={() => setGenderModal(false)}
        isVisible={genderModal}>
        <View style={styles.modal_select_view}>
          <FlatList
            data={gender_data}
            renderItem={render_Item}
            keyExtractor={(item: any) => item.id}
          />

          <SignupComponent
            btn={texts.btn_other}
            style={[styles.take_btn, {marginTop: hp(1.97)}]}
            onPress={() => {
              setGenderList(true);
            }}
          />
        </View>
      </Modal_in>

      <Modal_in
        style={styles.modal_photo}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={modalVisible}>
        <View style={styles.modal_pic_view}>
          <SignupComponent
            btn={texts.btn_takepic}
            style={[styles.take_btn]}
            onPress={handleCameraLaunch}
          />
          <SignupComponent
            btn={texts.btn_choose}
            style={[
              styles.take_btn,
              {
                marginTop: hp(1.97),
              },
            ]}
            onPress={openImagePicker}
          />
        </View>
      </Modal_in>
      <TouchableOpacity
        onPress={() => {
          setGenderList(false);
        }}>
        <Modal_in
          style={styles.modal_photo}
          isVisible={genderList}
          onBackdropPress={() => setGenderList(false)}>
          <View style={styles.modal_view_genderlist}>
            <TouchableOpacity
              style={styles.gender_list_img}
              onPress={() => {
                setGenderList(false);
              }}>
              <Image
                style={styles.gender_list_modal}
                source={images.arrow_right}
              />
            </TouchableOpacity>

            <FlatList
              data={genderList_data}
              renderItem={render_Item}
              keyExtractor={(item: any) => item.id}
            />
          </View>
        </Modal_in>
      </TouchableOpacity>

      <Modal_in
        style={styles.modal_photo}
        onBackdropPress={() => setPicVisible(false)}
        isVisible={picVisible}>
        <View style={styles.modal_select}>
          <SignupComponent
            btn={texts.btn_select}
            style={[styles.take_btn]}
            onPress={handleSelectedMain}
          />
          <SignupComponent
            btn={texts.btn_replace}
            style={[
              styles.take_btn,
              {
                marginTop: hp(1.97),
              },
            ]}
            onPress={() => {
              setReplace(true);
              toggleModal(), setPicVisible(!picVisible);
            }}
          />
          <SignupComponent
            btn={texts.btn_delete}
            style={[
              styles.take_btn,
              {
                marginTop: hp(1.97),
              },
            ]}
            onPress={handleDelete}
          />
        </View>
      </Modal_in>
    </View>
  );
};

const styles = StyleSheet.create({
  gender_list_modal: {width: wp(2.13), height: hp(1.8)},
  plus_img: {width: wp(3.2), height: wp(3.2)},
  flex_view: {borderRadius: 30, flex: 0.5, backgroundColor: color.pink},
  error_style: {color: color.red, fontSize: fontSize(15)},
  gender_list_img: {marginHorizontal: wp(8.53), marginTop: hp(0.49)},
  modal_view_genderlist: {
    backgroundColor: color.white,
    height: hp(80.45),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: hp(3.9),
  },
  modal_select: {
    backgroundColor: color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: hp(3.9),
  },

  take_btn: {
    borderWidth: 2,
    borderColor: color.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(8.53),
  },
  modal_select_view: {
    backgroundColor: color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: hp(3.94),
  },

  modal_pic_view: {
    backgroundColor: color.white,
    height: hp(25.61),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 32,
  },
  modal_photo: {justifyContent: 'flex-end', margin: 0, height: hp(6.15)},
  continue_btn: {
    marginTop: 40,
    backgroundColor: color.pink,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
  },
  img: {width: wp(33.06), height: wp(33.06), borderRadius: 12},
  first_name: {backgroundColor: color.white, fontSize: fontSize(15)},
  add_photo: {fontSize: fontSize(21), fontWeight: 'bold', marginTop: hp(1.97)},
  header: {
    fontSize: fontSize(32),
    fontWeight: 'bold',
    marginHorizontal: wp(8.53),
    marginTop: hp(3.94),
  },
  view_start: {marginHorizontal: wp(8.53)},
  default_style: {width: wp(3.2), height: hp(3.2)},
  arrow_img: {width: wp(2.13), height: hp(1.87)},
  main_view: {
    marginTop: wp(12),
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(8.53),
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  swipe: {
    flex: 1,
    height: hp(2.46),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: wp(6.4),
    borderRadius: 30,
    flexDirection: 'row',
    padding: 1,
  },
  scroll_img: {
    width: wp(33.06),
    height: wp(33.06),
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: color.silver,
    borderRadius: wp(3.2),
    marginTop: hp(1.47),
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainInfoScreen;
