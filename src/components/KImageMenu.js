import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, Image} from 'react-native';
// style and fonts
import styles from 'src/assets/style/main/index';

const KImageMenu = ({
  containerMenuStyle,
  onPress,
  containerViewStyle,
  imageStyle,
  imageSource,
  textStyle,
  titleMenu,
  SVGComponent,
  isImageSvg = false,
  isFillSVGCostumColor = false,
  fillSVGColor,
  activeOpacity = 0,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...containerMenuStyle,
      }}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      <View
        style={{
          ...containerViewStyle,
        }}>
        {isImageSvg ? (
          isFillSVGCostumColor ? (
            <SVGComponent fill={fillSVGColor} />
          ) : (
            <SVGComponent />
          )
        ) : (
          <Image
            style={{
              ...imageStyle,
            }}
            source={{
              uri: imageSource,
            }}
          />
        )}
      </View>
      <Text style={{...textStyle}}>{titleMenu}</Text>
    </TouchableOpacity>
  );
};

KImageMenu.propTypes = {
  onPress: PropTypes.func,
  titleMenu: PropTypes.string,
  imageSource: PropTypes.string,
  containerMenuStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  textStyle: PropTypes.object,
  containerViewStyle: PropTypes.object,
  SVGComponent: PropTypes.func,
  isImageSvg: PropTypes.bool,
  isFillSVGCostumColor: PropTypes.bool,
  fillSVGColor: PropTypes.string,
  activeOpacity: PropTypes.number,
};

export default KImageMenu;
