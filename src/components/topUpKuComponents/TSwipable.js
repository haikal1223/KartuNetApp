import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import PropTypes from 'prop-types';
import {priceConverter} from 'src/helpers/function';

const TSwipable = ({isPanelActive, closePanel, provider, data, screenName}) => {
  const [panelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: false,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
  });

  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <View>
        <Text>Ringkasan Pembelian</Text>
        <Text>{priceConverter(data.selectedPrice)}</Text>
        <Text>{provider}</Text>
        <Text>Ringkasan Pembayaran</Text>
        <Text>Jumlah</Text>
        <Text>{priceConverter(data.selectedPrice)}</Text>
        <Text>Total</Text>
        <Text>{priceConverter(data.selectedPrice)}</Text>
        <Text>{screenName}</Text>
      </View>
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
