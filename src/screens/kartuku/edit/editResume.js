import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  Keyboard,
} from 'react-native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const editResumeScreen = ({route, navigation}) => {
  const [namaResume, setNamaResume] = useState('');
  const [deskripsiResume, setDeskripsiResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchPortfolioData = async () => {
    try {
      const {idResume} = route.params;
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: resultPortfolioData} = await axios.get(
        `${BASE_URL}/api/resume/detail/${idResume}`,
        options,
      );

      const {nama, deskripsi} = resultPortfolioData.data;

      setNamaResume(nama);
      setDeskripsiResume(deskripsi);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [route.params]);

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

  const updatePortfolio = async () => {
    try {
      setValidation(false);
      setLoadingSubmit(true);
      Keyboard.dismiss();
      const {idResume} = route.params;
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      const formData = {
        resume_id: idResume,
        nama_resume: namaResume,
        deskripsi_resume: deskripsiResume,
      };
      await axios.post(
        `${BASE_URL}/api/resume/update/${user.id}`,
        formData,
        options,
      );
      setSuccessMessage('Update Berhasil');
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
          onPress={() => updatePortfolio()}
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

  if (loading) {
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
          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nama Resume"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nama Resume"
              value={namaResume}
              onChangeText={(text) => setNamaResume(text)}
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Deskripsi"
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
              placeholder="Deskripsi"
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

editResumeScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default editResumeScreen;
