import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// Styles
import styles from 'src/assets/style/main/index';

// Assets
import TimeOutline from 'src/assets/image/svg/time-outline.svg';

import moment from 'moment';

const promo = () => {
  const [loading, setLoading] = useState(false);
  const [listPromo, setListPromo] = useState([]);

  const fetchListPromo = async () => {
    try {
      setLoading(true);

      const {data} = await axios.get(`${BASE_URL}/api/promo`);
      setListPromo(data.data);
      // console.log(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setListPromo([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListPromo();
  }, []);

  const RenderPromo = () => {
    if (listPromo.length !== 0) {
      return listPromo.map((item) => {
        // console.log(`${BASE_URL}/public/storage/promo/${item.image}`);
        if (item.status === 1) {
          return (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              key={item.title}
              style={styles.promoContainer}
              >
              <View style={styles.promoCardContainer}>
                <View style={styles.promoMainImage}>
                  <Image
                    style={styles.promoBannerImage}
                    source={{
                      uri: `${BASE_URL}/public/storage/promo/${item.image}`,
                    }}
                  />
                </View>
                <View style={styles.promoMainInfo}>
                  <Text style={styles.promoTitleText}> {item.title} </Text>
                  <View style={styles.promoPeriodTime}>
                    <TimeOutline style={styles.promoPeriodTimeIcon} />
                    <View style={styles.marginLeft2}>
                      <Text style={styles.promoPeriodPromoText}>
                        Periode Promo
                      </Text>
                      {moment(item.start_date).format('MM') ===
                      moment(item.end_date).format('MM') ? (
                        <Text style={styles.promoDateText}>{`${moment(
                          item.start_date,
                        ).format('D')} - ${moment(item.end_date).format(
                          'DD MMMM YYYY',
                        )}`}</Text>
                      ) 
                      :
                      moment(item.start_date).format('YY') !== 
                      moment(item.end_date).format('YY') ? (
                        <Text style={styles.promoDateText}>{`${moment(
                          item.start_date,
                        ).format('DD MMM YYYY')} - ${moment(item.end_date).format(
                          'DD MMMM YYYY',
                        )}`}</Text>
                      )
                      :
                      (
                        <Text style={styles.promoDateText}>{`${moment(
                          item.start_date,
                        ).format('DD MMMM')} - ${moment(item.end_date).format(
                          'DD MMMM YYYY',
                        )}`}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
        return null;
      });
    }

    return <View />;
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#504589" />
        </View>
      ) : (
        <View>
          <RenderPromo />
        </View>
      )}
    </ScrollView>
  );
};

export default promo;
