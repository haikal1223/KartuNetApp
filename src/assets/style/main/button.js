import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

/* Styles for button */

export const regularButtonStyle = {
  paddingVertical: height * 0.025,
  borderRadius: 5,
};
