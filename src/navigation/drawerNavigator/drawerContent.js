import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

// components
import {KHeaderButton} from 'src/components';

// assets
// image
import CloseIcon from 'src/assets/image/svg/ic_close.svg';
import LogOut from 'src/assets/image/svg/ic_logout.svg';
import HelpIcon from 'src/assets/image/svg/icon/drawerNavigation/drawerHelpIcon.svg';
import ProfileIcon from 'src/assets/image/svg/icon/drawerNavigation/drawerProfileIcon.svg';

// fontFamily
import {
  MonserratBold,
  MonserratRegular,
} from 'src/assets/style/main/fontFamily';
import {BASE_URL} from 'src/helpers/api';

// action creator
import {logOut} from 'src/helpers/redux/actions';

// Get Height and Width with Dimensions for responsive
const {height, width} = Dimensions.get('window');

const DrawerContent = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);

  const drawerMenu = [
    {
      name: 'Profile',
      onPress: () => navigation.navigate('ProfileKartuku'),
      image: <ProfileIcon />,
    },
    {
      name: 'Bantuan',
      onPress: () => {},
      image: <HelpIcon />,
    },
  ];
  const dispatch = useDispatch();
  const onPressButtonLogOut = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      await dispatch(logOut());
    } catch (e) {
      console.log(e);
    }

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Welcome'}],
      }),
    );
  };

  const RenderDrawerMenu = () => {
    return drawerMenu.map((drawerItem) => {
      return (
        <TouchableOpacity key={drawerItem.name} onPress={drawerItem.onPress}>
          <View style={styles.drawerMenuContainerStyle}>
            <Text
              style={{
                ...styles.drawerMenuTextStyle,
                ...styles.drawerMarginLeftAuto,
              }}>
              {drawerItem.name}
            </Text>
            {drawerItem.image}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.drawerContainer}>
      <View
        style={{marginBottom: height * 0.05, ...styles.drawerMarginLeftAuto}}>
        <KHeaderButton
          icon={<CloseIcon />}
          onPress={() => navigation.closeDrawer()}
        />
      </View>
      <View
        style={{marginBottom: height * 0.07, ...styles.drawerMarginLeftAuto}}>
        <Image
          style={styles.drawerProfileImageStyle}
          source={{
            uri: user.photo
              ? `${BASE_URL}/public/storage/${user.photo}`
              : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&color=000000&background=F1F1F1&bold=true&size=128`,
          }}
        />
        <Text style={styles.drawerProfileTextStyle}>{user.name}</Text>
      </View>

      <DrawerContentScrollView>
        <RenderDrawerMenu />
      </DrawerContentScrollView>
      <View style={styles.drawerMarginLeftAuto}>
        <TouchableOpacity onPress={onPressButtonLogOut}>
          <View style={styles.drawerFlexDirectionRow}>
            <Text style={styles.drawerLogoutTextStyle}>Keluar</Text>
            <View style={styles.drawerMarginTopLogout}>
              <LogOut />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    marginLeft: 'auto',
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.05,
  },
  drawerFlexDirectionRow: {
    flexDirection: 'row',
  },
  drawerLogoutTextStyle: {
    fontFamily: MonserratBold,
    fontSize: 21,
    marginLeft: 'auto',
    marginRight: 12,
  },
  drawerMarginLeftAuto: {
    marginLeft: 'auto',
  },
  drawerMarginTopLogout: {
    marginTop: 2.5,
  },
  drawerMenuContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: height * 0.05,
  },

  drawerMenuTextStyle: {
    fontFamily: MonserratRegular,
    fontSize: 18,
    marginRight: 10,
    marginTop: 5,
  },

  drawerProfileImageStyle: {
    borderRadius: 50,
    height: 50,
    marginBottom: 11,
    marginLeft: 'auto',
    width: 50,
  },
  drawerProfileTextStyle: {
    fontFamily: MonserratBold,
    fontSize: 18,
  },
});

DrawerContent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default DrawerContent;
