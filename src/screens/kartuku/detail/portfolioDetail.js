import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {ActivityIndicator, View, Text, ScrollView} from 'react-native';
import {Overlay} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const portfolioDetailScreen = ({route, navigation}) => {
  const [portfolioId, setPortfolioId] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const fetchPortfolioData = async () => {
    try {
      const {idPortfolio} = route.params;
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: resultPortfolioData} = await axios.get(
        `${BASE_URL}/api/portfolio/detail/${idPortfolio}`,
        options,
      );

      setPortfolioData(resultPortfolioData.data);
      setLoading(false);
      setPortfolioId(idPortfolio);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setPortfolioData(null);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [route.params]);

  const redirectAfterUpdate = () => {
    const pushAction = StackActions.popToTop();
    setTimeout(() => {
      navigation.dispatch(pushAction);
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

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
              Apakah anda ingin menghapus portfolio ini?
            </Text>
            <KButton
              title="Hapus Portofolio"
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
              onPress={() => deletePortfolio(portfolioData.id)}
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

  const RenderPortfolioDetail = () => {
    if (portfolioData) {
      const {nama, deskripsi, jabatan, tahun} = portfolioData;
      return (
        <View>
          <Text style={styles.subHeaderText}>{jabatan}</Text>

          <Text
            style={{
              ...styles.marginTop15,
              ...styles.subHeaderText2,
            }}>
            {nama}
          </Text>
          <Text style={styles.subHeaderRegulerText2}>{tahun}</Text>
          <Text
            style={{
              ...styles.subHeaderRegulerText2,
              ...styles.marginTop15,
            }}>
            {deskripsi}
          </Text>

          <KButton
            title="Hapus Portofolio"
            buttonStyle={{
              ...styles.marginTop55,
              ...styles.blackButton,
              ...styles.redMaroonBackgroundColor,
              ...styles.alignItemsCenter,
            }}
            textStyle={{
              ...styles.whiteColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          />
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
          <RenderPortfolioDetail />
        </View>
      </ScrollView>
      <View>
        <KButton
          title="Edit Portofolio"
          buttonStyle={styles.kartukuBottomButtonStyle}
          textStyle={{
            ...styles.blackColor,
            ...styles.subHeaderText2,
          }}
          onPress={() =>
            navigation.navigate('editPortfolio', {idPortfolio: portfolioId})
          }
        />
      </View>
    </>
  );
};

portfolioDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default portfolioDetailScreen;
