import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KCardNonTouchable} from 'src/components';

// Assets icon and image
import styles from 'src/assets/style/main';

const kartukuUserPortfolioScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [listPortfolio, setListPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);

  const userKartuku = useSelector((state) => state.userViewKartuku.kartukuUser);

  const fetchListPortfolio = async () => {
    try {
      setLoading(true);

      const {data} = await axios.get(
        `${BASE_URL}/api/member/portfolio/${userKartuku.id}`,
      );

      setListPortfolio(data.data);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setListPortfolio([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListPortfolio();
  }, [route.params, isFocused]);

  const RenderKomunitasData = () => {
    if (listPortfolio.length !== 0) {
      return listPortfolio.map((portofolioItem, indexData) => {
        return (
          <KCardNonTouchable
            key={portofolioItem.id}
            containerCardStyle={
              indexData !== listPortfolio.length - 1
                ? {
                    ...styles.kartukuCardContainer,
                    ...styles.borderLightGray1px,
                  }
                : {
                    ...styles.kartukuCardContainer,
                  }
            }
            cardTitle={portofolioItem.jabatan}
            showLeftMenu={false}
            textMiddleContentStyle={{
              ...styles.subHeaderRegulerText2,
              ...styles.blackColor,
            }}
            hasContentNonSocialMedia
            hasImage={false}
            textMiddleContent={portofolioItem.nama}
            textBottomContent={portofolioItem.tahun}
            descriptionTextStyle={{
              ...styles.subHeaderRegulerText2,
              ...styles.marginTop15,
            }}
            descriptionText={portofolioItem.deskripsi}
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
            <RenderKomunitasData />
          </View>
        )}
      </ScrollView>
    </>
  );
};

kartukuUserPortfolioScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuUserPortfolioScreen;
