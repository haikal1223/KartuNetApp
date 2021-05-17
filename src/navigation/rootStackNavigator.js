import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Stack navigator
import {
  HomeStackNavigator,
  // ProfileStackNavigator,
  TransaksiStackNavigator,
  NotifikasiStackNavigator,
  KomunitasStackNavigator,
  DashboardStackNavigator,
  // CameraStackNavigator,
} from './stackNavigator/index.js';

// Drawer navigator content
import DrawerContent from './drawerNavigator/drawerContent';

// Component
import {KTabBar, KHeaderButton} from 'src/components';

import styles from 'src/assets/style/main';

import BackArrow from 'src/assets/image/svg/back-arrow.svg';
import BackArrowWhite from 'src/assets/image/svg/back-arrow-white-new.svg';
// import AddBox from 'src/assets/image/svg/add_box.svg';

/**
 * Screen yang mau dihide tab bar
 */

import welcomeScreen from 'src/screens/welcome';
import loginScreen from 'src/screens/login';
import registerScreen from 'src/screens/register';
import forgotPasswordScreen from 'src/screens/login/forgotPassword';

/**
 * Screen yang mau dihide bottom tab navigator
 */

import kartukuProfileScreen from 'src/screens/kartuku/profile';
import kartukuBusinessScreen from 'src/screens/kartuku/business';
import kartukuKomunitasScreen from 'src/screens/kartuku/komunitas';
import kartukuPortfolioScreen from 'src/screens/kartuku/portfolio';
import kartukuResumeScreen from 'src/screens/kartuku/resume';

import kartukuUserProfileScreen from 'src/screens/kartukuUserView/profile';
import kartukuUserBusinessScreen from 'src/screens/kartukuUserView/business';
import kartukuUserKomunitasScreen from 'src/screens/kartukuUserView/komunitas';
import kartukuUserPortfolioScreen from 'src/screens/kartukuUserView/portfolio';
import kartukuUserShareMeScreen from 'src/screens/kartukuUserView/shareme';
import kartukuUserQrCodeScreen from 'src/screens/kartukuUserView/detail/qrCodeUserViewDetail';
import kartukuUserBusinessDetailScreen from 'src/screens/kartukuUserView/detail/businessUserViewDetail';

import editProfileScreen from 'src/screens/kartuku/edit/editProfile';
import editPasswordScreen from 'src/screens/kartuku/edit/editPassword';
import editPortfolioScreen from 'src/screens/kartuku/edit/editPortfolio';
import editResumeScreen from 'src/screens/kartuku/edit/editResume';
import editBusinessScreen from 'src/screens/kartuku/edit/editBusiness';

import addPortfolioScreen from 'src/screens/kartuku/add/addPortfolio';
import addResumeScreen from 'src/screens/kartuku/add/addResume';
import addBusinessScreen from 'src/screens/kartuku/add/addBusiness';

import portfolioDetailScreen from 'src/screens/kartuku/detail/portfolioDetail';
import resumeDetailScreen from 'src/screens/kartuku/detail/resumeDetail';
import businessDetailScreen from 'src/screens/kartuku/detail/businessDetail';
import verifikasiKomunitasScreen from 'src/screens/komunitas/verifikasiKomunitas.js';
import qrCodeDetailScreen from 'src/screens/kartuku/detail/qrCodeDetail.js';

import cameraScreen from 'src/screens/camera';
import kartuUserViewDetailScreen from 'src/screens/kartuku/detail/kartuUserViewDetail.js';

