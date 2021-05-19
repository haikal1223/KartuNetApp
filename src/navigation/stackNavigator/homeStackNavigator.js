import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';

import {KHeaderButton} from 'src/components';

// Screen untuk home
import homeScreen from 'src/screens/home';

// screen untuk ppob
// import ppobScreen from 'src/screens/home/ppobScreen';

// screen untuk topupKu
import topUpKuScreen from 'src/screens/topupku';
import topUpPulsa from 'src/screens/topupku/topUpPulsa';
import topUpPaketData from 'src/screens/topupku/topUpPaketData';
import topUpListrik from 'src/screens/topupku/topUpListrik';
import topUpBpjs from 'src/screens/topupku/topUpBpjs';
import topUpIndihome from 'src/screens/topupku/topUpIndihome';
import topUpCicilan from 'src/screens/topupku/topUpCicilan';
import topUpPam from 'src/screens/topupku/topUpPam';

// screen untuk article
import detailArticleScreen from 'src/screens/article/detailArticleScreen';

// Screen untuk komunitasku
import komunitasScreen from 'src/screens/komunitas';
import detailKomunitasScreen from 'src/screens/komunitas/detailKomunitas';

// Screen untuk kartuku
import kartukuScreen from 'src/screens/kartuku';
import kartukuShareMeScreen from 'src/screens/kartuku/shareme';

import kartukuUserViewScreen from 'src/screens/kartukuUserView';

// Screen untuk Promo
import promoScreen from 'src/screens/promo';

// Assets and Style
import styles from 'src/assets/style/main';
import BackArrow from 'src/assets/image/svg/back-arrow.svg';
import BackArrowWhite from 'src/assets/image/svg/back-arrow-white-new.svg';
// import IconMenuBurger from 'src/assets/image/svg/menu_burger.svg';
import IconMenuBurgerBlack from 'src/assets/image/svg/menu_burger_black.svg';
import topUpListrikOptions from 'src/screens/topupku/topUpListrikOptions';

const Stack = createStackNavigator();

const HomeStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{cardStyle: {backgroundColor: '#fff'}}}
      initialRouteName="Welcome">
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerRightContainerStyle: {
            ...styles.headerRightStyle,
          },
          title: 'BERANDA',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <KHeaderButton
              onPress={() => navigation.openDrawer()}
              icon={<IconMenuBurgerBlack />}
            />
          ),
        }}
      />

      {/* TopUpKu Screen */}
      <Stack.Screen
        name="TopUpKu"
        component={topUpKuScreen}
        options={{
          headerStyle: {
            // ...styles.headerMain,
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'TOPUPKU',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />

      <Stack.Screen
        name="Pulsa"
        component={topUpPulsa}
        options={{
          headerStyle: {
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'Pulsa',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />

      <Stack.Screen
        name="PaketData"
        component={topUpPaketData}
        options={{
          headerStyle: {
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'Paket Data',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />

      <Stack.Screen
        name="Listrik"
        component={topUpListrik}
        options={{
          headerStyle: {
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'PLN',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />
      <Stack.Screen
        name="ListrikOptions"
        component={topUpListrikOptions}
        options={{
          headerStyle: {
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'PLN',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />

      <Stack.Screen
        name="BPJS"
        component={topUpBpjs}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'BPJS',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      <Stack.Screen
        name="Indihome"
        component={topUpIndihome}
        options={{
          headerStyle: {
            ...styles.headerMain,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'INTERNET & CABLE TV',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.blackColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />

      <Stack.Screen
        name="Cicilan"
        component={topUpCicilan}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'CICILAN',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      <Stack.Screen
        name="AirPam"
        component={topUpPam}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          headerTitleAlign: 'center',
          title: 'PDAM',
          // headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      {/* Komunitas Screen */}
      <Stack.Screen
        name="KomunitasKu"
        component={komunitasScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'KOMUNITASKU',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />
      <Stack.Screen
        name="DetailKomunitas"
        component={detailKomunitasScreen}
        options={() => ({
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'KOMUNITAS',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        })}
      />

      {/* Article Screen */}
      <Stack.Screen
        name="DetailArticle"
        component={detailArticleScreen}
        options={() => ({
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'DETAIL ARTIKEL',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        })}
      />

      {/* Promo Screen */}
      <Stack.Screen
        name="Promo"
        component={promoScreen}
        options={() => ({
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'PROMO',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        })}
      />

      {/* Kartuku Screens */}
      <Stack.Screen
        name="Kartuku"
        component={kartukuScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'KARTUKU',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      <Stack.Screen
        name="ShareMeKartuku"
        component={kartukuShareMeScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'SHARE ME!',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      <Stack.Screen
        name="kartukuUserView"
        component={kartukuUserViewScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'KARTU USER',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />

      {/* End Kartuku Screens */}
    </Stack.Navigator>
  );
};

HomeStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeStackNavigator;
