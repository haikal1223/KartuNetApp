import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {SwipeablePanel} from 'rn-swipeable-panel';
import PropTypes from 'prop-types';
import {priceConverter} from 'src/helpers/function';
import {} from 'src/assets/style/main';
import LinearGradient from 'react-native-linear-gradient';
import {KButton} from '..';
import styles from 'src/assets/style/main';

const TSwipable = ({isPanelActive, closePanel, provider, data, screenName}) => {
  const [panelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: false,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
    onlyLarge: true,
  });
  const screens = {
    Pulsa: () => {
      return (
        <React.Fragment>
          <View style={styles.mainContainer}>
            <View style={styles.marginHorizontal}>
              <View style={styles.mainHeaderContainer}>
                <Text style={styles.textBold}>Ringkasan Pembelian</Text>
              </View>
              <View>
                <View style={styles.descContainer}>
                  <Text style={styles.providerText}>{provider}</Text>
                  <Text style={styles.textBold}>
                    Pulsa {priceConverter(data.selectedPrice)}
                  </Text>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={['#f6f6f6', '#ffffff', '#f6f6f6']}
              style={styles.dividerStyle}
            />
            <View>
              <View style={styles.secondaryHeaderContainer}>
                <Text style={styles.textBold}>Ringkasan Pembayaran</Text>
              </View>
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text>Jumlah</Text>
                  <Text>Rp{priceConverter(data.selectedPrice)}</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.textBold}>Total</Text>
                  <Text style={styles.textBold}>
                    Rp{priceConverter(data.selectedPrice)}
                  </Text>
                </View>
              </View>
              {/* <Text>{screenName}</Text> */}
            </View>
            <View style={styles.purchaseButtonContainer}>
              <KButton
                title="Bayar"
                buttonStyle={styles.greenBottomButton}
                textStyle={{
                  ...styles.whiteColor,
                  ...styles.subHeaderText2,
                }}
              />
            </View>
          </View>
        </React.Fragment>
      );
    },
    PaketData: () => {
      console.log(data);
      return (
        <React.Fragment>
          <View style={styles.mainContainer}>
            <View style={styles.marginHorizontal}>
              <View style={styles.mainHeaderContainer}>
                <Text style={styles.textBold}>Ringkasan Pembelian</Text>
              </View>
              <View style={styles.descContainer}>
                <View>
                  <Text style={styles.providerText}>{provider}</Text>
                </View>
                <View>
                  <Text style={styles.textBold}>{data.name}</Text>
                  <Text style={{...styles.marginBottom1, ...styles.marginTop1}}>
                    {data.desc}
                  </Text>
                  <Text>Active for {data.activeFor} days</Text>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={['#f6f6f6', '#ffffff', '#f6f6f6']}
              style={styles.dividerStyle}
            />
            <View>
              <View style={styles.secondaryHeaderContainer}>
                <Text style={styles.textBold}>Ringkasan Pembayaran</Text>
              </View>
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text>Jumlah</Text>
                  <Text>Rp{priceConverter(data.price)}</Text>
                </View>
              </View>
              <Divider />
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.textBold}>Total</Text>
                  <Text style={styles.textBold}>
                    Rp{priceConverter(data.price)}
                  </Text>
                </View>
              </View>
              {/* <Text>{screenName}</Text> */}
            </View>
            <View style={styles.purchaseButtonContainer}>
              <KButton
                title="Bayar"
                buttonStyle={styles.greenBottomButton}
                textStyle={{
                  ...styles.whiteColor,
                  ...styles.subHeaderText2,
                }}
              />
            </View>
          </View>
        </React.Fragment>
      );
    },
  };
  screens.Pulsa.displayName = 'Pulsa';
  screens.PaketData.displayName = 'PaketData';
  console.log(screenName);
  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      {isPanelActive ? screens[screenName]() : null}
    </SwipeablePanel>
  );
};

TSwipable.propTypes = {
  isPanelActive: PropTypes.bool,
  closePanel: PropTypes.func,
  provider: PropTypes.string,
  data: PropTypes.object,
  screenName: PropTypes.string,
};

export default TSwipable;
