import React from 'react';
import {FlatList, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Assets
import indihomeLogo from 'src/assets/image/logo/indihome-logo.png';
import mncLogo from 'src/assets/image/logo/mnc-logo.png';
import {TCardMenu} from 'src/components';
import PropTypes from 'prop-types';

const topUpIndihome = ({navigation}) => {
  const listMenu = [
    {
      image: indihomeLogo,
      name: 'Indihome',
    },
    {
      image: mncLogo,
      name: 'MNC Vision',
    },
  ];

  //   const RenderListMenu = () => {
  //     return listMenu.map((item) => {
  //       return <TCardMenu key={item.name} image={item.image} name={item.name} />;
  //     });
  //   };

  return (
    <View>
      <FlatList
        data={listMenu}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('topUpOptions', {title: item.name})
            }>
            <TCardMenu key={item.name} image={item.image} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

topUpIndihome.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpIndihome;
