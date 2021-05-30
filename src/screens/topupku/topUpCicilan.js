import React from 'react';
import {View, FlatList} from 'react-native';

// Assets
import bfiLogo from 'src/assets/image/logo/bfi-logo.png';
import hcLogo from 'src/assets/image/logo/homecredit-logo.png';
import {TCardMenu} from 'src/components';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';

const topUpCicilan = ({navigation}) => {
  const listMenu = [
    {
      image: bfiLogo,
      name: 'BFI Finance',
    },
    {
      image: hcLogo,
      name: 'Home Credit Indonesia',
    },
  ];

  return (
    <View>
      <FlatList
        data={listMenu}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TopUpOptions', {
                title: item.name,
                type: 'InternetAndCable',
              })
            }>
            <TCardMenu key={item.name} image={item.image} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

topUpCicilan.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpCicilan;
