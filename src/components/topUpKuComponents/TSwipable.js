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
import {useSelector} from 'react-redux';
import TelkomselIcon from 'src/assets/image/svg/provider/telkomsel.svg';

const TSwipable = ({isPanelActive, closePanel, provider, data, screenName}) => {
  const custName = useSelector((state) => state.auth.name);

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
                <Text style={styles.fontMonserratBold}>
                  Ringkasan Pembelian
                </Text>
              </View>
              <View>
                <View style={styles.flexDirectionRow}>
                  {provider === 'Telkomsel' ? (
                    <View style={{...styles.marginRight2}}>
                      <TelkomselIcon />
                    </View>
                  ) : (
                    <View style={{...styles.marginRight2}}>
                      <Text style={styles.fontMonserratRegular}>
                        {provider}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.fontMonserratBold}>
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
                <Text style={styles.fontMonserratBold}>
                  Ringkasan Pembayaran
                </Text>
              </View>
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.fontMonserratRegular}>Jumlah</Text>
                  <Text style={styles.fontMonserratRegular}>
                    Rp{priceConverter(data.selectedPrice)}
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.fontMonserratBold}>Total</Text>
                  <Text style={styles.fontMonserratBold}>
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
                <Text style={styles.fontMonserratBold}>
                  Ringkasan Pembelian
                </Text>
              </View>
              <View
                style={{...styles.descContainer, ...styles.flexDirectionRow}}>
                <View style>
                  {provider === 'Telkomsel' ? (
                    <View style={styles.marginRight5}>
                      <TelkomselIcon />
                    </View>
                  ) : (
                    <Text style={styles.providerText}>{provider}</Text>
                  )}
                </View>
                <View style={{...styles.width80perc}}>
                  <Text style={styles.fontMonserratBold}>{data.name}</Text>
                  <Text
                    style={{
                      ...styles.marginBottom1,
                      ...styles.marginTop1,
                      ...styles.fontMonserratRegular,
                    }}>
                    {data.desc}
                  </Text>
                  <Text style={styles.fontMonserratRegular}>
                    Active for {data.activeFor} days
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
                <Text style={styles.fontMonserratBold}>
                  Ringkasan Pembayaran
                </Text>
              </View>
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.fontMonserratRegular}>Jumlah</Text>
                  <Text style={styles.fontMonserratRegular}>
                    Rp{priceConverter(data.price)}
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={styles.secondaryHeaderContainer}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.fontMonserratBold}>Total</Text>
                  <Text style={styles.fontMonserratBold}>
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
    ListrikOptions: () => {
      return (
        <React.Fragment>
          <View style={styles.mainContainer}>
            <View style={styles.marginHorizontal}>
              <View style={styles.mainHeaderContainer}>
                <Text style={{...styles.textBold, ...styles.fontMonserratBold}}>
                  Ringkasan Pembelian
                </Text>
              </View>
              <View>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.fontMonserratRegular}>No Meter</Text>
                  <Text style={styles.fontMonserratRegular}>
                    {data.customerID}
                  </Text>
                </View>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.fontMonserratRegular}>Nama</Text>
                  <Text style={styles.fontMonserratRegular}>{custName}</Text>
                </View>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.fontMonserratRegular}>Tarif/Daya</Text>
                  <Text style={styles.fontMonserratRegular}>R1/2200VA</Text>
                </View>
              </View>
            </View>
            <View style={styles.marginHorizontal}>
              <View style={styles.mainHeaderContainer}>
                <Text style={styles.textBold}>Ringkasan Pembayaran</Text>
              </View>
              <View>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.fontMonserratRegular}>Nominal</Text>
                  <Text style={styles.fontMonserratRegular}>
                    Rp.{priceConverter(data.dataPackage)}
                  </Text>
                </View>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.fontMonserratRegular}>Admin Bank</Text>
                  <Text style={styles.fontMonserratRegular}>Rp.1500</Text>
                </View>
                {/* <Text>Rp{priceConverter(data.selectedPrice)}</Text> */}
              </View>
              <Divider style={styles.itemSpacing} />
              <View style={styles.mainHeaderContainer}>
                <View style={{...styles.spaceBetween, ...styles.itemSpacing}}>
                  <Text style={styles.textBold}>Total Pembayaran</Text>
                  <Text>Rp{priceConverter(data.dataPackage + 1500)}</Text>
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
  screens.ListrikOptions.displayName = 'ListrikOptions';
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
