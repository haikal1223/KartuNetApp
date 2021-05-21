import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';
import {KImageMenu, KCardComponent} from 'src/components';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// Style
import styles from 'src/assets/style/main/index';

// icon
import KartukuIcon from 'src/assets/image/svg/icon/home/kartukuPurpleIcon.svg';
import TokokuIcon from 'src/assets/image/svg/icon/home/tokokuPurpleIcon.svg';
import KomunitasIcon from 'src/assets/image/svg/icon/home/komunitasPurpleIcon.svg';
import TopUpIcon from 'src/assets/image/svg/icon/home/topupPurpleIcon.svg';
import PromoIcon from 'src/assets/image/svg/icon/home/promoPurpleIcon.svg';
import MarketplaceIcon from 'src/assets/image/svg/icon/home/marketplacePurpleIcon.svg';

// disabled icon
import TokokuDisabledIcon from 'src/assets/image/svg/icon/home/tokokuDisabledIcon.svg';
import TopUpDisabledIcon from 'src/assets/image/svg/icon/home/topupPurpleIconDisabled.svg';
import MarketplaceDisabledIcon from 'src/assets/image/svg/icon/home/marketplaceDisabledIcon.svg';

const homeScreen = ({route, navigation}) => {
  const {height, width} = Dimensions.get('window');
  const isFocused = useIsFocused();
  const [activeIndex, setActiveIndex] = useState(0);
  const [listArticle, setListArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articlePage, setArticlePage] = useState(1);
  const [totalArticle, setTotalArticle] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingCarousel, setLoadingCarousel] = useState(false);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: '',
      image: null,
      link: null,
      start_date: null,
      end_date: null,
      status: 0,
    },
  ]);

  const listMainMenu = [
    {
      image: KartukuIcon,
      title: 'Kartuku',
      onPress: () => navigation.navigate('Kartuku'),
      disabled: false,
    },

    {
      image: KomunitasIcon,
      title: 'Komunitasku',
      onPress: () => navigation.navigate('KomunitasKartuku'),
      disabled: false,
    },
    {
      image: PromoIcon,
      title: 'Promo',
      onPress: () => {
        navigation.navigate('Promo');
      },
      disabled: false,
    },
    // {
    //   image: TopUpIcon,
    //   title: 'TopUpKu',
    //   onPress: () => {
    //     {
    //       navigation.navigate('TopUpKu');
    //     }
    //   },
    //   disabled: true,
    // },
    {
      image: TopUpDisabledIcon,
      title: 'TopUpKu',
      // onPress: () => {
      //   {
      //     navigation.navigate('TopUpKu');
      //   }
      // },
      disabled: true,
    },
    {
      image: TokokuDisabledIcon,
      title: 'Tokoku',
      onPress: () => {},
      disabled: false,
    },
    {
      image: MarketplaceDisabledIcon,
      title: 'Marketplace',
      onPress: () => {},
      disabled: true,
    },
  ];

  const fetchArticle = async () => {
    try {
      const resultArticles = await axios.get(
        `${BASE_URL}/api/article?page=${articlePage}&limit=3`,
      );

      const {data: listArticles, total_data} = resultArticles.data.data;
      setTotalArticle(total_data);
      setListArticle(listArticles);
      setLoading(false);
    } catch {
      setLoading(false);
      setListArticle([]);
    }
  };

  const fetchArticleDebounce = async () => {
    try {
      setLoadingPage(true);

      const resultArticles = await axios.get(
        `${BASE_URL}/api/article?page=${articlePage}&limit=3`,
      );

      const {data: listArticles} = resultArticles.data.data;
      if (listArticles.length !== 0) {
        let arrayArticle = listArticle;
        arrayArticle = [...arrayArticle, ...listArticles];
        setListArticle(arrayArticle);
      }
      setLoadingPage(false);
    } catch {
      setLoadingPage(false);
    }
  };

  const fetchSlideShow = async () => {
    try {
      setLoadingCarousel(true);
      const {data: listDataSlideshow} = await axios.get(
        `${BASE_URL}/api/slideshow`,
      );

      if (listDataSlideshow.data.length !== 0) {
        const listSlideshow = listDataSlideshow.data.map((slideshowItem) => {
          const {
            title,
            image,
            link,
            start_date,
            end_date,
            status,
          } = slideshowItem;
          return {
            title,
            image: `${BASE_URL}/public/storage/slideshow/${image}`,
            link: link ? () => Linking.openURL(link) : () => {},
            start_date,
            end_date,
            status,
          };
        });

        setCarouselItems(listSlideshow);
      } else {
        setCarouselItems([
          {
            title: '',
            image: null,
            link: null,
            start_date: null,
            end_date: null,
            status: 0,
          },
        ]);
      }

      setLoadingCarousel(false);
    } catch (e) {
      console.log(e);
      setLoadingCarousel(false);
      setCarouselItems([
        {
          title: '',
          image: null,
          link: null,
          start_date: null,
          end_date: null,
          status: 0,
        },
      ]);
    }
  };

  useEffect(() => {
    setLoading(true);
    setArticlePage(1);
    setListArticle([]);
    setTotalArticle(null);
  }, [isFocused]);

  useEffect(() => {
    fetchArticle();
    fetchSlideShow();
  }, [route.params, isFocused]);

  useEffect(() => {
    if (articlePage !== 1) {
      fetchArticleDebounce();
    }
  }, [articlePage]);

  // eslint-disable-next-line react/prop-types
  const RenderListArticle = ({dataArticles}) => {
    // eslint-disable-next-line react/prop-types
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#504589" />
        </View>
      );
    }

    // eslint-disable-next-line react/prop-types
    if (dataArticles.length !== 0) {
      // eslint-disable-next-line react/prop-types
      return dataArticles.map((itemArticle, index) => {
        return (
          <KCardComponent
            key={index}
            containerCardStyle={styles.containerDefaultCardComponent}
            imageCardStyle={styles.imageDefaultCardStyle}
            imageCardSource={`${BASE_URL}/public/storage/article/${itemArticle.image}`}
            titleCardText={`${itemArticle.title}`}
            onPress={() =>
              navigation.navigate('DetailArticle', {
                articleSlug: itemArticle.slug,
              })
            }
          />
        );
      });
    }

    return <View />;
  };

  // eslint-disable-next-line react/prop-types
  const renderCarouselItemsStyle = ({item}) => {
    // eslint-disable-next-line react/prop-types
    const {title, image, link, start_date, end_date, status} = item;
    return (
      <TouchableOpacity onPress={link}>
        <View style={image ? null : styles.carouselItemStyle}>
          {image ? (
            <Image
              style={{
                ...styles.height150px,
                borderRadius: 10,
              }}
              source={{
                uri: image,
              }}
            />
          ) : (
            <Text style={{...styles.fontSizeSm005, ...styles.alignSelfCenter}}>
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const RenderListMenu = () => {
    return listMainMenu.map((menuItem) => {
      return (
        <KImageMenu
          key={menuItem.title}
          containerMenuStyle={{
            ...styles.containerMenuStyle,
            ...styles.marginHorizontalMenu_5,
          }}
          onPress={menuItem.onPress}
          containerViewStyle={{
            ...styles.containerMenuViewStyle,
            ...styles.justifyContentCenter,
            ...styles.alignItemsCenter,
          }}
          SVGComponent={menuItem.image}
          isImageSvg={true}
          textStyle={{...styles.textMenuStyle}}
          titleMenu={menuItem.title}
          activeOpacity={menuItem.disabled ? 1 : 0}
        />
      );
    });
  };

  // const RenderListSubMenu = () => {
  //   return listSubMenu.map((menuItem) => {
  //     return (
  //       <KImageMenu
  //         key={menuItem.title}
  //         containerMenuStyle={{
  //           ...styles.containerMenuStyle,
  //           ...styles.marginHorizontalMenu_5px,
  //         }}
  //         onPress={menuItem.onPress}
  //         containerViewStyle={styles.containerMenuViewStyle}
  //         imageStyle={styles.imageMenuStyle}
  //         imageSource={menuItem.image}
  //         textStyle={styles.textMenuStyle}
  //         titleMenu={menuItem.title}
  //       />
  //     );
  //   });
  // };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (
              listArticle.length !== 0 &&
              listArticle.length !== totalArticle
            ) {
              setLoadingPage(true);
              setArticlePage(articlePage + 1);
            }
          }
        }}>
        <SafeAreaView style={styles.homeSlider}>
          <Carousel
            layout={'default'}
            // ref={ref => this.carousel = ref}
            // contentContainerCustomStyle={{flex: 1}}
            loop
            inactiveSlideScale={0}
            slideStyle={{
              ...styles.containerCarouselStyle,
            }}
            data={carouselItems}
            sliderWidth={width * 1}
            itemWidth={width * 0.85}
            renderItem={renderCarouselItemsStyle}
            onSnapToItem={(index) => setActiveIndex(index)}
          />

          {/* return ( */}
          {/* <Pagination
            dotsLength={carouselItems.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.homePaginationStyle}
            dotStyle={{
              ...styles.homePaginationDotsStyle,
            }}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
          /> */}
          {/* ); */}
        </SafeAreaView>

        <SafeAreaView style={styles.homeContainer}>
          {/* Section Icon */}
          <View style={styles.sectionMenuMargin}>
            <RenderListMenu />
          </View>
          <View style={styles.marginBottom7}>
            <RenderListArticle dataArticles={listArticle} />

            {loadingPage && (
              <View>
                <ActivityIndicator size="large" color="#504589" />
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

homeScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default homeScreen;
