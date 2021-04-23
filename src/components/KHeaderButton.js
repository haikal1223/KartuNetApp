import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';

const KHeaderButton = ({icon, onPress}) => {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};

KHeaderButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.element,
};

export default KHeaderButton;
