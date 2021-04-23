import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View, Image} from 'react-native';

// Style
import styles from 'src/assets/style/main/index';

/**
 * Component KCardComponent - Card with touchable feature
 *
 * Props List = {
 *  onPress: props yang digunakan apabila button di click menjalankan function apa
 *  titleCardText: title card
 *  descriptionCardText: deskripsi card
 *  containerCardStyle: style container card
 *  imageCardStyle: styles untuk image pada card
 *  imageCardSource: source image yang ingin ditampilkan,
 *  isReverse: to reverse the content
 * }
 */

const KCardComponent = ({
  titleCardText,
  descriptionCardText,
  containerCardStyle,
  isImageCenter = false,
  imageCardStyle,
  imageCardSource,
  onPress,
  isReverse = false,
  activeOpacity = 0,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={containerCardStyle}
      onPress={onPress}>
      <View
        style={
          isReverse ? styles.flex1DirectionRowReverse : styles.flex1DirectionRow
        }>
        <View style={isImageCenter ? styles.alignSelfCenter : null}>
          <Image
            style={imageCardStyle}
            source={{
              uri: `${imageCardSource}`,
            }}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={{...styles.subHeaderText}}>{titleCardText}</Text>
          <Text
            style={{
              ...styles.subHeaderRegulerText3,
              ...styles.marginTop15,
            }}>
            {descriptionCardText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

KCardComponent.propTypes = {
  onPress: PropTypes.func,
  titleCardText: PropTypes.string,
  descriptionCardText: PropTypes.string,
  containerCardStyle: PropTypes.object,
  imageCardStyle: PropTypes.object,
  imageCardSource: PropTypes.string,
  isReverse: PropTypes.bool,
  isImageCenter: PropTypes.bool,
  activeOpacity: PropTypes.number,
};

export default KCardComponent;
