import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View, SafeAreaView} from 'react-native';
import {KImageMenu} from 'src/components';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// Style
import styles from 'src/assets/style/main/index';
import {ScrollView} from 'react-native-gesture-handler';

const komunitasScreen = ({navigation}) => {
  const [listCommunity, setListCommunity] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCommunityList = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`${BASE_URL}/api/community`);
      const listCommunity = await data.data.map((itemData) => {
        return {
          name: itemData.name,
          image: itemData.logo,
          onPress: () =>
            navigation.navigate('DetailKomunitas', {
              idCommunity: itemData.id,
              nameCommunity: itemData.name,
              nomorAnggota: null,
              slugCommunity: itemData.slug,
            }),
        };
      });
      setListCommunity(listCommunity);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setListCommunity([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityList();
  }, []);

  const RenderListMenu = () => {
    if (listCommunity.length > 0) {
      return listCommunity.map((menuItem) => {
        return (
          <KImageMenu
            key={menuItem.name}
            containerMenuStyle={{
              ...styles.containerKomunitasMenuStyle,
              ...styles.marginHorizontalMenu_5px,
            }}
            onPress={menuItem.onPress}
            imageStyle={styles.imageKomunitasMenuStyle}
            imageSource={`${BASE_URL}/public/storage/community/${menuItem.image}`}
            textStyle={styles.komunitasMenuStyle}
            titleMenu={menuItem.name}
          />
        );
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
        <SafeAreaView style={styles.komunitasContainer}>
          <RenderListMenu />
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

komunitasScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default komunitasScreen;
