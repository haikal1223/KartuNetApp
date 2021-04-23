import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';

// Style
import styles from 'src/assets/style/main';

const PendingView = () => (
  <View
    style={{
      ...styles.center,
    }}>
    <Text>Waiting</Text>
  </View>
);

const cameraScreen = ({navigation}) => {
  // const takePicture = async function (camera) {
  //   const options = {quality: 0.5, base64: true};
  //   const data = await camera.takePictureAsync(options);
  //   //  eslint-disable-next-line
  //   console.log(data.uri);
  // };

  const setUserLocalStorage = async (userSlug) => {
    try {
      await AsyncStorage.setItem(
        '@anotherUserSlug',
        JSON.stringify({
          slug: userSlug.split('kartunet.id/')[1],
        }),
      );

      await navigation.navigate('kartukuUserView');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          // console.log(barcodes[0].data);
          // console.log(barcodes[0].dataRaw);
          if (barcodes[0].type === 'QR_CODE') {
            setUserLocalStorage(barcodes[0].data);
          }
        }}>
        {/* recordAudioPermissionStatus */}
        {/* {({camera, status}) } */}
        {({status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                ...styles.flex1DirectionColumn,
                ...styles.justifyContentCenter,
              }}>
              <View
                style={{
                  ...styles.borderAllPurpleMain5px,
                  ...styles.width200px,
                  ...styles.height200px,
                }}
              />
              {/* <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={styles.subHeaderRegulerText2}> SNAP </Text>
              </TouchableOpacity> */}
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

cameraScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default cameraScreen;
