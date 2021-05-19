import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import ContactsWrapper from 'react-native-s-contact';
import PropTypes from 'prop-types';
// import ContactsWrapper from 'react-native-contacts-wrapper';

// Style
import styles from 'src/assets/style/main/index';
import TelkomselIcon from 'src/assets/image/svg/provider/telkomsel.svg';
import ICContact from 'src/assets/image/svg/ic_contact.svg';
import {KInput, TSwipable} from 'src/components/';
import {TInputPulsa} from 'src/components';
import {
  formatPhoneNumberAndChangeProvider,
  // openContactPhone,
  priceConverter,
} from 'src/helpers/function';
// import {
//   telkomselPhoneNumberCode,
//   smartfrenPhoneNumberCode,
//   indosatPhoneNumberCode,
//   xlPhoneNumberCode,
//   axisPhoneNumberCode,
//   threePhoneNumberCode,
// } from 'src/helpers/function';

const topUpPulsa = ({navigation, route}) => {
  console.log(navigation);
  console.log(route.name);
  const [contactList, setContactList] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const {phone} = user;

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

  useEffect(() => {}, []);

  const listMenu = [
    {
      label: '15K',
      price: 15356,
    },
    {
      label: '20K',
      price: 20700,
    },
    {
      label: '25K',
      price: 26.008,
    },
    {
      label: '30K',
      price: 30663,
    },
  ];

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

  const onPressPriceItem = (price) => {
    setIsPanelActive(true);
    setSelectedPrice(price);
  };

  const onCancelPriceItem = () => {
    setIsPanelActive(false);
    setSelectedPrice(0);
  };

  const RenderListMenu = () => {
    return listMenu.map((item) => {
      return (
        <TouchableOpacity
          style={styles.pulsaMenuBoxContainer}
          key={item.label}
          onPress={() => onPressPriceItem(item.price)}>
          <Text style={styles.pulsaMenuText}>{item.label}</Text>
          <Text style={styles.pulsaPriceText}>
            Rp{priceConverter(item.price)}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // const getContact = () => {
  //   Contacts.checkPermission((error, res) => {
  //     if (res === 'authorized') {
  //       Contacts.getAll((err, contact) => {
  //         {
  //           console.log(contact);
  //         }
  //         setContactList(contact);
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <ScrollView style={styles.topUpKuSubContainer}>
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
          onSubmitEditing={(event) => {
            setPhoneNumber(
              formatPhoneNumberAndChangeProvider(
                event.nativeEvent.text[0] === '6'
                  ? event.nativeEvent.text.replace('62', '0')
                  : event.nativeEvent.text,
              ).formattedPhoneNumber,
            );
            setProvider(
              formatPhoneNumberAndChangeProvider(
                event.nativeEvent.text[0] === '6'
                  ? event.nativeEvent.text.replace('62', '0')
                  : event.nativeEvent.text,
              ).providerPhoneNumber,
            );
          }}
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

        <View style={styles.pulsaButtonContainer}>
          <RenderListMenu />
        </View>
        {/* {console.log(`Contact List: ${getContact}`)} */}
      </ScrollView>
      <TSwipable
        isPanelActive={isPanelActive}
        closePanel={onCancelPriceItem}
        provider={provider}
        data={{selectedPrice}}
        screenName={route.name}
      />
    </>
  );
};

topUpPulsa.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpPulsa;
