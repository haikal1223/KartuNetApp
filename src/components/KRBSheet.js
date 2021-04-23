import React, {useRef} from 'react';
import {View, Button} from 'react-native';
import {KButton} from './index';
import PropTypes from 'prop-types';
import RBSheet from 'react-native-raw-bottom-sheet';

import {whiteColor, purpleMainColor} from 'src/assets/style/main/colorList';
import {Text} from 'react-native-svg';

// Component RBSheet

const KRBSheet = ({
  ButtonComponent = null,
  ChildernComponent = null,

  onPress,
  title,
  buttonStyle,
  textStyle,
  iconButton = null,
  iconButtonRight = null,
  activeOpacity = 0,
  isLoading = false,
  loadingSize = 'small',
  loadingColor = purpleMainColor,
}) => {
  if (loadingColor === 'white') {
    loadingColor = whiteColor;
  }
  const refRBSheet = useRef();
  return (
    <View
      style={
        {
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // backgroundColor: '#000',
        }
      }>
      <KButton
        onPress={() => refRBSheet.current.open()}
        title={title}
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        iconButton={iconButton}
        iconButtonRight={iconButtonRight}
        activeOpacity={activeOpacity}
        isLoading={isLoading}
        loadingColor={loadingColor}
        loadingSize={loadingSize}
      />
      {ButtonComponent && (
        <ButtonComponent onPress={() => refRBSheet.current.open()} />
      )}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {ChildernComponent && ChildernComponent}
      </RBSheet>
    </View>
  );
};

KRBSheet.propTypes = {
  ButtonComponent: PropTypes.element,
  ChildernComponent: PropTypes.element,

  onPress: PropTypes.func,
  title: PropTypes.string,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  iconButton: PropTypes.element,
  iconButtonRight: PropTypes.element,
  activeOpacity: PropTypes.number,
  isLoading: PropTypes.bool,
  loadingSize: PropTypes.string,
  loadingColor: PropTypes.object,
};

export default KRBSheet;
