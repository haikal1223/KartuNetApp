import React, {useState, useEffect} from 'react';
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

const kartukuResumeScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [selectedIdResume, setSelectedIdResume] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data} = await axios.get(
        `${BASE_URL}/api/resume/${user.id}`,
        options,
      );

      setResumeData(data.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setResumeData([]);
      console.log(err);
    }
  };

  // const redirectAfterUpdate = () => {
  //   const pushAction = StackActions.popToTop();
  //   setTimeout(() => {
  //     navigation.navigate('ResumeKartuku');
  //   }, 3000);
  // };

  useEffect(() => {
    fetchResumeData();
  }, [route.params, isFocused]);

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        setModalDeleteOpen(false);
        fetchResumeData();
      }, 3000);
    }
  }, [redirect]);

  const deteleResume = async (idResume) => {
    try {
      setLoadingDelete(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      await axios.post(
        `${BASE_URL}/api/resume/destroy/${user.id}`,
        {resume_id: idResume},
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
          setModalVisible(!modalDeleteOpen);
        }
      };

      const RenderModalContent = () => {
        if (loadingDelete) {
          return <Text style={styles.subHeaderText2}>Loading...</Text>;
        }

        return (
          <>
            <Text style={styles.subHeaderText2}>
              Apakah anda ingin menghapus resume ini?
            </Text>
            <KButton
              title="Hapus Resume"
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
              onPress={() => deteleResume(selectedIdResume)}
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
            <Text style={styles.subHeaderText2}>Resume berhasil dihapus.</Text>
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
                navigation.navigate('editResume', {
                  idResume: selectedIdResume,
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

  const RenderResumeData = () => {
    if (resumeData.length !== 0) {
      return resumeData.map((resumeItem, indexData) => {
        return (
          <KCardNonTouchable
            key={resumeItem.nama}
            containerCardStyle={
              indexData !== resumeData.length - 1
                ? {
                    ...styles.kartukuCardContainer,
                    ...styles.borderLightGray1px,
                  }
                : {
                    ...styles.kartukuCardContainer,
                  }
            }
            showLeftMenu={true}
            leftMenuOnPress={() => {
              setSelectedIdResume(resumeItem.id);
              setModalVisible(!modalVisible);
            }}
            hasImage={false}
            cardTitle={resumeItem.nama}
            descriptionTextStyle={{
              ...styles.subHeaderRegulerText2,
              ...styles.marginTop15,
            }}
            descriptionText={resumeItem.deskripsi}
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
            <RenderResumeData />
          </View>
        )}
      </ScrollView>

      {loading ? null : (
        <View>
          <KButton
            title="Tambah Resume"
            buttonStyle={styles.kartukuBottomButtonStyle}
            textStyle={{
              ...styles.blackColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => navigation.navigate('addResume')}
          />
        </View>
      )}
    </>
  );
};

kartukuResumeScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuResumeScreen;
