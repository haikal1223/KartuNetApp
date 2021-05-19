import {PermissionsAndroid, Platform} from 'react-native';
import ContactsWrapper from 'react-native-s-contact';

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatSelectBox = (data) => {
  return data.map((dataItem) => {
    return {
      label: dataItem.name,
      value: dataItem.id,
    };
  });
};

export const priceConverter = (price) => {
  return price.toLocaleString('de-DE');
};

export const telkomselPhoneNumberCode = [
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

export const indosatPhoneNumberCode = [
  '0814',
  '0815',
  '0816',
  '0855',
  '0856',
  '0857',
  '0858',
];

export const xlPhoneNumberCode = [
  '0817',
  '0818',
  '0819',
  '0859',
  '0877',
  '0878',
];

export const axisPhoneNumberCode = ['0838', '0831', '0832', '0833'];

export const threePhoneNumberCode = ['0895', '0896', '0897', '0898', '0899'];

export const smartfrenPhoneNumberCode = [
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

export const formatPhoneNumberAndChangeProvider = (phoneNumber) => {
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
  return {
    formattedPhoneNumber,
    providerPhoneNumber,
  };
  // setPhoneNumber(formattedPhoneNumber);
  // setProvider(providerPhoneNumber);
};

export const openContactPhone = () => {
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
          phoneNumber[0] === '6' ? phoneNumber.replace('62', '0') : phoneNumber;
        formatPhoneNumberAndChangeProvider(phoneNumber);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
