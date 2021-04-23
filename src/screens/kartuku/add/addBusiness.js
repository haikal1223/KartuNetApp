import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView, Image, Text, Keyboard} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import PropTypes from 'prop-types';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// function
import {formatSelectBox} from 'src/helpers/function';

const addBusinessScreen = ({route, navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const [businessLogo, setBusinessLogo] = useState({
    fileName: null,
    fileUri: null,
    fileType: null,
  });
  const [businessName, setBusinessName] = useState('');
  const [businessPosisi, setBusinessPosisi] = useState('');
  const [businessDeskripsi, setBusinessDeskripsi] = useState('');

  // Form step 2

  const [businessAlamat, setBusinessAlamat] = useState('');
  const [businessProvinsi, setBusinessProvinsi] = useState(null);
  const [businessKota, setBusinessKota] = useState(null);
  const [businessKecamatan, setBusinessKecamatan] = useState(null);
  const [businessKelurahan, setBusinessKelurahan] = useState(null);
  const [businessKodePos, setBusinessKodePos] = useState('');

  // Form step 3

  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');

  // Form step 4

  const [businessFacebook, setBusinessFacebook] = useState('');
  const [businessTwitter, setBusinessTwitter] = useState('');
  const [businessLinkedin, setBusinessLinkedin] = useState('');
  const [businessInstagram, setBusinessInstagram] = useState('');
  const [businessYoutube, setBusinessYoutube] = useState('');

  // Form step 5

  const [businessTokopedia, setBusinessTokopedia] = useState('');
  const [businessShopee, setBusinessShopee] = useState('');
  const [businessBukalapak, setBusinessBukalapak] = useState('');

  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setLisKecamatan] = useState([]);
  const [listKelurahan, setListKelurahan] = useState([]);
  const [validation, setValidation] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [redirect, setRedirect] = useState(false);

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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setBusinessLogo({
          fileName: response.fileName,
          fileType: response.type,
          fileUri: response.uri,
        });
      }
    });
  };

  // Logic Provinsi, Kota/Kabupaten, Kecamatan, Kelurahan

  const fetchListProvinsi = async () => {
    try {
      const {data} = await axios.get(`${BASE_URL}/api/get_province`);

      const listProvince = formatSelectBox(data.data);

      setListProvinsi(listProvince);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchKotaByProvinceId = async (idProvince) => {
    try {
      setBusinessKota(null);
      setBusinessKecamatan(null);
      setBusinessKelurahan(null);
      const {data} = await axios.get(`${BASE_URL}/api/get_kota/${idProvince}`);

      const listCity = formatSelectBox(data.data);

      setListKota(listCity);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchKecamatanByKotaId = async (idKota) => {
    try {
      setBusinessKecamatan(null);
      setBusinessKelurahan(null);
      const {data} = await axios.get(`${BASE_URL}/api/get_kecamatan/${idKota}`);

      const listKecamatan = formatSelectBox(data.data);

      setLisKecamatan(listKecamatan);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchKelurahanByKecamatanId = async (idKecamatan) => {
    try {
      setBusinessKelurahan(null);
      const {data} = await axios.get(
        `${BASE_URL}/api/get_kelurahan/${idKecamatan}`,
      );

      const listKelurahan = formatSelectBox(data.data);

      setListKelurahan(listKelurahan);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchListProvinsi();
  }, [route.params]);

  const onSubmitBusinessData = async () => {
    try {
      setValidation(false);
      setLoadingSubmit(true);
      Keyboard.dismiss();
      let options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      const formData = new FormData();

      formData.append('bisnis_name', businessName);
      formData.append('bisnis_deskripsi', businessDeskripsi);
      formData.append('bisnis_posisi', businessPosisi);
      formData.append('bisnis_logo', {
        uri: businessLogo.fileUri,
        type: businessLogo.fileType,
        name: businessLogo.fileName,
      });

      const postBusinessData = await axios.post(
        `${BASE_URL}/api/business/post_step_one/${user.id}`,
        formData,
        options,
      );

      options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      if (
        businessAlamat &&
        businessProvinsi &&
        businessKota &&
        businessKecamatan &&
        businessKelurahan &&
        businessKodePos
      ) {
        const formStepTwo = {
          bisnis_id: postBusinessData.data.data.last_id_bisnis,
          bisnis_alamat: businessAlamat,
          bisnis_provinsi: businessProvinsi,
          bisnis_kota: businessKota,
          bisnis_kecamatan: businessKecamatan,
          bisnis_kelurahan: businessKelurahan,
          bisnis_kodepos: businessKodePos,
        };

        await axios.post(
          `${BASE_URL}/api/business/post_update_step_two/${user.id}`,
          formStepTwo,
          options,
        );
      }

      if (businessWebsite && businessEmail && businessPhone) {
        const formStepThree = {
          bisnis_id: postBusinessData.data.data.last_id_bisnis,
          bisnis_website: businessWebsite,
          bisnis_email: businessEmail,
          bisnis_phone: businessPhone,
        };

        await axios.post(
          `${BASE_URL}/api/business/post_update_step_three/${user.id}`,
          formStepThree,
          options,
        );
      }

      if (
        businessFacebook &&
        businessTwitter &&
        businessLinkedin &&
        businessInstagram &&
        businessYoutube
      ) {
        const formStepFour = {
          bisnis_id: postBusinessData.data.data.last_id_bisnis,
          bisnis_facebook: businessFacebook,
          bisnis_twitter: businessTwitter,
          bisnis_linkedin: businessLinkedin,
          bisnis_instagram: businessInstagram,
          bisnis_youtube: businessYoutube,
        };

        await axios.post(
          `${BASE_URL}/api/business/post_update_step_four/${user.id}`,
          formStepFour,
          options,
        );
      }

      if (businessTokopedia && businessShopee && businessBukalapak) {
        const formStepFive = {
          bisnis_id: postBusinessData.data.data.last_id_bisnis,
          bisnis_tokopedia: businessTokopedia,
          bisnis_shopee: businessShopee,
          bisnis_bukalapak: businessBukalapak,
        };

        await axios.post(
          `${BASE_URL}/api/business/post_update_step_five/${user.id}`,
          formStepFive,
          options,
        );
      }

      setSuccessMessage('Tambah Berhasil');
      setRedirect(true);
    } catch (e) {
      console.log(e);
      setValidation(false);
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (
      businessLogo.fileUri &&
      businessName.length !== 0 &&
      businessPosisi.length !== 0 &&
      businessDeskripsi.length !== 0
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [businessLogo, businessName, businessPosisi, businessDeskripsi]);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('BusinessKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  const RenderChangePhotoButton = () => {
    if (!loadingSubmit) {
      return (
        <KButton
          title="Upload Gambar"
          buttonStyle={styles.whiteButtonWithBorder}
          textStyle={styles.subHeaderText3}
          onPress={() => openImageLibrary()}
        />
      );
    }

    return (
      <KButton
        title="Upload Gambar"
        buttonStyle={styles.whiteButtonWithBorder}
        textStyle={{...styles.subHeaderText3, ...styles.lightGrayColor2}}
        activeOpacity={1}
        isLoading={loadingSubmit}
      />
    );
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
          onPress={() => {
            setLoadingSubmit(true);
            onSubmitBusinessData();
          }}
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
          <Text
            style={{
              ...styles.labelTextInputStyle,
              ...styles.blackColor,
              ...styles.marginBottom2,
            }}>
            Form Yang Perlu Diisi
          </Text>
          <View style={styles.alignSelfCenter}>
            <Image
              style={{
                ...styles.kartukuMainProfilePicStyle,
                ...styles.borderRadius0,
              }}
              source={{
                uri: businessLogo.fileUri
                  ? `${businessLogo.fileUri}`
                  : `https://ui-avatars.com/api/?name=Logo+Business&color=000000&background=F1F1F1&bold=true&size=128`,
              }}
            />
            <RenderChangePhotoButton />
          </View>

          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nama Bisnis *"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nama Bisnis Anda"
              value={businessName}
              onChangeText={(text) => setBusinessName(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Posisi/Jabatan *"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Posisi atau Jabatan Anda"
              value={businessPosisi}
              onChangeText={(text) => setBusinessPosisi(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Deskripsi Bisnis Anda *"
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
              placeholder="Deskripsi Bisnis Anda"
              value={businessDeskripsi}
              onChangeText={(text) => setBusinessDeskripsi(text)}
              multiline={true}
              numberOfLines={5}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.blackColor,
                ...styles.marginBottom2,
              }}>
              Form Yang Tidak Perlu Diisi Sekarang
            </Text>
            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.blackColor,
                ...styles.marginBottom2,
              }}>
              Form Kedua
            </Text>

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Alamat"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Alamat Bisnis Anda"
              value={businessAlamat}
              onChangeText={(text) => setBusinessAlamat(text)}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}>
              Provinsi
            </Text>
            <DropDownPicker
              placeholder="Pilih Provinsi"
              items={listProvinsi}
              defaultValue={businessProvinsi}
              onChangeItem={(item) => {
                setBusinessProvinsi(item.value);
                fetchKotaByProvinceId(item.value);
              }}
              containerStyle={{...styles.containerStyle}}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}>
              Kota / Kabupaten
            </Text>
            <DropDownPicker
              placeholder="Pilih Kota / Kabupaten"
              items={listKota}
              defaultValue={businessKota}
              onChangeItem={(item) => {
                setBusinessKota(item.value);
                fetchKecamatanByKotaId(item.value);
              }}
              containerStyle={{...styles.containerStyle}}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}>
              Kecamatan
            </Text>
            <DropDownPicker
              placeholder="Pilih Kecamatan"
              items={listKecamatan}
              defaultValue={businessKecamatan}
              onChangeItem={(item) => {
                setBusinessKecamatan(item.value);
                fetchKelurahanByKecamatanId(item.value);
              }}
              containerStyle={{...styles.containerStyle}}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}>
              Kelurahan
            </Text>
            <DropDownPicker
              placeholder="Pilih Kelurahan"
              items={listKelurahan}
              defaultValue={businessKelurahan}
              onChangeItem={(item) => {
                setBusinessKelurahan(item.value);
              }}
              containerStyle={{...styles.containerStyle}}
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Kode Pos"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Kode Pos Alamat Bisnis"
              value={businessKodePos}
              onChangeText={(text) => setBusinessKodePos(text)}
              keyboardType="numeric"
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.blackColor,
                ...styles.marginBottom2,
              }}>
              Form Ketiga
            </Text>

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Website"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Website Bisnis Anda"
              value={businessWebsite}
              onChangeText={(text) => setBusinessWebsite(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Email Bisnis"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Email Bisnis Anda"
              value={businessEmail}
              onChangeText={(text) => setBusinessEmail(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Telepon"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nomor Telepon Bisnis"
              value={businessPhone}
              onChangeText={(text) => setBusinessPhone(text)}
              keyboardType="numeric"
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.blackColor,
                ...styles.marginBottom2,
              }}>
              Form Keempat
            </Text>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="FACEBOOK"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.facebook.com/"
              value={businessFacebook}
              onChangeText={(text) => setBusinessFacebook(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="TWITTER"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://twitter.com/"
              value={businessTwitter}
              onChangeText={(text) => setBusinessTwitter(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="LINKEDIN"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.linkedin.com/"
              value={businessLinkedin}
              onChangeText={(text) => setBusinessLinkedin(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="INSTAGRAM"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.instagram.com/"
              value={businessInstagram}
              onChangeText={(text) => setBusinessInstagram(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="YOUTUBE"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.youtube.com/"
              value={businessYoutube}
              onChangeText={(text) => setBusinessYoutube(text)}
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.blackColor,
                ...styles.marginBottom2,
              }}>
              Form Kelima
            </Text>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Tokopedia"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.tokopedia.com/"
              value={businessTokopedia}
              onChangeText={(text) => setBusinessTokopedia(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Shopee"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://shopee.co.id/"
              value={businessShopee}
              onChangeText={(text) => setBusinessShopee(text)}
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Bukalapak"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="https://www.bukalapak.com/"
              value={businessBukalapak}
              onChangeText={(text) => setBusinessBukalapak(text)}
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

addBusinessScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default addBusinessScreen;
