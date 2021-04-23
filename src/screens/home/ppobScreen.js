import * as React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {KImageMenu} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const ppobScreen = ({navigation}) => {
  const listMenu = [
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Pulsa',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Paket Data',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Listrik',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'BPJS',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'IndiHome',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Cicilan',
      onPress: () => {},
    },
    {
      image:
        'https://dwmszb351h4q.cloudfront.net/40/static/media/react-native-logo.79778b9e.png',
      title: 'Air Pam',
      onPress: () => {},
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
          textStyle={styles.textMenuStyle}
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

ppobScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ppobScreen;
