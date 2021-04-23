import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, ActivityIndicator} from 'react-native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KCardNonTouchable} from 'src/components';

// Assets icon and image
import styles from 'src/assets/style/main';

const kartukuUserKomunitasScreen = ({route}) => {
  const [listKomunitas, setListKomunitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const userKartuku = useSelector((state) => state.userViewKartuku.kartukuUser);
  const fetchListKomunitas = async () => {
    try {
      setLoading(true);

      const {data} = await axios.get(
        `${BASE_URL}/api/member/community/${userKartuku.id}`,
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
  }, [route]);

  const RenderKomunitasData = () => {
    if (listKomunitas.length !== 0) {
      return listKomunitas.map((komunitasItem, indexData) => {
        return (
          <KCardNonTouchable
            key={komunitasItem.komunitas_id}
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
        );
      });
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
        <View style={styles.kartukuMainContainer}>
          <RenderKomunitasData />
        </View>
      )}
    </ScrollView>
  );
};

kartukuUserKomunitasScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuUserKomunitasScreen;
