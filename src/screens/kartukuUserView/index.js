import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';

// components
import {KImageMenu} from 'src/components';

// style and fonts
import styles from 'src/assets/style/main/index';

// icon
import ProfileIcon from 'src/assets/image/svg/icon/profileIcon.svg';
import BusinessIcon from 'src/assets/image/svg/icon/businessIcon.svg';
import KomunitasIcon from 'src/assets/image/svg/icon/komunitasPurpleIcon.svg';
import PortfolioIcon from 'src/assets/image/svg/icon/portfolioIcon.svg';
// import ResumeIcon from 'src/assets/image/svg/icon/resumeIcon.svg';
import ShareMeIcon from 'src/assets/image/svg/icon/shareMeIcon.svg';
import ChatMeIcon from 'src/assets/image/svg/icon/chatMeIcon.svg';

import {BASE_URL} from 'src/helpers/api';

// action creator
import {assignUserDataViewKartuku} from 'src/helpers/redux/actions';

const kartukuUserViewScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [pekerjaan, setPekerjaan] = useState('');
  const [phone, setPhone] = useState('');
  const [backgroundKartuku, setBackgroundKartuku] = useState(
    require('src/assets/image/background/kartuku/purpleBackgroundKartuku.png'),
  );
  const [fontKartuku, setFontKartuku] = useState({
    bold: null,
    normal: null,
  });
  const [fillSVGColor, setFillSVGColor] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdditionalInfoUserKartuku = async () => {
    try {
      setLoading(true);
      const asyncStorageUserSlug = await AsyncStorage.getItem(
        '@anotherUserSlug',
      );
      const user = JSON.parse(asyncStorageUserSlug);
      console.log(user);
      const resultAdditionalInfoKartuku = await axios.get(
        `${BASE_URL}/api/member/${user.slug}`,
      );

      const {data: additionalDataKartuku} = resultAdditionalInfoKartuku;
      const {
        id,
        name,
        slug,
        email,
        profile_photo_path,
        phone,
        bio,
        pekerjaan,
        facebook,
        twitter,
        linkedin,
        instagram,
        themes_color,
        themes_font,
      } = additionalDataKartuku.data;

      const userViewKartuku = {
        id,
        name,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        slug,
        email,
        profile_photo_path,
        phone,
        bio,
        pekerjaan,
        facebook,
        twitter,
        linkedin,
        instagram,
        themes_color,
        themes_font,
      };
      dispatch(assignUserDataViewKartuku(userViewKartuku));

      let backgroundColor = require('src/assets/image/background/kartuku/purpleBackgroundKartuku.png');
      let fontFamily = {
        bold: 'fontRobotoBold',
        normal: 'fontRobotoRegular',
      };

      let fillSVGColorValue = '#504589';

      if (themes_color === 'purple') {
        backgroundColor = require('src/assets/image/background/kartuku/purpleBackgroundKartuku.png');
        fillSVGColorValue = '#504589';
      }

      if (themes_color === 'orange') {
        backgroundColor = require('src/assets/image/background/kartuku/orangeBackgroundKartuku.png');
        fillSVGColorValue = '#CE7F42';
      }

      if (themes_color === 'blue') {
        backgroundColor = require('src/assets/image/background/kartuku/blueBackgroundKartuku.png');
        fillSVGColorValue = '#33A1FD';
      }

      if (themes_color === 'green') {
        backgroundColor = require('src/assets/image/background/kartuku/greenBackgroundKartuku.png');
        fillSVGColorValue = '#42CE9C';
      }

      if (themes_color === 'red') {
        backgroundColor = require('src/assets/image/background/kartuku/redBackgroundKartuku.png');
        fillSVGColorValue = '#CD4142';
      }

      if (themes_font === 'Roboto') {
        fontFamily = {
          bold: 'fontRobotoBold',
          normal: 'fontRobotoRegular',
        };
      }

      if (themes_font === 'Itim') {
        fontFamily = {
          bold: 'fontItimRegular',
          normal: 'fontItimRegular',
        };
      }

      if (themes_font === 'Montserrat') {
        fontFamily = {
          bold: 'fontMonserratBold',
          normal: 'fontMonserratRegular',
        };
      }

      if (themes_font === 'Oswald') {
        fontFamily = {
          bold: 'fontOswaldBold',
          normal: 'fontOswaldRegular',
        };
      }

      if (themes_font === 'Trispace') {
        fontFamily = {
          bold: 'fontTrispaceBold',
          normal: 'fontTrispaceRegular',
        };
      }

      if (themes_font === 'Merriweather') {
        fontFamily = {
          bold: 'fontMerriweatherBold',
          normal: 'fontMerriweatherRegular',
        };
      }

      if (themes_font === 'Playfair+Display') {
        fontFamily = {
          bold: 'fontPlayfairDisplayBold',
          normal: 'fontPlayfairDisplayRegular',
        };
      }

      setBackgroundKartuku(backgroundColor);
      setFontKartuku(fontFamily);
      setName(name);
      setPekerjaan(pekerjaan);
      setPhoto(profile_photo_path);
      setPhone(phone);
      setFillSVGColor(fillSVGColorValue);
      setLoading(false);
    } catch (e) {
      setBackgroundKartuku(
        require('src/assets/image/background/kartuku/purpleBackgroundKartuku.png'),
      );
      setFontKartuku({
        bold: null,
        normal: null,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdditionalInfoUserKartuku();
  }, []);

  const handleWhatsApp = () => {
    if (phone.length !== 0) {
      Linking.openURL(
        `whatsapp://send?phone=${
          phone[0] !== '6' ? phone.replace('0', '62') : phone
        }`,
      );
    } else {
      alert('Not Have Phone Number!');
    }
  };

  const listKartukuMenu = [
    {
      image: ProfileIcon,
      title: 'Profile',
      onPress: () => navigation.navigate('ProfileUserViewKartuku'),
    },
    {
      image: BusinessIcon,
      title: 'Business',
      onPress: () => navigation.navigate('BusinessUserViewKartuku'),
    },
    {
      image: KomunitasIcon,
      title: 'Komunitas',
      onPress: () => navigation.navigate('KomunitasUserViewKartuku'),
    },
    {
      image: PortfolioIcon,
      title: 'Karir',
      onPress: () => navigation.navigate('PortofolioUserViewKartuku'),
    },
    {
      image: ShareMeIcon,
      title: 'Share!',
      onPress: () => navigation.navigate('ShareMeUserViewKartuku'),
    },
    {
      image: ChatMeIcon,
      title: 'Chat Me',
      onPress: handleWhatsApp,
    },
  ];

  const RenderKartukuMenu = () => {
    return listKartukuMenu.map((menuItem) => {
      return (
        <KImageMenu
          key={menuItem.title}
          containerMenuStyle={{
            ...styles.containerKartukuMenuStyle,
            ...styles.marginHorizontalMenu_10,
          }}
          onPress={menuItem.onPress}
          containerViewStyle={{
            ...styles.containerKartukuMenuViewStyle,
            ...styles.kartukuBackgroundWhite,
            ...styles.justifyContentCenter,
            ...styles.alignItemsCenter,
            ...styles.marginBottom1,
          }}
          SVGComponent={menuItem.image}
          isImageSvg={true}
          isFillSVGCostumColor={true}
          fillSVGColor={fillSVGColor}
          textStyle={{
            ...styles.kartukuTitleMenuStyle,
            ...styles.whiteColor,
            ...styles[fontKartuku.bold ? fontKartuku.bold : 'fontBold'],
          }}
          titleMenu={menuItem.title}
        />
      );
    });
  };

  if (loading) {
    return <View />;
  }

  return (
    <>
      <ScrollView scrollEnabled={false}>
        <SafeAreaView
          scrollEnabled={false}
          style={styles.kartukuMainContainerFit}>
          <View style={styles.kartukuBoxContainer}>
            {/* Section Main White Box */}
            <View style={styles.kartukuWhiteBoxContainer}>
              <View
                style={{
                  ...styles.marginBottom7,
                  ...styles.flex1,
                  ...styles.flex1DirectionRow,
                }}>
                <Image
                  style={styles.kartukuMainProfilePicStyle}
                  source={{
                    uri: photo
                      ? `${photo}`
                      : `https://ui-avatars.com/api/?name=${
                          name.split(' ')[0]
                        }+${
                          name.split(' ')[1]
                        }&color=000000&background=F1F1F1&bold=true&size=128`,
                  }}
                />
                <View
                  style={{
                    ...styles.paddingVertical5px,
                    ...styles.marginHorizontalMenu_13px,
                    ...styles.flex1DirectionColumn,
                  }}>
                  <Text
                    style={{
                      ...styles.fontSize5,
                      ...styles.marginBottom3px,
                      ...styles[
                        fontKartuku.bold ? fontKartuku.bold : 'fontBold'
                      ],
                    }}>
                    {name}
                  </Text>
                  <Text
                    style={{
                      ...styles.fontSize4,
                      ...styles.marginBottom15px,
                      ...styles[
                        fontKartuku.normal ? fontKartuku.normal : 'fontNormal'
                      ],
                    }}>
                    {pekerjaan}
                  </Text>
                </View>
              </View>
            </View>
            {/* End Section Main White Box */}
            <SafeAreaView
              style={{
                ...styles.positionRelative,
                ...styles.whiteBackgroundColor,
              }}>
              <SafeAreaView>
                <Image
                  source={backgroundKartuku}
                  style={styles.kartukuBackgroundStyle}
                />
                <View style={styles.kartukuPurpleMenuBoxContainer}>
                  <RenderKartukuMenu />
                </View>
              </SafeAreaView>
            </SafeAreaView>
            {/* End Section Main Purple Box */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

kartukuUserViewScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuUserViewScreen;
