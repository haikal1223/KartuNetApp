import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

// components
import {KButton} from 'src/components';

// icon and style
import styles from 'src/assets/style/main';
import FacebookIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-facebook.svg';
import EmailIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-mail.svg';
import TwitterIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-twitter.svg';
import LinkedinIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-linkedin.svg';
import InstagramIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-instagram.svg';
import WhatsappIcon from 'src/assets/image/svg/icon/kartukuLinks/logo-whatsapp.svg';

import {BASE_URL} from 'src/helpers/api';

const kartukuProfileScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const {phone, email, facebook, linkedin, instagram, twitter} = user;

  const SocialMediaLinks = [
    {
      icon: <FacebookIcon />,
      link: facebook,
      title: 'Facebook',
      onPress: () => Linking.openURL(`${facebook}`),
    },
    {
      icon: <EmailIcon />,
      link: email,
      title: 'Email',
      onPress: () => Linking.openURL(`mailto:${email}`),
    },
    {
      icon: <TwitterIcon />,
      link: twitter,
      title: 'Twitter',
      onPress: () => Linking.openURL(`${twitter}`),
    },
    {
      icon: <LinkedinIcon />,
      link: linkedin,
      title: 'Linkedin',
      onPress: () => Linking.openURL(`${linkedin}`),
    },
    {
      icon: <InstagramIcon />,
      link: instagram,
      title: 'Instagram',
      onPress: () => Linking.openURL(`${instagram}`),
    },
    // {
    //   icon: <WhatsappIcon />,
    //   link: phone,
    //   title: 'Whatsapp',
    //   onPress: () =>
    //     Linking.openURL(
    //       `whatsapp://send?phone=${
    //         phone[0] !== '6' ? phone.replace('0', '62') : phone
    //       }`,
    //     ),
    // },
  ];

  const outputDescriptionUser = () => {
    if (user.bio) {
      return user.bio;
    }
    return 'Tidak ada deskripsi';
  };

  return (
    <FlatList
      // contentContainerStyle={{
      //   flexDirection: 'column',
      //   flex: 1,
      // }}
      columnWrapperStyle={{
        ...styles.justifyContentSpaceBetween,
        ...styles.kartukuLinksProfileContainer,
      }}
      numColumns={2}
      data={SocialMediaLinks}
      // eslint-disable-next-line react/prop-types
      keyExtractor={(item) => item.title}
      renderItem={({item}) => {
        if (item.link) {
          return (
            <TouchableOpacity style={styles.width30perc} onPress={item.onPress}>
              <View
                style={{
                  ...styles.flex1DirectionRow,
                  ...styles.marginTop15,
                  ...styles.marginBottom1,
                }}>
                {item.icon}
                <Text
                  style={{
                    ...styles.subHeaderText2,
                    ...styles.marginLeft5,
                    ...styles.alignSelfCenter,
                  }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }

        return null;
      }}
      ListHeaderComponent={
        <SafeAreaView>
          <ScrollView>
            <View style={{...styles.kartukuMainFlatListContainer}}>
              <View style={styles.alignSelfCenter}>
                <View style={styles.kartukuMainProfilePicContainer}>
                  <Image
                    style={styles.kartukuMainProfilePicStyle}
                    source={{
                      uri: user.photo
                        ? `${BASE_URL}/public/storage/${user.photo}`
                        : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&color=000000&background=F1F1F1&bold=true&size=128`,
                    }}
                  />
                </View>
                <Text
                  style={{
                    ...styles.subHeaderText,
                    ...styles.marginBottom1,
                    ...styles.alignSelfCenter,
                  }}>
                  {user.name}
                </Text>
                <Text
                  style={{
                    ...styles.subHeaderRegulerText,
                    ...styles.marginBottom3,
                    ...styles.alignSelfCenter,
                  }}>
                  {user.pekerjaan}
                </Text>
              </View>

              <Text style={styles.subHeaderRegulerText2}>
                {outputDescriptionUser()}
              </Text>
              <Text
                style={{
                  ...styles.marginTop30,
                  ...styles.subHeaderText,
                  ...styles.marginBottom1,
                }}>
                Links
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      }
      // ListFooterComponentStyle={}
      ListFooterComponent={
        <View style={styles.marginTop19perc}>
          <KButton
            title="Edit Profile"
            buttonStyle={styles.kartukuBottomButtonStyle}
            textStyle={{
              ...styles.blackColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      }
    />
  );
};

kartukuProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuProfileScreen;
