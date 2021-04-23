import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {KButton, KCardComponent} from 'src/components';
import {useIsFocused} from '@react-navigation/native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// Style
import styles from 'src/assets/style/main/index';

const detailKomunitasScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [communityData, setCommunityData] = useState(null);
  const [articleCommunity, setArticleCommunity] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isWaitingJoinedCommunity, setIsWaitingJoinedCommunity] = useState(
    false,
  );
  const [loading, setLoading] = useState(false);
  const [loadingJoined, setLoadingJoined] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [countMember, setCountMember] = useState(0);

  const user = useSelector((state) => state.auth.user);

  const fetchCommunityList = async () => {
    try {
      const {idCommunity} = route.params;

      setLoading(true);
      const {data} = await axios.get(
        `${BASE_URL}/api/community/detail?id=${idCommunity}`,
      );

      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };

      const {data: dataArticle} = await axios.get(
        `${BASE_URL}/api/community/article/${user.id}/${idCommunity}/1/100`,
        options,
      );

      setCommunityData(data.data);
      setArticleCommunity(dataArticle.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      //   setListCommunity([]);
      setLoading(false);
    }
  };

  const countMemberComunity = async () => {
    try {
      setLoadingCount(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {idCommunity} = route.params;
      const {data: communityMemberList} = await axios.get(
        `${BASE_URL}/api/community/anggota?komunitas_id=${idCommunity}`,
        options,
      );
      const count = communityMemberList.data.anggota.length;
      setCountMember(count);
      setLoadingCount(false);
    } catch (e) {
      console.log(e);
      setLoadingCount(false);
      setCountMember(0);
    }
  };

  const checkJoinedCommunity = async () => {
    try {
      setLoadingJoined(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {idCommunity, slugCommunity, nomorAnggota} = route.params;

      // const {data: communityMemberList} = await axios.get(
      //   `${BASE_URL}/api/community/anggota?komunitas_id=${idCommunity}&page=1&limit=1000`,
      //   options,
      // );

      // const findJoinedUser = communityMemberList.data.anggota.find(
      //   (communityMember) => communityMember.slug == user.slug,
      // );

      // // console.log(findJoinedUser);

      // if (findJoinedUser) {
      //   setIsJoined(true);
      // } else {
      //   setIsJoined(false);
      // }

      const {data: listKomunitasKu} = await axios.get(
        `${BASE_URL}/api/community/komunitasku/${user.id}`,
        options,
      );
      const {data_komunitas} = listKomunitasKu.data;

      console.log('data komunitas');
      console.log(data_komunitas);

      let findJoinedUser;

      if (nomorAnggota) {
        findJoinedUser = data_komunitas.find(
          (dataKomunitas) =>
            dataKomunitas.nomor_anggota == nomorAnggota &&
            dataKomunitas.status_verifikasi === 1,
        );
      } else {
        findJoinedUser = data_komunitas.find(
          (dataKomunitas) =>
            dataKomunitas.slug == slugCommunity &&
            dataKomunitas.status_verifikasi === 1,
        );
      }

      if (findJoinedUser) {
        setIsJoined(true);
      } else {
        const waitingJoinedUser = data_komunitas.find(
          (dataKomunitas) =>
            dataKomunitas.slug == slugCommunity &&
            dataKomunitas.status_verifikasi === 0,
        );
        if (waitingJoinedUser) {
          setIsWaitingJoinedCommunity(true);
        }
        setIsJoined(false);
      }

      setLoadingJoined(false);
    } catch (e) {
      console.log(e);
      setLoadingJoined(false);
    }
  };

  useEffect(() => {
    fetchCommunityList();
  }, [route.params, isFocused]);

  useEffect(() => {
    if (communityData) {
      checkJoinedCommunity();
    }
  }, [communityData]);

  useEffect(() => {
    countMemberComunity();
  }, []);

  // eslint-disable-next-line react/prop-types
  const RenderJoinCommunityButton = ({idCommunity, nameCommunity}) => {
    if (loadingJoined) {
      return (
        <View
          style={{
            ...styles.flex1DirectionRow,
            ...styles.justifyContentCenter,
          }}>
          <ActivityIndicator size="large" color="#504589" />
        </View>
      );
    }

    if (isJoined || isWaitingJoinedCommunity) {
      return (
        <View style={styles.containerSectionDetailKomunitasButtons}>
          {isJoined ? (
            <KButton
              title="Telah Bergabung"
              buttonStyle={{
                ...styles.containerSectionDetailKomunitasJoinButton,
                ...styles.purpleMainBackgroundColor,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              activeOpacity={1}
            />
          ) : (
            <KButton
              title="Menunggu Verifikasi"
              buttonStyle={{
                ...styles.containerSectionDetailKomunitasJoinButton,
                ...styles.purpleMainBackgroundColor,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText3,
              }}
              activeOpacity={1}
            />
          )}

          <View
            style={{
              ...styles.containerSectionDetailKomunitasCountMemberButton,
              ...styles.flex1DirectionRow,
            }}>
            <Text style={{...styles.subHeaderText2}}>{countMember} </Text>
            <Text style={{...styles.subHeaderRegulerText2}}>Anggota</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.containerSectionDetailKomunitasButtons}>
        <KButton
          title="Gabung"
          buttonStyle={styles.containerSectionDetailKomunitasJoinButton}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => {}}
        />
        <KButton
          title="Verifikasi"
          buttonStyle={styles.containerSectionDetailKomunitasVerifikasiButton}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() =>
            navigation.navigate('verifikasiKomunitas', {
              idCommunity,
              nameCommunity,
            })
          }
        />
        <View
          style={{
            ...styles.containerSectionDetailKomunitasCountMemberButton,
            ...styles.flex1DirectionRow,
          }}>
          <Text style={{...styles.subHeaderText2}}>{countMember} </Text>
          <Text style={{...styles.subHeaderRegulerText2}}>Anggota</Text>
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/prop-types
  const RenderArticleCommunity = ({logo}) => {
    if (articleCommunity) {
      if (articleCommunity.length !== 0) {
        return articleCommunity.map((articleItem) => {
          let articleImage = logo;
          if (articleItem.image) {
            articleImage = `${BASE_URL}/public/storage/article/${articleItem.image}`;
          }
          return (
            <KCardComponent
              key={articleItem.title}
              imageCardStyle={styles.imageDetailComunnityCardStyle}
              imageCardSource={`${articleImage}`}
              titleCardText={`${articleItem.title}`}
              descriptionCardText={`${articleItem.description}`}
              activeOpacity={1}
            />
          );
        });
      }
      return null;
    }

    return null;
  };

  const RenderDetailKomunitas = () => {
    if (communityData) {
      const {id, logo, name, deskripsi} = communityData;

      // const renderGallery = () => {
      //   if (galleryList.length !== 0) {
      //     return galleryList.map((galleryItem) => {
      //       return (
      //         <KImageMenu
      //           key={galleryItem.name}
      //           containerMenuStyle={{
      //             ...styles.containerGalleryDetailKomunitasStyle,
      //             ...styles.marginHorizontalMenu_5px,
      //           }}
      //           onPress={galleryItem.onPress}
      //           imageStyle={styles.imageGalleryDetailKomunitasStyle}
      //           imageSource={`${galleryItem.image}`}
      //         />
      //       );
      //     });
      //   }

      //   return <View />;
      // };

      return (
        <SafeAreaView style={styles.flex1}>
          <View style={styles.coverBackgroundDetailKomunitas} />
          <View style={styles.defaultCenter}>
            <View
              style={{
                ...styles.containerLogoDetailKomunitasMenuViewStyle,
                ...styles.marginTopMinus,
              }}>
              <Image
                style={styles.logoDetailKomunitasMenuStyle}
                source={{
                  uri: `${BASE_URL}/public/storage/community/${logo}`,
                }}
              />
            </View>
            <Text
              style={{
                ...styles.headerText,
                ...styles.marginTop1,
                ...styles.marginBottom2,
              }}>
              {name}
            </Text>
            {/* <Text
              style={{
                ...styles.subHeaderText,
                ...styles.marginTop1,
              }}>
              Komunitas Digital
            </Text>
            <Text
              style={{
                ...styles.subHeaderText3,
                ...styles.marginTop1,
                ...styles.grayColor,
              }}>
              Jakarta, Indonesia
            </Text> */}
          </View>

          {/* Section Two */}
          <View style={{...styles.paddingHorizontal7}}>
            <View style={{...styles.marginTop15, ...styles.flex1DirectionRow}}>
              {/* <View style={{...styles.containerSectionDetailKomunitasAnggota}}>
                <Text
                  style={{
                    ...styles.subHeaderText3,
                    ...styles.whiteColor,
                  }}>
                  2000
                </Text>
                <Text
                  style={{
                    ...styles.subHeaderRegulerText3,
                    ...styles.whiteColor,
                  }}>
                  Anggota
                </Text>
              </View> */}

              <RenderJoinCommunityButton
                idCommunity={id}
                nameCommunity={name}
              />
            </View>

            {/* Section Tentang Komunitas */}
            <View style={styles.marginTop55}>
              <Text
                style={{
                  ...styles.subHeaderText,
                  ...styles.marginBottom1,
                }}>
                Tentang Komunitas
              </Text>
              <Text
                style={{
                  ...styles.subHeaderRegulerText3,
                }}>
                {deskripsi}
              </Text>
            </View>

            {/* Section Gallery */}
            {/* <View style={styles.marginTop45}>
              <Text
                style={{
                  ...styles.subHeaderText,
                  ...styles.marginBottom1,
                }}>
                Gallery
              </Text>
              <View style={styles.flex1DirectionRow}>{renderGallery()}</View>
            </View> */}

            {/* Section Info Komunitas */}

            {isJoined ? (
              <View style={styles.marginTop55}>
                <Text
                  style={{
                    ...styles.subHeaderText,
                    ...styles.marginBottom1,
                  }}>
                  Info Komunitas
                </Text>

                <View style={{...styles.marginBottom3}}>
                  <RenderArticleCommunity logo={logo} />
                  {/* <KCardComponent
                    imageCardStyle={styles.imageDetailComunnityCardStyle}
                    imageCardSource={`${BASE_URL}/public/storage/community/${logo}`}
                    titleCardText={`Info Komunitas ${name}`}
                    descriptionCardText={`${deskripsi}`}
                    activeOpacity={1}
                  /> */}
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </SafeAreaView>
      );
    }

    return <View />;
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#504589" />
        </View>
      ) : (
        <View style={styles.flex1}>
          <RenderDetailKomunitas />
        </View>
      )}
    </ScrollView>
  );
};

detailKomunitasScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default detailKomunitasScreen;
