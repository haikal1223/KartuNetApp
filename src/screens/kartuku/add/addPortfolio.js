import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

const addPortfolioScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [namaPekerjaan, setNamaPekerjaan] = useState('');
  const [deskripsiPekerjaan, setDeskripsiPekerjaan] = useState('');
  const [jabatanPekerjaan, setJabatanPekerjaan] = useState('');
  const [tahunPekerjaan, setTahunPekerjaan] = useState('');
  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (
      namaPekerjaan.length !== 0 &&
      deskripsiPekerjaan.length !== 0 &&
      jabatanPekerjaan.length !== 0 &&
      tahunPekerjaan.length !== 0
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [namaPekerjaan, deskripsiPekerjaan, jabatanPekerjaan, tahunPekerjaan]);

  const redirectAfterUpdate = () => {
    const pushAction = StackActions.popToTop();
    setTimeout(() => {
      navigation.navigate('PortofolioKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  const onSubmitPortfolio = async () => {
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
        nama_pekerjaan: namaPekerjaan,
        deskripsi_pekerjaan: deskripsiPekerjaan,
        jabatan_pekerjaan: jabatanPekerjaan,
        tahun_pekerjaan: tahunPekerjaan,
      };

      await axios.post(
        `${BASE_URL}/api/portfolio/add/${user.id}`,
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
          onPress={() => onSubmitPortfolio()}
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
              labelTextInput="Nama Pekerjaan *"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
                ...styles.textTransformCapitalize,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Ketika nama pekerjaan anda"
              value={namaPekerjaan}
              onChangeText={(text) => setNamaPekerjaan(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Deskripsi Pekerjaan *"
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
              placeholder="Ketik deskripsi pekerjaan anda"
              value={deskripsiPekerjaan}
              onChangeText={(text) => setDeskripsiPekerjaan(text)}
              multiline={true}
              numberOfLines={5}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Jabatan Pekerjaan"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
                ...styles.textTransformCapitalize,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Ketik jabatan pekerjaan anda"
              value={jabatanPekerjaan}
              onChangeText={(text) => setJabatanPekerjaan(text)}
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Tahun Perkerjaan"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
                ...styles.textTransformCapitalize,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Ketik tahun pekerjaan anda"
              value={tahunPekerjaan}
              onChangeText={(text) => setTahunPekerjaan(text)}
              keyboardType="numeric"
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

addPortfolioScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default addPortfolioScreen;
