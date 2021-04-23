import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {View, ActivityIndicator} from 'react-native';

// style
import styles from 'src/assets/style/main/index';

const kartuUserViewDetailScreen = ({route}) => {
  const [qrCodeUser, setQRCodeUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQRDataUserByRoute = async () => {
    try {
      setLoading(true);
      const {qrCodeLink} = route.params;
      setQRCodeUser(qrCodeLink);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRDataUserByRoute();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#504589" />
      </View>
    );
  }

  return <>{qrCodeUser && <WebView source={{uri: qrCodeUser}} />}</>;
};

kartuUserViewDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartuUserViewDetailScreen;
