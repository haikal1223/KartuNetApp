import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Assets
import pln_logo from 'src/assets/image/logo/pln-logo.png';
import {TCardMenu} from 'src/components';

const topUpListrik = ({navigation}) => {
  const listItem = [
    {
      image: pln_logo,
      name: 'PLN Electricity Bill',
    },
    {
      image: pln_logo,
      name: 'PLN Electricity Token',
    },
    {
      image: pln_logo,
      name: 'PLN Non-Taglist',
    },
  ];
  console.log(navigation);
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={listItem}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ListrikOptions')}>
            <TCardMenu key={item.name} image={item.image} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

topUpListrik.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default topUpListrik;
