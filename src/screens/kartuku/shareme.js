import * as React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {KImageMenu} from 'src/components';
import Share from 'react-native-share';

// connection
import {BASE_URL} from 'src/helpers/api';

// Style
import styles from 'src/assets/style/main/index';

// icon
import PhoneBookIcon from 'src/assets/image/svg/icon/phoneBookIcon.svg';
import QrCodeIcon from 'src/assets/image/svg/icon/qrCodeIcon.svg';
import ShareMeGrayIcon from 'src/assets/image/svg/icon/shareMeGrayIcon.svg';
import DownloadGrayIcon from 'src/assets/image/svg/icon/downloadGrayIcon.svg';

const kartukuShareMeScreen = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);

  const listMenu = [
    {
      image: QrCodeIcon,
      title: 'My QR Code',
      onPress: () => navigation.navigate('qrCodeDetail'),
    },
    {
      image: ShareMeGrayIcon,
      title: 'Lainnya',
      onPress: () => shareToSocialMedia(),
    },
  ];

  const shareToSocialMedia = async () => {
    try {
      const url = `${BASE_URL}/${user.slug}`;
      const title = `Kartu Digital ${user.name}`;
      const message = `Kartu Digital ${user.name}.\n\nUntuk Lihat Kartu Digital user ${user.name} klik link ini ${url}`;
      const icon = 'https://kartunet.id/assets/img/logo.png';

      const options = Platform.select({
        ios: {
          activityItemSources: [
            {
              // For sharing url with custom title.
              placeholderItem: {type: 'url', content: url},
              item: {
                default: {type: 'url', content: url},
              },
              subject: {
                default: title,
              },
              linkMetadata: {originalUrl: url, url, title},
            },
            {
              // For sharing text.
              placeholderItem: {type: 'text', content: message},
              item: {
                default: {type: 'text', content: message},
                message: null, // Specify no text to share via Messages app.
              },
              linkMetadata: {
                // For showing app icon on share preview.
                title: message,
              },
            },
            {
              // For using custom icon instead of default text icon at share preview when sharing with message.
              placeholderItem: {
                type: 'url',
                content: icon,
              },
              item: {
                default: {
                  type: 'text',
                  content: `${message}`,
                },
              },
              linkMetadata: {
                title: message,
                icon: icon,
              },
            },
          ],
        },
        postToTwitter: {
          title,
          subject: title,
          message: `${message}`,
        },
        postToFacebook: {
          title,
          subject: title,
          message: `${message}`,
        },
        default: {
          title,
          subject: title,
          message: `${message}`,
        },
      });
      const resultShare = await Share.open(options);
      console.log(resultShare);
    } catch (e) {
      console.log(e);
    }
  };

  const RenderListMenu = () => {
    return listMenu.map((menuItem) => {
      return (
        <KImageMenu
          key={menuItem.title}
          containerMenuStyle={{
            ...styles.containerMenuStyle,
            ...styles.marginHorizontalMenu_13px,
          }}
          onPress={menuItem.onPress}
          containerViewStyle={{
            ...styles.containerMenuViewStyle,
            ...styles.justifyContentCenter,
            ...styles.alignItemsCenter,
          }}
          SVGComponent={menuItem.image}
          isImageSvg={true}
          textStyle={styles.kartukuShareMeTextMenuStyle}
          titleMenu={menuItem.title}
        />
      );
    });
  };

  return (
    <View style={styles.kartukuShareMeContainer}>
      <View style={styles.flexDirectionRow}>
        <RenderListMenu />
      </View>
      {/* <View style={styles.marginVertical20px}>
        <Text style={styles.subHeaderText2}>Atau</Text>
      </View>
      <View style={styles.marginTop30}>
        <KImageMenu
          key="Download"
          containerMenuStyle={{
            ...styles.containerMenuStyle,
            ...styles.marginHorizontalMenu_13px,
          }}
          onPress={() => {}}
          containerViewStyle={{
            ...styles.containerMenuViewStyle,
            ...styles.justifyContentCenter,
            ...styles.alignItemsCenter,
          }}
          SVGComponent={DownloadGrayIcon}
          isImageSvg={true}
          textStyle={styles.kartukuShareMeTextMenuStyle}
          titleMenu="Download"
        />
      </View> */}
    </View>
  );
};

kartukuShareMeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default kartukuShareMeScreen;
