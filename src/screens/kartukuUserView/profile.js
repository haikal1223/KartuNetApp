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

const kartukuUserProfileScreen = ({navigation}) => {
  const userKartuku = useSelector((state) => state.userViewKartuku.kartukuUser);
  const {email, facebook, linkedin, instagram, twitter} = userKartuku;

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
  ];

  const outputDescriptionUser = () => {
    if (userKartuku.bio) {
      return userKartuku.bio;
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
                      uri: userKartuku.profile_photo_path
                        ? `${userKartuku.profile_photo_path}`
                        : `https://ui-avatars.com/api/?name=${userKartuku.firstName}+${userKartuku.lastName}&color=000000&background=F1F1F1&bold=true&size=128`,
                    }}
                  />
                </View>
                <Text
                  style={{
                    ...styles.subHeaderText,
                    ...styles.marginBottom1,
                    ...styles.alignSelfCenter,
                  }}>
                  {userKartuku.name}
                </Text>
                <Text
                  style={{
                    ...styles.subHeaderRegulerText,
                    ...styles.marginBottom3,
                    ...styles.alignSelfCenter,
                  }}>
                  {userKartuku.pekerjaan}
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
    />
  );
};

kartukuUserProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuUserProfileScreen;
