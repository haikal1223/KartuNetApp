import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import HTML from 'react-native-render-html';
import Share from 'react-native-share';

// components
import {KButton} from 'src/components';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// Style
import styles from 'src/assets/style/main';

const detailArticleScreen = ({route}) => {
  const [detailArticle, setDetailArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [articleSlug, setArticleSlug] = useState('');

  const fetchDetailArticle = async () => {
    try {
      const {articleSlug: slug} = route.params;

      setLoading(true);
      const {data} = await axios.get(`${BASE_URL}/api/article/${slug}`);

      setDetailArticle(data.data);
      setLoading(false);
      setArticleSlug(slug);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailArticle();
  }, []);

  const shareToSocialMedia = async () => {
    try {
      const {
        title: titleShare,
        short_description: shortDescription,
      } = detailArticle;
      const url = `${BASE_URL}/article/${articleSlug}`;
      const title = titleShare;
      const message = `Judul Artikel: ${titleShare}.\nDeskripsi singkat: ${
        shortDescription
          ? shortDescription
          : 'Artikel ini tidak memiliki deskripsi singkat'
      }\nUntuk lebih lanjut cek artikelnya di\n`;
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
                  content: `${message} ${url}`,
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
          message: `${message} ${url}`,
        },
        postToFacebook: {
          title,
          subject: title,
          message: `${message} ${url}`,
        },
        default: {
          title,
          subject: title,
          message: `${message} ${url}`,
        },
      });
      const resultShare = await Share.open(options);
      console.log(resultShare);
    } catch (e) {
      console.log(e);
    }
  };

  const RenderDetailArticle = () => {
    if (detailArticle) {
      const {title, keyword, image, description} = detailArticle;
      return (
        <ScrollView>
          <View style={styles.kartukuMainContainer}>
            <Text style={{...styles.subHeaderText, ...styles.marginBottom2}}>
              {title}
            </Text>
            <Image
              style={styles.articleMainImageStyle}
              source={{
                uri: image,
              }}
            />
            <View>
              <HTML
                baseFontStyle={styles.subHeaderRegulerText2}
                source={{html: description}}
                contentWidth={290}
              />
              <Text style={styles.subHeaderRegulerText2}>
                Keyword Artikel: {keyword}
              </Text>
            </View>

            <View style={styles.marginTop55}>
              <KButton
                title="Share Artikel Ini"
                buttonStyle={styles.containerArticleStyleButton}
                textStyle={{
                  ...styles.purpleMainColor,
                  ...styles.subHeaderText2,
                }}
                onPress={() => shareToSocialMedia()}
              />
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <View style={styles.kartukuMainContainer}>
          <Text style={styles.subHeaderText}>
            Artikel ini tidak memiliki detail.
          </Text>
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#504589" />
      </View>
    );
  }

  return <RenderDetailArticle />;
};

detailArticleScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default detailArticleScreen;
