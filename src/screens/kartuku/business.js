import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// components
import {KButton, KCardNonTouchable} from 'src/components';

// Assets icon and image
import styles from 'src/assets/style/main';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

const kartukuBusinessScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const resultBusinessUser = await axios.get(
        `${BASE_URL}/api/business/${user.id}`,
        options,
      );
      const {data: businessData} = resultBusinessUser.data;

      setLoading(false);
      setBusinessData(businessData);
    } catch (err) {
      setLoading(false);
      setBusinessData([]);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, [route.params, isFocused]);

  const RenderBusinessData = () => {
    if (businessData.length !== 0) {
      return businessData.map((businessItem, indexData) => {
        return (
          <KCardNonTouchable
            key={businessItem.name}
            containerCardStyle={
              indexData !== businessData.length - 1
                ? {
                    ...styles.kartukuCardContainer,
                    ...styles.borderLightGray1px,
                  }
                : {
                    ...styles.kartukuCardContainer,
                  }
            }
            sourceImage={`${BASE_URL}/public/storage/business/${businessItem.logo}`}
            cardTitle={businessItem.name}
            hasSocialMedia={true}
            websiteLink={businessItem.website}
            facebookLink={businessItem.facebook}
            instagramLink={businessItem.instagram}
            // locationLink={businessItem.location}
            // Belum ada halaman detail business, sama endpoint get business detail
            onPress={() =>
              navigation.navigate('detailBusiness', {
                businessData: businessItem,
              })
            }
            // descriptionText={businessItem.description}
          />
        );
      });
    }

    return <View />;
  };

  return (
    <>
      <ScrollView>
        {/* Container Start */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#504589" />
          </View>
        ) : (
          <View style={styles.kartukuMainContainer}>
            <RenderBusinessData />
          </View>
        )}
      </ScrollView>
      {loading ? null : (
        <View>
          <KButton
            title="Tambah Bisnis"
            buttonStyle={styles.kartukuBottomButtonStyle}
            textStyle={{
              ...styles.blackColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => navigation.navigate('addBusiness')}
          />
        </View>
      )}
    </>
  );
};

kartukuBusinessScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuBusinessScreen;

// │ { id: 'eyJpdiI6Ik0rOUs3b0tDNTdSdDRHS1RvSnJGUkE9PSIsInZhbHVlIjoiQWtMM1I2NUJjS2w2UjgrUUtiMFNQUT09IiwibWFjIjoiZWUyNjA2ODNhMmZmMzRkMGYxOTI4YzI0YmFkZDZjNTNhZWFkYmVkZTMzNTM4ODcxNjI3NWFkODE5NmEzODEzNyJ9',
// │ name: 'Tutor Code',
// │ slug: 'tutorcode',
// │ posisi: 'Owner',
// │ deskripsi: 'Belajar coding',
// │ logo: 'TutorCode-1603213298-.png',
// │ website: null,
// │ email: null,
// │ phone: null,
// │ alamat: null,
// │ provinsi_id: null,
// │ kota_id: null,
// │ kecamatan_id: null,
// │ kelurahan_id: null,
// │ kode_pos: null,
// │ facebook: null,
// │ twitter: null,
// │ linkedin: null,
// │ instagram: null,
// │ youtube: null,
// │ tokopedia: null,
// │ bukalapak: null,
// │ shopee: null,
// │ verifikasi: 0 },
