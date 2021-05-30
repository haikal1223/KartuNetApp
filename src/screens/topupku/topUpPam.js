import React from 'react';
import {Text, FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Assets
import aetraLogo from 'src/assets/image/logo/aetra-logo.png';
import atsLogo from 'src/assets/image/logo/ats-logo.png';
import {TCardMenu} from 'src/components';
import PropTypes from 'prop-types';

const topUpPam = ({navigation}) => {
  const listMenu = [
    {
      image: aetraLogo,
      name: 'Jakarta Aetra',
    },
    {
      image: atsLogo,
      name: 'PAM ATS Palembang',
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
                type: 'Pam',
              })
            }>
            <TCardMenu key={item.name} image={item.image} name={item.name} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

topUpPam.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpPam;
