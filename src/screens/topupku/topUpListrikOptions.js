import React, {useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {KButton, KInput, TSwipable} from 'src/components';
import styles from 'src/assets/style/main';
import {priceConverter} from 'src/helpers/function';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {grayColor2, greenColor} from 'src/assets/style/main/colorList';
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
      <View style={styles.flex1}>
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
          contentContainerStyle={styles.contentContainerStyle}
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
                  ...styles.square,
                  backgroundColor:
                    selectedOption === item ? greenColor : grayColor2,
                }}>
                <Text style={styles.textStyle}>Rp.{priceConverter(item)}</Text>
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

topUpListrikOptions.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default topUpListrikOptions;
