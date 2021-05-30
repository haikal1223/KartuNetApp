import React, {useState} from 'react';
import {
  Alert,
  // Text,
  View,
} from 'react-native';
import styles from 'src/assets/style/main';
import {KButton, KInput, TSwipable} from 'src/components';
import PropTypes from 'prop-types';

// Layar ini dipakai untuk cicilan dan tv internet

const topUpOptions = ({route}) => {
  const [customerID, setCustomerID] = useState('');
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [dataPackage, setDataPackage] = useState({});

  const onPressDataItem = (data) => {
    setIsPanelActive(true);
    setDataPackage(data);
  };

  const onCancelDataItem = () => {
    setIsPanelActive(false);
    setDataPackage({});
  };
  console.log(route);
  return (
    <>
      <View style={styles.flex1}>
        <KInput
          containerStyle={styles.marginHorizontalContainer}
          textInputStyleContainer={styles.textInputWithAllBorder}
          placeholder="Enter customer ID"
          labelTextInput={''}
          value={customerID}
          onChangeText={(text) => setCustomerID(text)}
        />
        <View style={{...styles.flex1, ...styles.flexEnd}}>
          <KButton
            // disabled={!selectedOption}
            title="Bayar"
            buttonStyle={styles.greenBottomButton}
            textStyle={{
              ...styles.whiteColor,
              ...styles.subHeaderText2,
            }}
            onPress={() => {
              customerID
                ? onPressDataItem()
                : Alert.alert('Please Fill in your Customer ID');
            }}
          />
        </View>
      </View>
      <TSwipable
        isPanelActive={isPanelActive}
        closePanel={onCancelDataItem}
        data={{dataPackage, customerID}}
        screenName={route.params.type}
      />
    </>
  );
};

topUpOptions.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpOptions;
