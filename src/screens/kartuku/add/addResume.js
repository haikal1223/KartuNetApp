import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, Text, Keyboard} from 'react-native';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

const addResumeScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [namaResume, setNamaResume] = useState('');
  const [deskripsiResume, setDeskripsiResume] = useState('');
  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (namaResume.length !== 0 && deskripsiResume.length !== 0) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [namaResume, deskripsiResume]);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('ResumeKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  const onSubmitResume = async () => {
    try {
      setValidation(false);
      setLoadingSubmit(true);
      Keyboard.dismiss();
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      const formData = {
        nama_resume: namaResume,
        deskripsi_resume: deskripsiResume,
      };

      await axios.post(
        `${BASE_URL}/api/resume/add/${user.id}`,
        formData,
        options,
      );

      setSuccessMessage('Tambah Berhasil');
      setRedirect(true);
    } catch (e) {
      console.log(e);
      setValidation(true);
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
          onPress={() => onSubmitResume()}
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

  return (
    <>
      <ScrollView>
        <View style={styles.kartukuMainContainer}>
          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nama Resume *"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
                ...styles.textTransformCapitalize,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Ketika nama resume anda"
              value={namaResume}
              onChangeText={(text) => setNamaResume(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Deskripsi Resume *"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
                ...styles.textTransformCapitalize,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{
                ...styles.textInputStyle,
                ...styles.blackColor2,
                ...styles.textAlignVerticalTop,
              }}
              placeholder="Ketik deskripsi resume anda"
              value={deskripsiResume}
              onChangeText={(text) => setDeskripsiResume(text)}
              multiline={true}
              numberOfLines={5}
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

addResumeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default addResumeScreen;
