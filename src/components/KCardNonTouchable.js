import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';

// Assets icon and image
import styles from 'src/assets/style/main';
import IconChrome from 'src/assets/image/svg/socmed/ic_logo_chrome.svg';
import IconFacebook from 'src/assets/image/svg/socmed/ic_logo_facebook.svg';
import IconInstagram from 'src/assets/image/svg/socmed/ic_logo_instagram.svg';
import IconLocation from 'src/assets/image/svg/socmed/ic_logo_location.svg';
import IconThreeDots from 'src/assets/image/svg/ic_three_dots.svg';

/**
 * Component KCardNonTouchable - Card with non touchable feature. used to represent data in card style
 *
 * ***** Definition props has been not updated.
 *
 * Props List = {
 *  cardTitle: title card
 *  containerCardStyle: style container card
 *  cardImageStyle: styles untuk image pada card
 *  sourceImage: source image yang ingin ditampilkan
 * }
 */

const KCardNonTouchable = ({
  containerCardStyle = styles.kartukuCardContainer,
  containerCardContentStyle = styles.flex1DirectionRow,
  cardImageStyle = styles.kartukuCardImageStyle,
  sourceImage = null,

  cardTitleStyle = styles.subHeaderText,
  cardTitle = '',

  cardContentContainerStyle = styles.flex1DirectionColumn,

  // Props Social Media
  hasSocialMedia = false,
  hasContentNonSocialMedia = false,

  // imageProps
  hasImage = true,

  // menuLeft props (three dots)
  showLeftMenu = null,
  leftMenuOnPress = null,

  socialMediaContainerStyle = {
    ...styles.flex1DirectionRow,
    ...styles.marginTop15,
  },
  socialMediaIconStyle = {marginRight: 18},
  websiteLink,
  facebookLink,
  instagramLink,
  locationLink,

  // Props non social media ex. komunitas in kartuku page
  textMiddleContentStyle = {
    ...styles.subHeaderText2,
    ...styles.marginVertical3px,
    ...styles.grayColor,
  },
  textMiddleContent = '',

  textBottomContentStyle = {
    ...styles.subHeaderRegulerText2,
  },
  textBottomContent = '',

  descriptionTextStyle = styles.subHeaderRegulerText,
  descriptionText = '',

  // optional
  onPress = null,
}) => {
  const RenderSocialMedia = () => {
    return (
      <View style={socialMediaContainerStyle}>
        {websiteLink && (
          <TouchableOpacity
            style={socialMediaIconStyle}
            onPress={() => Linking.openURL(`https://${websiteLink}`)}>
            <IconChrome />
          </TouchableOpacity>
        )}
        {facebookLink && (
          <TouchableOpacity
            style={socialMediaIconStyle}
            onPress={() => Linking.openURL(`https://${facebookLink}`)}>
            <IconFacebook />
          </TouchableOpacity>
        )}
        {instagramLink && (
          <TouchableOpacity
            style={socialMediaIconStyle}
            onPress={() => Linking.openURL(`https://${instagramLink}`)}>
            <IconInstagram />
          </TouchableOpacity>
        )}
        {locationLink && (
          <TouchableOpacity
            style={socialMediaIconStyle}
            onPress={() => Linking.openURL(`https://${locationLink}`)}>
            <IconLocation />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const RenderNonSocialMedia = () => {
    return (
      <View>
        <Text style={textMiddleContentStyle}>{textMiddleContent}</Text>
        <Text style={textBottomContentStyle}>{textBottomContent}</Text>
      </View>
    );
  };

  const RenderTouchableImage = () => {
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View>
            <Image
              style={cardImageStyle}
              source={{
                uri: sourceImage
                  ? sourceImage
                  : 'https://www.colorcombos.com/images/colors/F1F1F1.png',
              }}
            />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <Image
        style={cardImageStyle}
        source={{
          uri: sourceImage
            ? sourceImage
            : 'https://www.colorcombos.com/images/colors/F1F1F1.png',
        }}
      />
    );
  };

  const RenderTouchableTitle = () => {
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={cardTitleStyle}>{cardTitle}</Text>
        </TouchableOpacity>
      );
    }

    return <Text style={cardTitleStyle}>{cardTitle}</Text>;
  };

  return (
    <View style={containerCardStyle}>
      <View style={containerCardContentStyle}>
        {hasImage ? <RenderTouchableImage /> : null}

        <View style={cardContentContainerStyle}>
          <View
            style={
              showLeftMenu && {
                ...styles.flex1DirectionRow,
                ...styles.justifyContentSpaceBetween,
              }
            }>
            <RenderTouchableTitle />
            {showLeftMenu && (
              <TouchableOpacity onPress={leftMenuOnPress}>
                <View style={styles.padding8px}>
                  <IconThreeDots />
                </View>
              </TouchableOpacity>
            )}
          </View>
          {hasSocialMedia ? <RenderSocialMedia /> : null}
          {hasContentNonSocialMedia ? <RenderNonSocialMedia /> : null}
          <View />
        </View>
      </View>
      {descriptionText.length !== 0 && (
        <View>
          <Text style={descriptionTextStyle}>{descriptionText}</Text>
        </View>
      )}
    </View>
  );
};

KCardNonTouchable.propTypes = {
  onPress: PropTypes.func,

  containerCardStyle: PropTypes.object,
  containerCardContentStyle: PropTypes.object,
  cardImageStyle: PropTypes.object,
  cardTitleStyle: PropTypes.object,
  cardContentContainerStyle: PropTypes.object,
  socialMediaContainerStyle: PropTypes.object,
  socialMediaIconStyle: PropTypes.object,
  textMiddleContentStyle: PropTypes.object,
  textBottomContentStyle: PropTypes.object,
  descriptionTextStyle: PropTypes.object,

  sourceImage: PropTypes.string,
  cardTitle: PropTypes.string,
  websiteLink: PropTypes.string,
  facebookLink: PropTypes.string,
  instagramLink: PropTypes.string,
  locationLink: PropTypes.string,
  textMiddleContent: PropTypes.string,
  textBottomContent: PropTypes.string,
  descriptionText: PropTypes.string,

  hasSocialMedia: PropTypes.bool,
  hasContentNonSocialMedia: PropTypes.bool,
  hasImage: PropTypes.bool,

  showLeftMenu: PropTypes.bool,
  leftMenuOnPress: PropTypes.func,
};

export default KCardNonTouchable;
