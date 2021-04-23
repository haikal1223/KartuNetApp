import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, Text, TouchableOpacity, Platform} from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';
import CalendarBlackIcon from 'src/assets/image/svg/calendarIconBlack.svg';

const verifikasiKomunitasScreen = ({route, navigation}) => {
  const [communityId, setCommunityId] = useState(null);
  const [communityName, setCommunityName] = useState(null);
  const [nomorAnggota, setNomorAnggota] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [tanggalBergabung, setTanggalBergabung] = useState('DD/MM/YYYY');

  const listJabatan = [
    {
      label: 'Pilih Jabatan',
      value: null,
    },
    {
      label: 'Ketua',
      value: 1,
    },
    {
      label: 'Wakil Ketua',
      value: 2,
    },
    {
      label: 'Anggota',
      value: 3,
    },
  ];
  const [jabatanAnggota, setJabatanAnggota] = useState(null);

  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (
      nomorAnggota.length !== 0 &&
      nomorTelepon.length !== 0 &&
      tanggalBergabung !== 'DD/MM/YYYY' &&
      jabatanAnggota
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [nomorAnggota, nomorTelepon, tanggalBergabung, jabatanAnggota]);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('DetailKomunitas', {
        idCommunity: communityId,
        nameCommunity: communityName,
      });
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  useEffect(() => {
    if (route.params) {
      const {idCommunity, nameCommunity} = route.params;
      setCommunityId(idCommunity);
      setCommunityName(nameCommunity);
    }
  }, [route.params]);

  const onRequestVerificationKomunitas = async () => {
    try {
      setValidation(false);
      setLoadingSubmit(true);

      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      const formData = {
        user_id: user.id,
        komunitas_id: communityId,
        nomor_anggota: nomorAnggota,
        telp_anggota: nomorTelepon,
        jabatan_anggota: jabatanAnggota,
        tgl_gabung: moment(tanggalBergabung).format('YYYY/MM/DD'),
      };
      await axios.post(`${BASE_URL}/api/community/verify`, formData, options);

      setSuccessMessage('Kirim Verifikasi Berhasil');
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  };

  const RenderSubmitButton = () => {
    if (validation) {
      return (
        <KButton
          title="Verifikasi"
          buttonStyle={styles.greenBottomButton}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => onRequestVerificationKomunitas()}
        />
      );
    }

    return (
      <KButton
        title="Verifikasi"
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
      {openCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={
            tanggalBergabung === 'DD/MM/YYYY' || !tanggalBergabung
              ? new Date()
              : tanggalBergabung
          }
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setOpenCalendar(Platform.OS === 'ios');
            setTanggalBergabung(selectedDate);
          }}
          onTouchCancel={() => setTanggalBergabung(new Date())}
        />
      )}
      <ScrollView>
        <View style={styles.kartukuMainContainer}>
          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nomor Keanggotaan"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nomor Keanggotaan"
              value={nomorAnggota}
              onChangeText={(text) => setNomorAnggota(text)}
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Nomor Telepon / Whatsapp"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Nomor Telepon"
              value={nomorTelepon}
              onChangeText={(text) => setNomorTelepon(text)}
              keyboardType="numeric"
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Tanggal Gabung"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder="Tanggal Bergabung"
              value={
                tanggalBergabung === 'DD/MM/YYYY'
                  ? 'DD/MM/YYYY'
                  : moment(tanggalBergabung).format('DD/MM/YYYY')
              }
              onChangeText={(text) => setTanggalBergabung(text)}
              childrenComponent={
                <View
                  style={{
                    ...styles.forgotPasswordStyleContainer,
                    ...styles.alignItemsFlexEnd,
                  }}>
                  <TouchableOpacity
                    onPress={() => setOpenCalendar(!openCalendar)}>
                    <CalendarBlackIcon />
                  </TouchableOpacity>
                </View>
              }
            />

            <Text
              style={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}>
              Jabatan
            </Text>
            <DropDownPicker
              placeholder="Pilih Jabatan"
              items={listJabatan}
              defaultValue={jabatanAnggota}
              onChangeItem={(item) => {
                setJabatanAnggota(item.value);
              }}
              containerStyle={{
                ...styles.containerStyle,
                ...styles.paddingBottom10,
              }}
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

verifikasiKomunitasScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default verifikasiKomunitasScreen;
