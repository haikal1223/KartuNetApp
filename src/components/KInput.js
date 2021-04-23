import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput} from 'react-native';

/**
 * Component Button
 *
 * Props List = {
 *  containerStyle,
 *  labelTextInput,
 *  buttonStyle,
 *  textStyle,
 *  disabled,
 *  disabledStyles,
 * }
 */

const KInput = ({
  // classFor container both textinput and children component
  containerStyle,

  // label props
  labelTextInput = 'LabelTextInput',
  labelStyle,

  // textInput props
  textInputStyleContainer,
  textInputStyle,

  flexTextInput = 5,

  // Props for Component Text Input
  allowFontScaling = true,
  onKeyPress = () => {},
  placeholder = 'Placeholder',
  secureTextEntry = false,
  onChangeText = () => {},
  onSubmitEditing = () => {},
  value = '',
  keyboardType = 'default',
  autoCapitalize = 'none',

  // If there is a button or icon from right
  childrenComponent = <View />,
  leftComponent = <View />,

  // if input want to look like textarea just adjust multiline and number of line
  // default is multiline = false and number of lines 1

  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={{...containerStyle}}>
      <Text style={{...labelStyle}}>{labelTextInput}</Text>
      <View
        style={{
          ...textInputStyleContainer,
        }}>
        {leftComponent && leftComponent}
        <View style={{flex: flexTextInput}}>
          <TextInput
            allowFontScaling={allowFontScaling}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            style={{
              ...textInputStyle,
            }}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        </View>
        {childrenComponent}
      </View>
    </View>
  );
};

KInput.propTypes = {
  containerStyle: PropTypes.object,
  labelTextInput: PropTypes.string,
  labelStyle: PropTypes.object,
  textInputStyleContainer: PropTypes.object,
  textInputStyle: PropTypes.object,
  flexTextInput: PropTypes.number,

  onKeyPress: PropTypes.func,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  allowFontScaling: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,

  childrenComponent: PropTypes.element,
  leftComponent: PropTypes.element,

  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
};

export default KInput;
