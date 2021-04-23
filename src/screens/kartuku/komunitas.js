import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KCardNonTouchable} from 'src/components';

// Assets icon and image
import styles from 'src/assets/style/main';

const kartukuKomunitasScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [listKomunitas, setListKomunitas] = useState([]);
  const [
    listWaitingVerificationKomunitas,
    setListWaitingVerificationKomunitas,
  ] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const fetchListKomunitas = async () => {
    try {
      // setLoading(true);

      const {data} = await axios.get(
        `${BASE_URL}/api/member/community/${user.id}`,
      );

      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: listKomunitasKu} = await axios.get(
        `${BASE_URL}/api/community/komunitasku/${user.id}`,
        options,
      );
      const {data_komunitas} = listKomunitasKu.data;
      // console.log(user.id);
      console.log('waiting');
      console.log(listKomunitasKu.data);

      setListWaitingVerificationKomunitas(
        data_komunitas
          ? data_komunitas.filter(
              (komunitasItem) => komunitasItem.status_verifikasi === 0,
            )
          : [],
      );

      setListKomunitas(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setListKomunitas([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListKomunitas();
  }, [route.params, isFocused]);

  const RenderKomunitasData = () => {
    if (listKomunitas.length !== 0) {
      return listKomunitas.map((komunitasItem, indexData) => {
        console.log('komunitas data');
        console.log(komunitasItem);
        return (
          <TouchableOpacity
            key={komunitasItem.komunitas_id}
            onPress={() =>
              navigation.navigate('DetailKomunitas', {
                idCommunity: komunitasItem.komunitas_id,
                nameCommunity: komunitasItem.nama_komunitas,
                nomorAnggota: komunitasItem.nomor_anggota,
              })
            }>
            <KCardNonTouchable
              containerCardStyle={
                indexData !== listKomunitas.length - 1
                  ? {
                      ...styles.kartukuCardContainer,
                      ...styles.borderLightGray1px,
                    }
                  : {
                      ...styles.kartukuCardContainer,
                    }
              }
              sourceImage={`${BASE_URL}/public/storage/community/${komunitasItem.logo_komunitas}`}
              hasContentNonSocialMedia={true}
              cardTitle={komunitasItem.nama_komunitas}
              textMiddleContent={`ID Anggota: ${komunitasItem.nomor_anggota}`}
              textBottomContent={`Tanggal Bergabung: ${komunitasItem.tgl_gabung}`}
            />
          </TouchableOpacity>
        );
      });
    }

    return <View />;
  };

  const RenderWaitingVerificationKomunitas = () => {
    if (listWaitingVerificationKomunitas.length !== 0) {
      return listWaitingVerificationKomunitas.map(
        (komunitasItem, indexData) => {
          return (
            <TouchableOpacity
              key={komunitasItem.komunitas_id}
              onPress={() =>
                navigation.navigate('DetailKomunitas', {
                  idCommunity: komunitasItem.id,
                  nameCommunity: komunitasItem.name,
                  nomorAnggota: null,
                  slugCommunity: komunitasItem.slug,
                })
              }>
              <KCardNonTouchable
                containerCardStyle={
                  indexData !== listWaitingVerificationKomunitas.length - 1
                    ? {
                        ...styles.kartukuCardContainer,
                        ...styles.borderLightGray1px,
                      }
                    : {
                        ...styles.kartukuCardContainer,
                      }
                }
                sourceImage={`${BASE_URL}/public/storage/community/${komunitasItem.logo}`}
                hasContentNonSocialMedia={true}
                cardTitle={komunitasItem.name}
                textMiddleContent={`ID Anggota: ${komunitasItem.nomor_anggota}`}
                textBottomContent={`Tanggal Request Verifikasi: ${komunitasItem.tgl_gabung}`}
              />
            </TouchableOpacity>
          );
        },
      );
    }

    return <View />;
  };

  return (
    <ScrollView>
      {/* Container Start */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#504589" />
        </View>
      ) : (
        <View style={styles.kartukuMainContainerKomunitasku}>
          <View
            style={{
              ...styles.flex1DirectionRow,
              ...styles.justifyContentSpaceBetween,
              ...styles.marginBottom3,
            }}>
            <Text style={{...styles.subHeaderText2, ...styles.lightGrayColor2}}>
              KOMUNITAS ANDA
            </Text>
            {/* <TouchableOpacity>
              <Text style={{...styles.subHeaderText3}}>Lihat Semua</Text>
            </TouchableOpacity> */}
          </View>
          <View>
            <RenderKomunitasData />
          </View>

          <View
            style={{
              ...styles.flex1DirectionRow,
              ...styles.justifyContentSpaceBetween,
              ...styles.marginBottom3,
            }}>
            <Text style={{...styles.subHeaderText2, ...styles.lightGrayColor2}}>
              MENUNGGU VERIFIKASI
            </Text>
            {/* <TouchableOpacity>
              <Text style={{...styles.subHeaderText3}}>Lihat Semua</Text>
            </TouchableOpacity> */}

            {/* Render Card Menunggu Verification Samain dengan yang ada di <RenderKomunitasData /> aja. buat component baru yang ngerender list menunggu verifikasi */}
          </View>
          <View>
            <RenderWaitingVerificationKomunitas />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

kartukuKomunitasScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuKomunitasScreen;
