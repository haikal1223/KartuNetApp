import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';

// Color
import {whiteColor, purpleMainColor} from 'src/assets/style/main/colorList';
/**
 * Component Button
 *
 * Props List = {
 *  onPress: props yang digunakan apabila button di click menjalankan function apa
 *  title: text dari button
 *  buttonStyle: styles dari button
 *  textStyle: styles dari text
 *  disabled: sebagai kondisi apakah button bisa di klik atau tidak
 *  disabledStyles: apakah ketika disabled stylenya mau berbeda.
 * }
 */

const KButton = ({
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
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={isLoading}
      activeOpacity={activeOpacity}>
      {iconButton && iconButton}
      {isLoading ? (
        <View>
          <ActivityIndicator size={loadingSize} color={loadingColor} />
        </View>
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
      {iconButtonRight && iconButtonRight}
    </TouchableOpacity>
  );
};

KButton.propTypes = {
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

export default KButton;
