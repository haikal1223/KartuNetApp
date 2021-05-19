import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  // ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from 'src/assets/style/main';
import {KInput, TSwipable} from 'src/components';
import ICContact from 'src/assets/image/svg/ic_contact.svg';
import TelkomselIcon from 'src/assets/image/svg/provider/telkomsel.svg';
import {
  formatPhoneNumberAndChangeProvider,
  // openContactPhone,
  priceConverter,
} from 'src/helpers/function';
import {Divider} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import ContactsWrapper from 'react-native-s-contact';

const topUpPaketData = ({route}) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [dataPackage, setDataPackage] = useState({});

  const user = useSelector((state) => state.auth.user);
  const {phone} = user;

  const sampleData = [
    {
      id: 1,
      name: 'Data 12 GB',
      desc: '12GB Main Quota On All Network and All Zones + 2GB VideoMax',
      price: 103410,
      activeFor: 30,
    },
    {
      id: 2,
      name: 'Data 4.5 GB',
      desc: 'Data Singlezone 4.5GB + 2GB Video ',
      price: 103410,
      activeFor: 30,
    },
  ];

  const setDefaultPhoneNumber = async () => {
    try {
      setPhoneNumber(
        formatPhoneNumberAndChangeProvider(
          phone[0] === '6' ? phone.replace('62', '0') : phone,
        ).formattedPhoneNumber,
      );
      setProvider(
        formatPhoneNumberAndChangeProvider(
          phone[0] === '6' ? phone.replace('62', '0') : phone,
        ).providerPhoneNumber,
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setDefaultPhoneNumber();
  }, []);

  const onPressDataItem = (price) => {
    setIsPanelActive(true);
    setDataPackage(price);
  };

  const onCancelDataItem = () => {
    setIsPanelActive(false);
    setDataPackage({});
  };

  const openContactPhone = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        ContactsWrapper.getContact()
          .then((contact) => {
            const {name, phone} = contact;
            let phoneNumber = phone.replace(/\D/g, '');
            phoneNumber =
              phoneNumber[0] === '6'
                ? phoneNumber.replace('62', '0')
                : phoneNumber;
            setPhoneNumber(
              formatPhoneNumberAndChangeProvider(phoneNumber)
                .formattedPhoneNumber,
            );
            setProvider(
              formatPhoneNumberAndChangeProvider(phoneNumber)
                .providerPhoneNumber,
            );
          })
          .catch((e) => {
            console.log(e);
          });
      });
    } else {
      // for ios
      ContactsWrapper.getContact()
        .then((contact) => {
          const {name, phone} = contact;
          let phoneNumber = phone.replace(/\D/g, '');
          phoneNumber =
            phoneNumber[0] === '6'
              ? phoneNumber.replace('62', '0')
              : phoneNumber;
          setPhoneNumber(
            formatPhoneNumberAndChangeProvider(phoneNumber)
              .formattedPhoneNumber,
          );
          setProvider(
            formatPhoneNumberAndChangeProvider(phoneNumber).providerPhoneNumber,
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <View>
        <KInput
          leftComponent={
            <View style={styles.marginRight2}>
              <View style={styles.flexDirectionRow}>
                <TouchableOpacity onPress={() => openContactPhone()}>
                  <ICContact />
                </TouchableOpacity>
              </View>
            </View>
          }
          labelTextInput=""
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.TInputContainerNew}
          textInputStyle={{...styles.textInputStyle, ...styles.lightGrayColor2}}
          placeholder="Masukkan Nomor Telepon"
          flexTextInput={4}
          keyboardType="numeric"
          value={phoneNumber}
          // onSubmitEditing={(event) =>
          //   formatPhoneNumberAndChangeProvider(
          //     event.nativeEvent.text[0] === '6'
          //       ? event.nativeEvent.text.replace('62', '0')
          //       : event.nativeEvent.text,
          //   )
          // }
          onChangeText={(number) => setPhoneNumber(number)}
          childrenComponent={
            <View>
              <View style={styles.flexDirectionRow}>
                <View>
                  {provider === 'Telkomsel' ? (
                    <TelkomselIcon />
                  ) : (
                    <Text>{provider}</Text>
                  )}
                </View>
              </View>
            </View>
          }
        />
        <FlatList
          data={sampleData}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                provider && phoneNumber
                  ? onPressDataItem(item)
                  : Alert.alert('Invalid Number')
              }>
              <View style={styles.itemContainer}>
                <View style={styles.icon} />
                <View>
                  <View>
                    <Text style={styles.packageName}>{item.name}</Text>
                  </View>
                  <View style={styles.descContainer}>
                    <Text>{item.desc}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text>Rp.{priceConverter(item.price)}</Text>
                    <Text> • </Text>
                    <Text>Active for {item.activeFor} days</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TSwipable
        isPanelActive={isPanelActive}
        closePanel={onCancelDataItem}
        provider={provider}
        data={dataPackage}
        screenName={route.name}
      />
    </>
  );
};

topUpPaketData.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpPaketData;
