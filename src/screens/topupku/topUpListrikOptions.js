import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KButton, KInput, TSwipable} from 'src/components';
import styles from 'src/assets/style/main';
import {priceConverter} from 'src/helpers/function';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MonserratBold} from 'src/assets/style/main/fontFamily';
import {
  grayColor2,
  greenColor,
  whiteColor,
} from 'src/assets/style/main/colorList';
import PropTypes from 'prop-types';

const sampleData = [20000, 50000, 100000, 200000];

const topUpListrikOptions = ({route}) => {
  const [customerID, setCustomerID] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [isPanelActive, setIsPanelActive] = useState(false);
  const [dataPackage, setDataPackage] = useState({});
  // console.log(selectedOption);

  const onPressDataItem = (data) => {
    setIsPanelActive(true);
    setDataPackage(data);
  };

  const onCancelDataItem = () => {
    setIsPanelActive(false);
    setDataPackage({});
  };
  console.log(route.params.name);
  return (
    <>
      <View style={styles.mainContainer}>
        <KInput
          containerStyle={styles.marginHorizontalContainer}
          textInputStyleContainer={styles.textInputWithAllBorder}
          placeholder="Enter customer ID"
          labelTextInput={''}
          value={customerID}
          onChangeText={(text) => setCustomerID(text)}
        />
        <FlatList
          keyExtractor={(item, index) => index}
          data={sampleData}
          numColumns={2}
          contentContainerStyle={gaya.contentContainerStyle}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                selectedOption === item
                  ? setSelectedOption(null)
                  : setSelectedOption(item)
              }
              // disabled={selectedOption}
            >
              <View
                style={{
                  ...gaya.square,
                  backgroundColor:
                    selectedOption === item ? greenColor : grayColor2,
                }}>
                <Text style={gaya.textStyle}>Rp.{priceConverter(item)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View>
          <KButton
            disabled={!selectedOption}
            title="Bayar"
            buttonStyle={
              selectedOption
                ? styles.greenBottomButton
                : styles.lightGrayColor2BottomButton
            }
            textStyle={{
              ...styles.whiteColor,
              ...styles.subHeaderText2,
            }}
            onPress={() =>
              selectedOption && customerID
                ? onPressDataItem(selectedOption)
                : Alert.alert(
                    'Please Fill in your Customer ID and Select a Package',
                  )
            }
          />
        </View>
      </View>
      <TSwipable
        isPanelActive={isPanelActive}
        closePanel={onCancelDataItem}
        data={{dataPackage, customerID}}
        screenName={route.name}
      />
    </>
  );
};

const gaya = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    alignItems: 'center',

    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 10,
    width: Dimensions.get('screen').width / 2 - 10,
  },
  textStyle: {
    color: whiteColor,
    fontFamily: MonserratBold,
  },
});

topUpListrikOptions.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpListrikOptions;
