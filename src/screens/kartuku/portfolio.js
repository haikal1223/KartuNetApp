import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {Overlay} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton, KCardNonTouchable} from 'src/components';

// Assets icon and image
import styles from 'src/assets/style/main';
import GreenCheckIcon from 'src/assets/image/svg/greenCheck.svg';

const kartukuPortfolioScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [listPortfolio, setListPortfolio] = useState([]);
  const [selectedIdPortfolio, setSelectedIdPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const fetchListPortfolio = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data} = await axios.get(
        `${BASE_URL}/api/portfolio/${user.id}`,
        options,
      );

      setListPortfolio(data.data);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setListPortfolio([]);
      setLoading(false);
    }
  };

  // const redirectAfterUpdate = () => {
  //   const pushAction = StackActions.popToTop();
  //   setTimeout(() => {
  //     navigation.navigate('PortofolioKartuku');
  //   }, 3000);
  // };

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        setModalDeleteOpen(false);
        fetchListPortfolio();
      }, 3000);
    }
  }, [redirect]);

  useEffect(() => {
    fetchListPortfolio();
  }, [route.params, isFocused]);

  const deletePortfolio = async (idPortfolio) => {
    try {
      setLoadingDelete(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      await axios.post(
        `${BASE_URL}/api/portfolio/destroy/${user.id}`,
        {portfolio_id: idPortfolio},
        options,
      );
      setSuccessDelete(true);
      setRedirect(true);
    } catch (e) {
      console.log(e);
      setLoadingDelete(false);
    }
  };

  const RenderModalDelete = () => {
    if (modalDeleteOpen) {
      const closeModal = () => {
        if (!loadingDelete || successDelete) {
          setModalDeleteOpen(!modalDeleteOpen);
        }
      };

      const RenderModalContent = () => {
        if (loadingDelete) {
          return <Text style={styles.subHeaderText2}>Loading...</Text>;
        }

        return (
          <>
            <Text style={styles.subHeaderText2}>
              Apakah anda ingin menghapus karir ini?
            </Text>
            <KButton
              title="Hapus Karir"
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
              onPress={() => deletePortfolio(selectedIdPortfolio)}
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

      const RenderDeleteSuccessMessage = () => {
        return (
          <>
            <Text style={styles.subHeaderText2}>Karir berhasil dihapus.</Text>
            <View
              style={{
                ...styles.marginTop15,
                ...styles.alignItemsCenter,
              }}>
              <GreenCheckIcon />
            </View>
          </>
        );
      };

      return (
        <Overlay
          isVisible={modalDeleteOpen}
          onBackdropPress={() => closeModal()}>
          <View style={styles.padding8px}>
            {successDelete ? (
              <RenderDeleteSuccessMessage />
            ) : (
              <RenderModalContent />
            )}
          </View>
        </Overlay>
      );
    }

    return <View />;
  };

  const RenderModalMenu = () => {
    if (modalVisible) {
      const RenderModalContent = () => {
        return (
          <>
            <KButton
              title="Edit"
              buttonStyle={{
                ...styles.purpleMainButton,
                ...styles.alignItemsCenter,
                ...styles.paddingHorizontal7,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('editPortfolio', {
                  idPortfolio: selectedIdPortfolio,
                });
              }}
            />
            <KButton
              title="Hapus"
              buttonStyle={{
                ...styles.lightGrayColor2Button,
                ...styles.alignItemsCenter,
                ...styles.paddingHorizontal7,
              }}
              textStyle={{
                ...styles.whiteColor,
                ...styles.subHeaderText2,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setModalDeleteOpen(!modalDeleteOpen);
              }}
            />
          </>
        );
      };
      return (
        <Overlay
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.padding8px}>
            <RenderModalContent />
          </View>
        </Overlay>
      );
    }

    return <View />;
  };

  const RenderKomunitasData = () => {
    if (listPortfolio.length !== 0) {
      return listPortfolio.map((portofolioItem, indexData) => {
        return (
          <KCardNonTouchable
            key={portofolioItem.id}
            containerCardStyle={
              indexData !== listPortfolio.length - 1
                ? {
                    ...styles.kartukuCardContainer,
                    ...styles.borderLightGray1px,
                  }
                : {
                    ...styles.kartukuCardContainer,
                  }
            }
            cardTitle={portofolioItem.jabatan}
            showLeftMenu={true}
            leftMenuOnPress={() => {
              setSelectedIdPortfolio(portofolioItem.id);
              setModalVisible(!modalVisible);
            }}
            textMiddleContentStyle={{
              ...styles.subHeaderRegulerText2,
              ...styles.blackColor,
            }}
            hasContentNonSocialMedia
            hasImage={false}
            textMiddleContent={portofolioItem.nama}
            textBottomContent={portofolioItem.tahun}
            descriptionTextStyle={{
              ...styles.subHeaderRegulerText2,
              ...styles.marginTop15,
            }}
            descriptionText={portofolioItem.deskripsi}
          />
        );
      });
    }

    return <View />;
  };

  return (
    <>
      <RenderModalMenu />
      <RenderModalDelete />
      <ScrollView>
        {/* Container Start */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#504589" />
          </View>
        ) : (
          <View style={styles.kartukuMainContainer}>
            <RenderKomunitasData />
          </View>
        )}
      </ScrollView>
      {loading ? null : (
        <View>
          <KButton
            title="Tambah Karir"
            buttonStyle={styles.kartukuBottomButtonStyle}
            textStyle={{
              ...styles.blackColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => navigation.navigate('addPortfolio')}
          />
        </View>
      )}
    </>
  );
};

kartukuPortfolioScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuPortfolioScreen;
