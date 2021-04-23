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

const resumeDetailScreen = ({route, navigation}) => {
  const [resumeId, setResumeId] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const fetchResumeData = async () => {
    try {
      const {idResume} = route.params;
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      };
      const {data: resultResumeData} = await axios.get(
        `${BASE_URL}/api/resume/detail/${idResume}`,
        options,
      );

      setResumeData(resultResumeData.data);
      setLoading(false);
      setResumeId(idResume);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setResumeData(null);
    }
  };

  useEffect(() => {
    fetchResumeData();
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
              onPress={() => deteleResume(resumeData.id)}
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

  const RenderResumeDetail = () => {
    if (resumeData) {
      const {nama, deskripsi} = resumeData;
      return (
        <View>
          <Text
            style={{
              ...styles.marginTop15,
              ...styles.subHeaderText2,
            }}>
            {nama}
          </Text>

          <Text
            style={{
              ...styles.subHeaderRegulerText2,
              ...styles.marginTop15,
            }}>
            {deskripsi}
          </Text>

          <KButton
            title="Hapus Resume"
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
          <RenderResumeDetail />
        </View>
      </ScrollView>
      <View>
        <KButton
          title="Edit Resume"
          buttonStyle={styles.kartukuBottomButtonStyle}
          textStyle={{
            ...styles.blackColor,
            ...styles.subHeaderText2,
          }}
          onPress={() =>
            navigation.navigate('editResume', {idResume: resumeId})
          }
        />
      </View>
    </>
  );
};

resumeDetailScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default resumeDetailScreen;
