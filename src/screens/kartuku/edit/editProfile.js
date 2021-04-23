import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
  Keyboard,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main';

// action creator
import {keepLogin} from 'src/helpers/redux/actions';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

const editProfileScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState({
    fileName: null,
    fileData: null,
    fileUri: null,
  });
  const [phone, setPhone] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [validation, setValidation] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // const fs = require('fs');

  const fetchUserData = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: resultUserData} = await axios.get(
        `${BASE_URL}/api/user/${user.id}`,
        options,
      );
      const {
        name,
        email,
        photo,
        phone,
        bio,
        pekerjaan,
        facebook,
        twitter,
        linkedin,
        instagram,
      } = resultUserData.data;

      setName(name || '');
      setPhone(phone || '');
      setEmail(email || '');
      setBio(bio || '');
      setPekerjaan(pekerjaan || '');
      setFacebook(facebook || '');
      setTwitter(twitter || '');
      setLinkedin(linkedin || '');
      setInstagram(instagram || '');
      setPhoto({
        fileName: photo || null,
        fileData: photo || null,
        fileUri: `${BASE_URL}/public/storage/${photo}` || null,
      });
      dataFetched(true);
    } catch {
      setDataFetched(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('ProfileKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  const onSubmitUserData = async (photoParam) => {
    try {
      setValidation(false);
      setLoadingSubmit(true);
      Keyboard.dismiss();
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      const trimmedName = name.trim();

      const formData = {
        id: user.id,
        name: trimmedName,
        password: user.password,
        email,
        bio,
        phone,
        pekerjaan,
        facebook,
        twitter,
        linkedin,
        instagram,
      };

      const form = new FormData();

      form.append('id', formData.id);
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('bio', formData.bio);
      form.append('phone', formData.phone);
      form.append('pekerjaan', formData.pekerjaan);
      form.append('facebook', formData.facebook);
      form.append('twitter', formData.twitter);
      form.append('linkedin', formData.linkedin);
      form.append('instagram', formData.instagram);

      // it works
      if (photoParam) {
        form.append('photo', {
          uri: photoParam.uri,
          type: photoParam.type,
          name: photoParam.fileName,
        });
      }

      await axios.post(`${BASE_URL}/api/user/update`, form, options);

      const {data: resultUserData} = await axios.get(
        `${BASE_URL}/api/user/${user.id}`,
        options,
      );
      const {photo} = resultUserData.data;

      const arrayName = trimmedName.split(' ');

      const globalStateUser = {
        ...formData,
        token: user.token,
        photo,
        firstName: arrayName[0],
        lastName: arrayName[arrayName.length - 1],
      };

      await AsyncStorage.setItem(
        '@storage_Key',
        JSON.stringify({...globalStateUser}),
      );

      dispatch(keepLogin(globalStateUser));
      setSuccessMessage('Update Berhasil');
      setLoadingSubmit(false);
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  };

  const RenderSubmitButton = () => {
    if (validation) {
      return (
        <KButton
          title="Selesai"
          buttonStyle={styles.greenBottomButton}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => onSubmitUserData(null)}
        />
      );
    }

    return (
      <KButton
        title="Selesai"
        buttonStyle={styles.lightGrayColor2BottomButton}
        textStyle={{
          ...styles.whiteColor,
          ...styles.subHeaderText2,
        }}
        activeOpacity={1}
        isLoading={loadingSubmit}
        loadingColor="white"
      />
    );
  };

  const RenderChangePhotoButton = () => {
    if (validation) {
      return (
        <KButton
          title="Ganti Foto"
          buttonStyle={styles.whiteButtonWithBorder}
          textStyle={styles.subHeaderText3}
          onPress={() => openImageLibrary()}
        />
      );
    }

    return (
      <KButton
        title="Ganti Foto"
        buttonStyle={styles.whiteButtonWithBorder}
        textStyle={{...styles.subHeaderText3, ...styles.lightGrayColor2}}
        activeOpacity={1}
        isLoading={loadingSubmit}
      />
    );
  };

  const openImageLibrary = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        onSubmitUserData({
          ...response,
        });
      }
    });
  };

  if (!dataFetched) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#504589" />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.kartukuMainContainer}>
          <View style={styles.alignSelfCenter}>
            <Image
              style={styles.kartukuMainProfilePicStyle}
              source={{
                uri: photo.fileUri
                  ? `${photo.fileUri}`
                  : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&color=000000&background=F1F1F1&bold=true&size=128`,
              }}
            />
            <RenderChangePhotoButton />
          </View>

          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nama"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Masukkan Nama"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Email"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Masukkan Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nomor Telepon/Whatsapp"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Masukkan Nomor Telepon/Whatsapp"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="numeric"
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Pekerjaan"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{
                ...styles.textInputStyle,
                ...styles.blackColor2,
              }}
              placeholder="Masukkan Pekerjaan"
              value={pekerjaan}
              onChangeText={(text) => setPekerjaan(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Bio Deskripsi"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{
                ...styles.textInputStyle,
                ...styles.blackColor2,
                ...styles.textAlignVerticalTop,
              }}
              placeholder="Masukkan Bio Deskripsi"
              value={bio}
              onChangeText={(text) => setBio(text)}
              multiline={true}
              numberOfLines={5}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Facebook"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://facebook.com/username"
              value={facebook}
              onChangeText={(text) => setFacebook(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Linkedin"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://linkedin.com/username"
              value={linkedin}
              onChangeText={(text) => setLinkedin(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Instagram"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://instagram.com/username"
              value={instagram}
              onChangeText={(text) => setInstagram(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Twitter"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://twitter.com/username"
              value={twitter}
              onChangeText={(text) => setTwitter(text)}
            />
            <KButton
              title="Ganti Password"
              buttonStyle={{
                ...styles.marginTop30,
                ...styles.blackButton,
                ...styles.purpleMainButton,
                ...styles.alignItemsCenter,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              onPress={() => navigation.navigate('editPassword')}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        {successMessage ? (
          <Text
            style={{
              ...styles.tealGreenColor,
              ...styles.marginBottom2,
              ...styles.alignSelfCenter,
              ...styles.subHeaderText2,
            }}>
            {successMessage}
          </Text>
        ) : null}

        <RenderSubmitButton />
      </View>
    </>
  );
};

editProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default editProfileScreen;