/**
 * Untuk membuat tab navigator dari ke empat main screen
 */

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const WelcomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: headerShownRoute(route),
      })}>
      <Stack.Screen name="Welcome" component={welcomeScreen} />
      <Stack.Screen
        name="Login"
        component={loginScreen}
        options={{
          headerStyle: {
            ...styles.headerHeight,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'LOGIN',
          headerTransparent: true,
          headerTintColor: '#000000',
          headerTitleStyle: {
            ...styles.headerWhiteStyle,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={forgotPasswordScreen}
        options={{
          headerStyle: {
            ...styles.headerHeight,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'Forgot Password',
          headerTransparent: true,
          headerTintColor: '#000000',
          headerTitleStyle: {
            ...styles.headerWhiteStyle,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />
      <Stack.Screen
        name="Register"
        component={registerScreen}
        options={{
          headerStyle: {
            ...styles.headerHeight,
            ...styles.headerNoShadow,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'REGISTER',
          headerTransparent: false,
          headerTintColor: '#000000',
          headerTitleStyle: {
            ...styles.headerWhiteStyle,
          },

          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrow />,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    console.log(routeName);
    const topUpKuScreen = [
      'TopUpKu',
      'Pulsa',
      'PaketData',
      'Listrik',
      'BPJS',
      'Indihome',
      'Cicilan',
      'AirPam',
    ];
    if (topUpKuScreen.includes(routeName)) {
      return false;
    }

    return true;
  };
  return (
    <Tab.Navigator tabBar={(props) => <KTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen name="Transaksi" component={TransaksiStackNavigator} />
      {/* <Tab.Screen
        options={{
          tabBarLabel: '',
          // eslint-disable-next-line react/display-name
          tabBarIcon: () => {
            return <AddBox />;
          },
          tabStyle: {
            padding: 30,
          },
        }}
        name="ScanBarcode"
        component={CameraStackNavigator}
      /> */}
      <Tab.Screen name="Komunitas" component={KomunitasStackNavigator} />
      <Tab.Screen name="Notifikasi" component={NotifikasiStackNavigator} />
      <Tab.Screen name="Dashboard" component={DashboardStackNavigator} />
    </Tab.Navigator>
  );
};

// untuk menghandle halaman kartuku yang bottomtabnavigatornya menjadi button atau tidak ada bottomtabnavigator
// Logicnya
// Semua screen yang ada bottomtab gabung dengan stack.screen name home
// apabila ada sendiri screen yang berbeda, maka bisa buat list lalu dilooping dan harus pisah dengan stack.screen home
// eslint-disable-next-line react/prop-types
const AllNavigator = ({navigation}) => {
  const screenUserViewKartukuNavigation = [
    {
      name: 'ProfileUserViewKartuku',
      title: 'PROFILE',
      component: kartukuUserProfileScreen,
    },
    {
      name: 'BusinessUserViewKartuku',
      title: 'BUSINESS',
      component: kartukuUserBusinessScreen,
    },
    {
      name: 'KomunitasUserViewKartuku',
      title: 'KOMUNITAS',
      component: kartukuUserKomunitasScreen,
    },
    {
      name: 'PortofolioUserViewKartuku',
      title: 'Karir',
      component: kartukuUserPortfolioScreen,
    },
    {
      name: 'ShareMeUserViewKartuku',
      title: 'Share User!',
      component: kartukuUserShareMeScreen,
    },
  ];
  const screensWithoutBottomTabNavigatorAndCustomBackNavigation = [
    {
      name: 'ProfileKartuku',
      title: 'PROFILE',
      component: kartukuProfileScreen,
    },
    {
      name: 'BusinessKartuku',
      title: 'BUSINESS',
      component: kartukuBusinessScreen,
    },
    {
      name: 'KomunitasKartuku',
      title: 'KOMUNITASKU',
      component: kartukuKomunitasScreen,
    },
    {
      name: 'PortofolioKartuku',
      title: 'KARIR',
      component: kartukuPortfolioScreen,
    },
    {
      name: 'ResumeKartuku',
      title: 'RESUME',
      component: kartukuResumeScreen,
    },
  ];

  const screenWithoutCustomBackNavigation = [
    // Edit Profile
    {
      name: 'EditProfile',
      title: 'EDIT PROFILE',
      component: editProfileScreen,
    },

    {
      name: 'editPassword',
      title: 'Ganti Password',
      component: editPasswordScreen,
    },

    // Form Add or Update Business
    {
      name: 'addBusiness',
      title: 'Tambah Bisnis',
      component: addBusinessScreen,
    },

    {
      name: 'detailBusiness',
      title: 'Detail Bisnis',
      component: businessDetailScreen,
    },

    {
      name: 'editBusiness',
      title: 'Edit Bisnis',
      component: editBusinessScreen,
    },
    // kartuku portfolio screens

    // Form Add Portofolio

    {
      name: 'addPortfolio',
      title: 'Tambah Karir',
      component: addPortfolioScreen,
    },

    {
      name: 'detailPortfolio',
      title: 'Detail Karir',
      component: portfolioDetailScreen,
    },
    {
      name: 'editPortfolio',
      title: 'Edit Karir',
      component: editPortfolioScreen,
    },

    // kartuku resume screens

    {
      name: 'detailResume',
      title: 'Detail Resume',
      component: resumeDetailScreen,
    },

    {
      name: 'addResume',
      title: 'Tambah Resume',
      component: addResumeScreen,
    },
    {
      name: 'editResume',
      title: 'Edit Resume',
      component: editResumeScreen,
    },

    {
      name: 'qrCodeDetail',
      title: 'My QR Code',
      component: qrCodeDetailScreen,
    },

    {
      name: 'qrCodeUserViewDetail',
      title: 'QR Code User',
      component: kartukuUserQrCodeScreen,
    },

    {
      name: 'qrCodeUserView',
      title: 'View Kartuku',
      component: kartuUserViewDetailScreen,
    },

    {
      name: 'kartukuUserBusinessDetail',
      title: 'Detail Bisnis User',
      component: kartukuUserBusinessDetailScreen,
    },

    {
      name: 'verifikasiKomunitas',
      title: 'Verifikasi Komunitas',
      component: verifikasiKomunitasScreen,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: headerShownRoute(route),
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
      })}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      {screenUserViewKartukuNavigation.map((screenItem) => {
        return (
          <Stack.Screen
            key={screenItem.name}
            name={`${screenItem.name}`}
            component={screenItem.component}
            options={{
              headerStyle: {
                ...styles.headerPurple,
              },
              headerTitleAlign: 'center',
              headerLeftContainerStyle: {
                ...styles.headerLeftStyle,
              },
              title: screenItem.title,
              headerTitleStyle: {
                ...styles.headerCenterStyle,
                ...styles.whiteColor,
              },
              // eslint-disable-next-line react/display-name
              headerLeft: () => (
                <KHeaderButton
                  // eslint-disable-next-line react/prop-types
                  onPress={() => navigation.navigate('kartukuUserView')}
                  icon={<BackArrowWhite />}
                />
              ),
            }}
          />
        );
      })}
      {screensWithoutBottomTabNavigatorAndCustomBackNavigation.map(
        (screenItem) => {
          return (
            <Stack.Screen
              key={screenItem.name}
              name={`${screenItem.name}`}
              component={screenItem.component}
              options={{
                headerStyle: {
                  ...styles.headerPurple,
                },
                headerTitleAlign: 'center',
                headerLeftContainerStyle: {
                  ...styles.headerLeftStyle,
                },
                title: screenItem.title,
                headerTitleStyle: {
                  ...styles.headerCenterStyle,
                  ...styles.whiteColor,
                },
                // eslint-disable-next-line react/display-name
                headerLeft: () => (
                  <KHeaderButton
                    // eslint-disable-next-line react/prop-types
                    onPress={() => navigation.navigate('Kartuku')}
                    icon={<BackArrowWhite />}
                  />
                ),
              }}
            />
          );
        },
      )}
      {screenWithoutCustomBackNavigation.map((screenItemWithoutBack) => {
        return (
          <Stack.Screen
            key={screenItemWithoutBack.name}
            name={`${screenItemWithoutBack.name}`}
            component={screenItemWithoutBack.component}
            options={{
              headerStyle: {
                ...styles.headerPurple,
              },
              headerTitleAlign: 'center',
              headerLeftContainerStyle: {
                ...styles.headerLeftStyle,
              },
              title: screenItemWithoutBack.title,
              headerTitleStyle: {
                ...styles.headerCenterStyle,
                ...styles.whiteColor,
              },

              // eslint-disable-next-line react/display-name
              headerBackImage: () => <BackArrowWhite />,
            }}
          />
        );
      })}
      <Stack.Screen
        name="ScanBarcode"
        component={cameraScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },

          title: 'SCAN QR CODE',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />
    </Stack.Navigator>
  );
};

// function to check header shown
const headerShownRoute = (route) => {
  if (route.name === 'Welcome' || route.name === 'Home') {
    return false;
  }
  return true;
};

/* 
Untuk mencegah bug, atau freeze screen. 
 Perlu membuat dua drawer screen. 
 Yang pertama Drawer.Screen untuk Welcome Page yang isinya:
 Welcome Page, Login, Register yang mana semua page tersebut dibungkus
 dalam Stack Navigator 
 
 Yang kedua adalah home yang isinya seluruh page aplikasi 
 */

const RootStackNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      // initialRouteName="Welcome"
      // backBehavior="history"
      // drawerPosition="right"
      // drawerContent={(props) => <DrawerContent {...props} />}
    >
      {/* <Drawer.Screen
        options={{swipeEnabled: false}}
        name="Welcome"
        component={WelcomeStackNavigator}
      /> */}
      <Drawer.Screen
        options={{swipeEnabled: false}}
        name="Home"
        component={AllNavigator}
      />
    </Drawer.Navigator>
  );
};

export default RootStackNavigator;
