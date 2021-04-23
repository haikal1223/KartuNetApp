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

const qrCodeDetailScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);

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
            <QRCode value={`${BASE_URL}/${user.slug}`} size={200} />
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
      <View>
        <KButton
          title="Scan QR Code"
          buttonStyle={styles.kartukuBottomButtonStyle}
          textStyle={{
            ...styles.blackColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => navigation.navigate('ScanBarcode')}
        />
      </View>
    </>
  );
};

qrCodeDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default qrCodeDetailScreen;
