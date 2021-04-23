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

const editPortfolioScreen = ({route, navigation}) => {
  const [namaPekerjaan, setNamaPekerjaan] = useState('');
  const [deskripsiPekerjaan, setDeskripsiPekerjaan] = useState('');
  const [jabatanPekerjaan, setJabatanPekerjaan] = useState('');
  const [tahunPekerjaan, setTahunPekerjaan] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchPortfolioData = async () => {
    try {
      const {idPortfolio} = route.params;
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: resultPortfolioData} = await axios.get(
        `${BASE_URL}/api/portfolio/detail/${idPortfolio}`,
        options,
      );

      const {nama, jabatan, deskripsi, tahun} = resultPortfolioData.data;

      setNamaPekerjaan(nama);
      setJabatanPekerjaan(jabatan);
      setDeskripsiPekerjaan(deskripsi);
      setTahunPekerjaan(tahun);
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
    setTimeout(() => {
      navigation.navigate('PortofolioKartuku');
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
      const {idPortfolio} = route.params;
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      const formData = {
        portfolio_id: idPortfolio,
        nama_pekerjaan: namaPekerjaan,
        deskripsi_pekerjaan: deskripsiPekerjaan,
        jabatan_pekerjaan: jabatanPekerjaan,
        tahun_pekerjaan: tahunPekerjaan,
      };
      await axios.post(
        `${BASE_URL}/api/portfolio/update/${user.id}`,
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
              labelTextInput="Nama Pekerjaan / Nama Perusahaan"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nama Pekerjaan / Perusahaan"
              value={namaPekerjaan}
              onChangeText={(text) => setNamaPekerjaan(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Posisi"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Posisi"
              value={jabatanPekerjaan}
              onChangeText={(text) => setJabatanPekerjaan(text)}
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Deskripsi Pekerjaan"
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
              placeholder="Deskripsi Pekerjaan"
              value={deskripsiPekerjaan}
              onChangeText={(text) => setDeskripsiPekerjaan(text)}
              multiline={true}
              numberOfLines={5}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Tahun"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Tahun"
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

editPortfolioScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default editPortfolioScreen;
