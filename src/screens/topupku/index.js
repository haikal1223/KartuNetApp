import * as React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {KImageMenu} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const topUpKuScreen = ({navigation}) => {
  const listMenu = [
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Pulsa',
      onPress: () => {
        navigation.navigate('Pulsa');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Paket Data',
      onPress: () => {
        navigation.navigate('PaketData');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Listrik',
      onPress: () => {
        navigation.navigate('Listrik');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'BPJS',
      onPress: () => {
        navigation.navigate('BPJS');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Internet & Cable Tv',
      onPress: () => {
        navigation.navigate('Indihome');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Cicilan',
      onPress: () => {
        navigation.navigate('Cicilan');
      },
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'PDAM',
      onPress: () => {
        navigation.navigate('AirPam');
      },
    },
  ];

  const RenderListMenu = () => {
    return listMenu.map((menuItem) => {
      return (
        <KImageMenu
          key={menuItem.title}
          containerMenuStyle={{
            ...styles.containerMenuStyle,
            ...styles.marginHorizontalMenu_9px,
          }}
          onPress={menuItem.onPress}
          containerViewStyle={styles.containerMenuViewStyle}
          imageStyle={styles.imageMenuStyle}
          imageSource={menuItem.image}
          textStyle={styles.topUpKuMenuStyle}
          titleMenu={menuItem.title}
        />
      );
    });
  };

  return (
    <View style={styles.topUpKuContainer}>
      <RenderListMenu />
    </View>
  );
};

topUpKuScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default topUpKuScreen;
