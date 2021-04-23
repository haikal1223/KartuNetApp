import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// components
import {KImageMenu, KButton, KRBSheet} from 'src/components';

// style and fonts
import styles from 'src/assets/style/main/index';
import ChevronDown from 'src/assets/image/svg/ic_chevron_down_white.svg';
import PurpleCheck from 'src/assets/image/svg/purpleCheck.svg';
import WhiteCheck from 'src/assets/image/svg/whiteCheck.svg';

// icon
import ProfileIcon from 'src/assets/image/svg/icon/profileIcon.svg';
import BusinessIcon from 'src/assets/image/svg/icon/businessIcon.svg';
import KomunitasIcon from 'src/assets/image/svg/icon/komunitasPurpleIcon.svg';
import PortfolioIcon from 'src/assets/image/svg/icon/portfolioIcon.svg';
// import ResumeIcon from 'src/assets/image/svg/icon/resumeIcon.svg';
import ShareMeIcon from 'src/assets/image/svg/icon/shareMeIcon.svg';
import ChatMeIcon from 'src/assets/image/svg/icon/chatMeIcon.svg';

import {BASE_URL} from 'src/helpers/api';

const kartukuScreen = ({navigation}) => {
  const [backgroundColorName, setBackgroundColorName] = useState('');
  const [fontName, setFontName] = useState(null);
  const [colorName, setColorName] = useState(null);
  const [fillSVGColor, setFillSVGColor] = useState('');
  const [backgroundKartuku, setBackgroundKartuku] = useState('');
  const [fontKartuku, setFontKartuku] = useState({
    bold: null,
    normal: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [modalBackgroundOpen, setModalBackgroundOpen] = useState(false);
  const [modalFontOpen, setModalFontOpen] = useState(false);

  const listFont = [
    {
      label: 'Default',
      value: null,
    },
    {
      label: 'Roboto',
      value: 'Roboto',
    },
    {
      label: 'Itim',
      value: 'Itim',
    },
    {
      label: 'Montserrat',
      value: 'Montserrat',
    },
    {
      label: 'Oswald',
      value: 'Oswald',
    },
    {
      label: 'Trispace',
      value: 'Trispace',
    },
    {
      label: 'Merriweather',
      value: 'Merriweather',
    },
    {
      label: 'Playfair Display',
      value: 'Playfair+Display',
    },
  ];

  const listBackground = [
    {
      label: 'Pilih Warna',
      value: null,
    },
    {
      label: 'Purple',
      value: 'purple',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Red',
      value: 'red',
    },
  ];

  const user = useSelector((state) => state.auth.user);
  const {phone} = user;

  const fetchAdditionalInfoUserKartuku = async () => {
    try {
      setLoading(true);
      const resultAdditionalInfoKartuku = await axios.get(
        `${BASE_URL}/api/member/${user.slug}`,
      );
      const {data: additionalDataKartuku} = resultAdditionalInfoKartuku;
      const {themes_color, themes_font} = additionalDataKartuku.data;
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
      setColorName(themes_color ? themes_color : 'purple');
      setFontName(themes_font ? themes_font : 'Roboto');
      setBackgroundColorName(themes_color ? themes_color : 'purple');
      setBackgroundKartuku(backgroundColor);
      setFontKartuku(fontFamily);
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
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const updateBackground = async (backgroundNameValue) => {
    try {
      setLoadingButton(true);
      let options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        `${BASE_URL}/api/user/change_color`,
        {
          user_id: user.id,
          color: backgroundNameValue ? backgroundNameValue : 'purple',
        },
        options,
      );
      setModalBackgroundOpen(false);
      fetchAdditionalInfoUserKartuku();
      setLoadingButton(false);
    } catch (e) {
      setLoadingButton(false);
    }
  };

  const updateFontFamily = async (fontNameValue) => {
    try {
      let options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        `${BASE_URL}/api/user/change_font`,
        {user_id: user.id, font: fontNameValue},
        options,
      );
      fetchAdditionalInfoUserKartuku();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAdditionalInfoUserKartuku();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      fetchAdditionalInfoUserKartuku();
    });
  };

  const handleWhatsApp = () => {
    if (phone !== null && phone !== '') {
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
      onPress: () => navigation.navigate('ProfileKartuku'),
    },
    {
      image: BusinessIcon,
      title: 'Business',
      onPress: () => navigation.navigate('BusinessKartuku'),
    },
    {
      image: KomunitasIcon,
      title: 'Komunitas',
      onPress: () => navigation.navigate('KomunitasKartuku'),
    },
    {
      image: PortfolioIcon,
      title: 'Karir',
      onPress: () => navigation.navigate('PortofolioKartuku'),
    },
    // {
    //   image: ResumeIcon,
    //   title: 'Resume',
    //   onPress: () => navigation.navigate('ResumeKartuku'),
    // },
    {
      image: ShareMeIcon,
      title: 'Share Me!',
      onPress: () => navigation.navigate('ShareMeKartuku'),
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
            ...styles.whiteBackgroundColor,
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

  const RenderBackgroundSelectComponent = () => {
    const RenderBackgroundSelect = () => {
      return listBackground.map((backgroundItem) => {
        let backgroundColor;

        if (backgroundItem.value === 'purple') {
          backgroundColor = '#504589';
        }

        if (backgroundItem.value === 'orange') {
          backgroundColor = '#CE7F42';
        }

        if (backgroundItem.value === 'blue') {
          backgroundColor = '#33A1FD';
        }

        if (backgroundItem.value === 'green') {
          backgroundColor = '#42CE9C';
        }

        if (backgroundItem.value === 'red') {
          backgroundColor = '#CD4142';
        }

        if (backgroundItem.value === backgroundColorName) {
          return (
            <View
              key={backgroundItem.value}
              style={{
                ...styles.marginRight5,
                ...styles.marginBottom2,
                ...styles.width70px,
                ...styles.height70px,
                ...styles.borderRadius50perc,
                ...styles.flexDirectionColumn,
                ...styles.justifyContentCenter,
                backgroundColor,
              }}>
              <View style={{...styles.alignSelfCenter}}>
                <WhiteCheck />
              </View>
            </View>
          );
        }

        return (
          <TouchableOpacity
            style={{
              ...styles.marginRight5,
              ...styles.marginBottom2,
              ...styles.width70px,
              ...styles.height70px,
              ...styles.borderRadius50perc,
              backgroundColor,
            }}
            onPress={() => updateBackground(backgroundItem.value)}
            key={backgroundItem.value}
          />
        );
      });
    };

    return (
      <View style={{...styles.paddingHorizontal7}}>
        <Text style={{...styles.subHeaderText2, ...styles.marginBottom15px}}>
          Pilih Warna
        </Text>
        <ScrollView horizontal={true}>
          <View
            style={{
              ...styles.flex1DirectionRow,
              ...styles.justifyContentCenter,
              marginLeft: -70,
            }}>
            <RenderBackgroundSelect />
          </View>
        </ScrollView>
      </View>
    );
  };

  const RenderFontSelectComponent = () => {
    const RenderFontSelect = () => {
      return listFont.map((fontItem) => {
        if (fontItem.value === fontName) {
          return (
            <View
              key={fontItem.value}
              style={{
                ...styles.flex1DirectionRow,
                ...styles.justifyContentSpaceBetween,
                ...styles.marginVertical15,
              }}>
              <Text style={{...styles.subHeaderText2}}>{fontItem.label}</Text>
              <PurpleCheck />
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={fontItem.value}
            style={{...styles.marginVertical15}}
            onPress={() => updateFontFamily(fontItem.value)}>
            <Text style={{...styles.subHeaderRegulerText2}}>
              {fontItem.label}
            </Text>
          </TouchableOpacity>
        );
      });
    };
    return (
      <ScrollView
        style={{
          ...styles.flex1DirectionColumn,
          ...styles.paddingHorizontal7,
        }}>
        <RenderFontSelect />
      </ScrollView>
    );
  };

  if (loading) {
    return <View />;
  }

  return (
    <>
      <ScrollView
        scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
                    uri: user.photo
                      ? `${BASE_URL}/public/storage/${user.photo}`
                      : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&color=000000&background=F1F1F1&bold=true&size=128`,
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
                    {user.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.fontSize4,
                      ...styles.marginBottom15px,
                      ...styles[
                        fontKartuku.normal ? fontKartuku.normal : 'fontNormal'
                      ],
                    }}>
                    {user.pekerjaan}
                  </Text>
                  {/* <View style={styles.flexDirectionRow}>
                  <View style={styles.kartukuIconLocationContainer}>
                    <IconLocation />
                  </View>
                  <Text style={styles.fontRegularSize14px}>Jakarta</Text>
                </View> */}
                </View>
              </View>
            </View>
            {/* End Section Main White Box */}
            <SafeAreaView
              style={{
                ...styles.positionRelative,
                ...styles.whiteBackgroundColor,
              }}>
              {/* Section Main Purple Box */}
              {/* <PurpleBackground /> */}

              <SafeAreaView>
                <Image
                  source={backgroundKartuku}
                  style={styles.kartukuBackgroundStyle}
                />
                <View style={styles.kartukuPurpleMenuBoxContainer}>
                  <RenderKartukuMenu />
                </View>
              </SafeAreaView>

              <SafeAreaView style={styles.kartukuSelectBoxContainer}>
                <View
                  style={{
                    ...styles.flex1,
                    ...styles[
                      backgroundColorName === 'purple'
                        ? 'kartukuSelectBoxDefaultBackground'
                        : 'kartukuSelectBoxNonDefaultBackground'
                    ],
                  }}>
                  <KRBSheet
                    activeOpacity={1}
                    title="Pilih Font"
                    buttonStyle={{...styles.kartukuSelectButton}}
                    textStyle={{
                      ...styles.whiteColor,
                      ...styles.fontSize3_5,
                      ...styles[
                        fontKartuku.normal ? fontKartuku.normal : 'fontNormal'
                      ],
                      ...styles.marginRight2,
                    }}
                    iconButtonRight={<ChevronDown />}
                    ChildernComponent={<RenderFontSelectComponent />}
                  />
                </View>
                <View>
                  <Text style={styles.opacity0}>-</Text>
                </View>
                <View
                  style={{
                    ...styles.flex1,
                    ...styles[
                      backgroundColorName === 'purple'
                        ? 'kartukuSelectBoxDefaultBackground'
                        : 'kartukuSelectBoxNonDefaultBackground'
                    ],
                  }}>
                  <KRBSheet
                    activeOpacity={1}
                    title="Pilih Warna"
                    buttonStyle={styles.kartukuSelectButton}
                    textStyle={{
                      ...styles.whiteColor,
                      ...styles.fontSize3_5,
                      ...styles[
                        fontKartuku.normal ? fontKartuku.normal : 'fontNormal'
                      ],
                      ...styles.marginRight2,
                    }}
                    iconButtonRight={<ChevronDown />}
                    ChildernComponent={<RenderBackgroundSelectComponent />}
                  />
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

kartukuScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuScreen;
