import React from 'react';
import {TouchableOpacity, View, TextInput} from 'react-native';

// Styles
import styles from 'src/assets/style/main/index';
import ICContact from 'src/assets/image/svg/ic_contact.svg';

// eslint-disable-next-line react/prop-types
const TInputPulsa = ({onPress, providerIcon = null}) => {
  return (
    <View style={styles.TInputContainer}>
      <TextInput style={styles.TInputPulsaTextInput} />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.flexDirectionRow}>
          <View style={styles.TInputProviderIcon}>
            {providerIcon && providerIcon}
          </View>
          <ICContact style={styles.TInputIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TInputPulsa;
