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
// import ContactsWrapper from 'react-native-contacts-wrapper';

// Style
import styles from 'src/assets/style/main/index';
import TelkomselIcon from 'src/assets/image/svg/provider/telkomsel.svg';
import ICContact from 'src/assets/image/svg/ic_contact.svg';
import {KInput} from 'src/components/';
import {TInputPulsa} from 'src/components';

const topUpPulsa = ({navigation}) => {
  const [contactList, setContactList] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [provider, setProvider] = useState(null);

  const telkomselPhoneNumberCode = [
    '0811',
    '0812',
    '0813',
    '0821',
    '0822',
    '0852',
    '0853',
    '0823',
    '0851',
  ];

  const indosatPhoneNumberCode = [
    '0814',
    '0815',
    '0816',
    '0855',
    '0856',
    '0857',
    '0858',
  ];

  const xlPhoneNumberCode = ['0817', '0818', '0819', '0859', '0877', '0878'];

  const axisPhoneNumberCode = ['0838', '0831', '0832', '0833'];

  const threePhoneNumberCode = ['0895', '0896', '0897', '0898', '0899'];

  const smartfrenPhoneNumberCode = [
    '0881',
    '0882',
    '0883',
    '0884',
    '0885',
    '0886',
    '0887',
    '0888',
    '0889',
  ];

  const user = useSelector((state) => state.auth.user);
  const {phone} = user;

  const formatPhoneNumberAndChangeProvider = (phoneNumber) => {
    const formattedPhoneNumber =
      phoneNumber[0] === '6' ? phoneNumber.replace('62', '0') : phoneNumber;
    let providerPhoneNumber = '';
    const telkomselFindIndex = telkomselPhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    const indosatFindIndex = indosatPhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    const xlFindIndex = xlPhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    const axisFindIndex = axisPhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    const threeFindIndex = threePhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    const smartfrenFindIndex = smartfrenPhoneNumberCode.findIndex(
      (codeNumber) => codeNumber === formattedPhoneNumber.substr(0, 4),
    );

    if (telkomselFindIndex !== -1) {
      providerPhoneNumber = 'Telkomsel';
    }

    if (indosatFindIndex !== -1) {
      providerPhoneNumber = 'Indosat';
    }

    if (xlFindIndex !== -1) {
      providerPhoneNumber = 'XL';
    }

    if (axisFindIndex !== -1) {
      providerPhoneNumber = 'Axis';
    }
    if (threeFindIndex !== -1) {
      providerPhoneNumber = 'Three';
    }
    if (smartfrenFindIndex !== -1) {
      providerPhoneNumber = 'Smartfren';
    }

    setPhoneNumber(formattedPhoneNumber);
    setProvider(providerPhoneNumber);
  };

  const setDefaultPhoneNumber = async () => {
    try {
      formatPhoneNumberAndChangeProvider(
        phone[0] === '6' ? phone.replace('62', '0') : phone,
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
      price: '15.356',
    },
    {
      label: '20K',
      price: '20.700',
    },
    {
      label: '25K',
      price: '26.008',
    },
    {
      label: '30K',
      price: '30.663',
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
            formatPhoneNumberAndChangeProvider(phoneNumber);
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
          formatPhoneNumberAndChangeProvider(phoneNumber);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const RenderListMenu = () => {
    return listMenu.map((item) => {
      return (
        <TouchableOpacity style={styles.pulsaMenuBoxContainer} key={item.label}>
          <Text style={styles.pulsaMenuText}>{item.label}</Text>
          <Text style={styles.pulsaPriceText}>Rp{item.price}</Text>
        </TouchableOpacity>
      );
    });
  };

  const getContact = () => {
    Contacts.checkPermission((error, res) => {
      if (res === 'authorized') {
        Contacts.getAll((err, contact) => {
          {
            console.log(contact);
          }
          setContactList(contact);
        });
      }
    });
  };

  return (
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
        onSubmitEditing={(event) =>
          formatPhoneNumberAndChangeProvider(
            event.nativeEvent.text[0] === '6'
              ? event.nativeEvent.text.replace('62', '0')
              : event.nativeEvent.text,
          )
        }
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
      {console.log(`Contact List: ${getContact}`)}
    </ScrollView>
  );
};

export default topUpPulsa;
