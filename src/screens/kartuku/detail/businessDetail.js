import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

// function
import {capitalizeFirstLetter} from 'src/helpers/function';

const businessDetailScreen = ({route, navigation}) => {
  const [businessDataFromRoute, setBusinessDataFromRoute] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [businessLinks, setBusinessLinks] = useState(null);
  const [businessSocialMedia, setBusinessSocialMedia] = useState([]);
  const [businessOnlineShopAccounts, setBusinessOnlineShopAccounts] = useState(
    [],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const size = 20;
  const color = '#000000';

  const user = useSelector((state) => state.auth.user);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('BusinessKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  const getBusinessDataFromRoute = async () => {
    try {
      setLoading(true);

      const {businessData} = route.params;

      const {
        id,
        name,
        slug,
        posisi,
        deskripsi,
        logo,
        website,
        email,
        phone,
        alamat,
        provinsi_id,
        kota_id,
        kecamatan_id,
        kelurahan_id,
        kode_pos,
        facebook,
        twitter,
        linkedin,
        instagram,
        youtube,
        tokopedia,
        bukalapak,
        shopee,
      } = businessData;

      const {data: listProvince} = await axios.get(
        `${BASE_URL}/api/get_province`,
      );

      const selectedProvince = listProvince.data.find(
        (provinceItem) => provinceItem.id === Number(provinsi_id),
      );

      const {data: listCity} = await axios.get(
        `${BASE_URL}/api/get_kota/${provinsi_id}`,
      );

      const selectedCity = listCity.data.find(
        (cityItem) => cityItem.id === Number(kota_id),
      );

      const {data: listKecamatan} = await axios.get(
        `${BASE_URL}/api/get_kecamatan/${kota_id}`,
      );

      const selectedKecamatan = listKecamatan.data.find(
        (kecamatanItem) => kecamatanItem.id === Number(kecamatan_id),
      );

      const {data: listKelurahan} = await axios.get(
        `${BASE_URL}/api/get_kelurahan/${kecamatan_id}`,
      );

      const selectedKelurahan = listKelurahan.data.find(
        (kelurahanItem) => kelurahanItem.id === Number(kelurahan_id),
      );

      let alamatBusiness = '';

      if (alamat) {
        alamatBusiness = `${alamat} ${
          selectedProvince ? capitalizeFirstLetter(selectedProvince.name) : ''
        }, ${selectedCity ? capitalizeFirstLetter(selectedCity.name) : ''}, ${
          selectedKecamatan ? capitalizeFirstLetter(selectedKecamatan.name) : ''
        }, ${
          selectedKelurahan ? capitalizeFirstLetter(selectedKelurahan.name) : ''
        }, ${kode_pos}`;
      } else {
        alamatBusiness = 'Bisnis ini tidak memiliki informasi alamat.';
      }

      setBusinessData({
        businessId: id,
        businessName: name,
        businessSlug: slug,
        businessPosisi: posisi,
        businessDeskripsi: deskripsi
          ? deskripsi
          : 'Bisnis ini tidak memiliki deskripsi',
        businessLogo: `${BASE_URL}/public/storage/business/${logo}`,
        businessWebsite: website,
        businessEmail: email,
        businessPhone: phone,
        businessAlamat: alamatBusiness,
      });

      // grouping business socmed

      const socialMediaList = [];

      if (facebook) {
        socialMediaList.push({
          icon: <Ionicons name="logo-facebook" size={size} color={color} />,
          name: facebook,
        });
      }

      if (twitter) {
        socialMediaList.push({
          icon: <Ionicons name="logo-twitter" size={size} color={color} />,
          name: twitter,
        });
      }

      if (linkedin) {
        socialMediaList.push({
          icon: <Ionicons name="logo-linkedin" size={size} color={color} />,
          name: linkedin,
        });
      }

      if (instagram) {
        socialMediaList.push({
          icon: <Ionicons name="logo-instagram" size={size} color={color} />,
          name: instagram,
        });
      }

      if (youtube) {
        socialMediaList.push({
          icon: <Ionicons name="logo-youtube" size={size} color={color} />,
          name: youtube,
        });
      }
      setBusinessSocialMedia(socialMediaList);

      const onlineShopAccountList = [];

      if (tokopedia) {
        onlineShopAccountList.push({
          name: 'Tokopedia: ',
          link: tokopedia,
        });
      }

      if (shopee) {
        onlineShopAccountList.push({
          name: 'Shopee: ',
          link: shopee,
        });
      }

      if (bukalapak) {
        onlineShopAccountList.push({
          name: 'Bukalapak: ',
          link: bukalapak,
        });
      }

      setBusinessOnlineShopAccounts(onlineShopAccountList);

      const businessLinkList = [];

      if (website) {
        businessLinkList.push({
          icon: <Ionicons name="globe-outline" size={size} color={color} />,
          link: website,
          onPress: () => Linking.openURL(`${website}`),
        });
      }

      if (email) {
        businessLinkList.push({
          icon: <Ionicons name="mail-outline" size={size} color={color} />,
          link: email,
          onPress: () => Linking.openURL(`mailto:${email}`),
        });
      }

      if (phone) {
        businessLinkList.push({
          icon: <Ionicons name="call-outline" size={size} color={color} />,
          link: phone,
          onPress: () => Linking.openURL(`tel://${phone}`),
        });
      }

      setBusinessLinks(businessLinkList);
      setBusinessDataFromRoute(businessData);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessDataFromRoute();
  }, [route.params]);

  const deteleBusiness = async () => {
    try {
      setLoadingDelete(true);

      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      await axios.post(
        `${BASE_URL}/api/business/delete/${user.id}`,
        {bisnis_id: businessDataFromRoute.id},
        options,
      );

      setRedirect(true);
    } catch (e) {
      console.log(e);
      setLoadingDelete(false);
    }
  };

  const RenderModalDelete = () => {
    if (modalVisible) {
      const closeModal = () => {
        if (!loadingDelete) {
          setModalVisible(!modalVisible);
        }
      };

      const RenderModalContent = () => {
        if (loadingDelete) {
          return <Text style={styles.subHeaderText2}>Loading...</Text>;
        }

        return (
          <>
            <Text style={styles.subHeaderText2}>
              Apakah anda ingin menghapus bisnis ini?
            </Text>
            <KButton
              title="Hapus Bisnis"
              buttonStyle={{
                ...styles.marginTop30,
                ...styles.blackButton,
                ...styles.redMaroonBackgroundColor,
                ...styles.alignItemsCenter,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              onPress={() => deteleBusiness()}
              disabled={loadingDelete}
            />
            <KButton
              title="Cancel"
              buttonStyle={{
                ...styles.marginTop30,
                ...styles.blackButton,
                ...styles.alignItemsCenter,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              onPress={() => closeModal()}
            />
          </>
        );
      };
      return (
        <Overlay isVisible={modalVisible} onBackdropPress={() => closeModal()}>
          <View style={styles.padding8px}>
            <RenderModalContent />
          </View>
        </Overlay>
      );
    }

    return <View />;
  };

  const RenderBusinessContent = () => {
    if (businessData) {
      const {
        businessName,
        businessPosisi,
        businessDeskripsi,
        businessLogo,

        businessAlamat,
      } = businessData;
      return (
        <View>
          {/* BusinessName, Logo, Posisi */}
          <View
            style={{
              ...styles.flex1DirectionRow,
              ...styles.marginBottom3,
            }}>
            <Image
              style={{
                ...styles.kartukuMainProfilePicStyle,
                ...styles.borderRadius0,
              }}
              source={{
                uri: businessLogo
                  ? `${businessLogo}`
                  : `https://ui-avatars.com/api/?name=Logo+Business&color=000000&background=F1F1F1&bold=true&size=128`,
              }}
            />
            <View
              style={{
                ...styles.paddingVertical5px,
                ...styles.marginLeft5,
                ...styles.flexShrink1,
              }}>
              <Text style={{...styles.headerText, ...styles.marginBottom1}}>
                {businessName}
              </Text>

              <Text style={{...styles.subHeaderRegulerText}}>
                {businessPosisi}
              </Text>
            </View>
          </View>
          {/* Deskripsi dan alamat */}
          <View
            style={{
              ...styles.flexDirectionColumn,
              ...styles.flexShrink1,
            }}>
            <Text style={{...styles.subHeaderText2, ...styles.marginBottom1}}>
              Tentang Bisnis
            </Text>

            <Text
              style={{
                ...styles.subHeaderRegulerText2,
                ...styles.marginBottom15px,
              }}>
              {businessDeskripsi}
            </Text>

            <Text style={{...styles.subHeaderText2, ...styles.marginBottom1}}>
              Alamat
            </Text>

            <Text
              style={{
                ...styles.subHeaderRegulerText2,
                ...styles.marginBottom15px,
              }}>
              {businessAlamat}
            </Text>

            <Text style={{...styles.subHeaderText2, ...styles.marginBottom2}}>
              Links
            </Text>

            {businessLinks.length !== 0
              ? businessLinks.map((businessLinkItem) => {
                  if (businessLinkItem.link) {
                    return (
                      <TouchableOpacity
                        key={businessLinkItem.link}
                        onPress={businessLinkItem.onPress}>
                        <View
                          style={{
                            ...styles.flex1DirectionRow,
                            ...styles.marginBottom2,
                          }}>
                          {businessLinkItem.icon}
                          <Text
                            style={{
                              ...styles.subHeaderRegulerText2,
                              ...styles.marginLeft2,
                            }}>
                            {businessLinkItem.link}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  return null;
                })
              : null}

            <Text style={{...styles.subHeaderText2, ...styles.marginBottom2}}>
              Social Media Links
            </Text>

            {businessSocialMedia.length !== 0
              ? businessSocialMedia.map((socialMediaItem) => {
                  if (socialMediaItem.name) {
                    return (
                      <TouchableOpacity
                        key={socialMediaItem.name}
                        onPress={() =>
                          Linking.openURL(`${socialMediaItem.name}`)
                        }>
                        <View
                          style={{
                            ...styles.flex1DirectionRow,
                            ...styles.marginBottom2,
                          }}>
                          {socialMediaItem.icon}
                          <Text
                            style={{
                              ...styles.subHeaderRegulerText2,
                              ...styles.marginLeft2,
                            }}>
                            {socialMediaItem.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  return null;
                })
              : null}

            <Text style={{...styles.subHeaderText2, ...styles.marginBottom2}}>
              Online Shop Links
            </Text>

            {businessOnlineShopAccounts.length !== 0
              ? businessOnlineShopAccounts.map((onlineShopAccountItem) => {
                  if (onlineShopAccountItem.link) {
                    return (
                      <View
                        key={onlineShopAccountItem.link}
                        style={{
                          ...styles.flex1DirectionRow,
                          ...styles.marginBottom2,
                        }}>
                        <Text
                          style={{
                            ...styles.subHeaderRegulerText2,
                          }}>
                          {onlineShopAccountItem.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(`${onlineShopAccountItem.link}`)
                          }>
                          <Text
                            style={{
                              ...styles.subHeaderRegulerText2,
                              ...styles.marginLeft2,
                            }}>
                            {onlineShopAccountItem.link}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                  return null;
                })
              : null}
          </View>
        </View>
      );
    }

    return <View />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#504589" />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <RenderModalDelete />
        {/* Container Start */}
        <View style={styles.kartukuMainContainer}>
          <RenderBusinessContent />
        </View>
      </ScrollView>
      <View style={{...styles.flex1DirectionRow, ...styles.alignItemsFlexEnd}}>
        <KButton
          title="Edit"
          buttonStyle={{
            ...styles.kartukuBottomButtonStyle,
            ...styles.lightGrayColor2Button,
            ...styles.borderRadiusWidth0,
          }}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() =>
            navigation.navigate('editBusiness', {
              businessData: businessDataFromRoute,
            })
          }
        />
        <KButton
          title="Hapus"
          buttonStyle={{
            ...styles.kartukuBottomButtonStyle,
            ...styles.whiteButtonWithBorder,
            ...styles.borderRadiusWidth0,
          }}
          textStyle={{
            ...styles.blackColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </>
  );
};

businessDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default businessDetailScreen;
