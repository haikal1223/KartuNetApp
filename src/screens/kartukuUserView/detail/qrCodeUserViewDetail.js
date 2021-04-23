import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

import {View, Text, ScrollView} from 'react-native';

// connection to API
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const qrCodeUserViewDetailScreen = ({navigation}) => {
  const userKartuku = useSelector((state) => state.userViewKartuku.kartukuUser);

  return (
    <>
      <ScrollView>
        {/* Container Start */}
        <View style={styles.kartukuMainContainer}>
          <View
            style={{
              ...styles.flex1DirectionColumn,
              ...styles.alignItemsCenter,
              ...styles.alignSelfCenter,
            }}>
            <QRCode value={`${BASE_URL}/${userKartuku.slug}`} size={200} />
            <Text
              style={{
                ...styles.marginTop55,
                ...styles.subHeaderText,
                ...styles.purpleMainColor,
              }}>
              SCAN ME
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

qrCodeUserViewDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default qrCodeUserViewDetailScreen;
