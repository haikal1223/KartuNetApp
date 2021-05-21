import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';
import PropTypes from 'prop-types';

const TSwipable = ({isPanelActive, closePanel}) => {
  const [panelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: false,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
  });

  return (
    <View>
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <View>
          <Text>Hello</Text>
        </View>
      </SwipeablePanel>
    </View>
  );
};

TSwipable.propTypes = {
  isPanelActive: PropTypes.bool,
  closePanel: PropTypes.func,
};

export default TSwipable;
