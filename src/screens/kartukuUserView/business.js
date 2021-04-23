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

const kartukuUserBusinessScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [businessData, setBusinessData] = useState([]);

  const userKartuku = useSelector((state) => state.userViewKartuku.kartukuUser);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);

      const resultBusinessUser = await axios.get(
        `${BASE_URL}/api/member/business/${userKartuku.id}`,
      );
      const {data: businessData} = resultBusinessUser.data;

      console.log(businessData);

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
              navigation.navigate('kartukuUserBusinessDetail', {
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
    </>
  );
};

kartukuUserBusinessScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuUserBusinessScreen;
