import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

// icon and style
import styles from 'src/assets/style/main';
import BusinessIcon from 'src/assets/image/svg/icon/dashboard/dashboardBisnis.svg';
import KomunitaskuIcon from 'src/assets/image/svg/icon/dashboard/dashboardKomunitasku.svg';
import PortfolioIcon from 'src/assets/image/svg/icon/dashboard/dashboardPortfolio.svg';
import ProfileIcon from 'src/assets/image/svg/icon/dashboard/dashboardProfile.svg';
import ResumeIcon from 'src/assets/image/svg/icon/dashboard/dashboardResume.svg';

const dashboardScreen = ({navigation}) => {
  const listMenuDashboard = [
    {
      icon: <ProfileIcon />,
      title: 'Profile',
      subTitle: 'Detail data pribadi anda',
      onPress: () => navigation.navigate('ProfileKartuku'),
    },
    {
      icon: <BusinessIcon />,
      title: 'Bisnis Saya',
      subTitle: 'Daftar usaha atau tempat anda bekerja',
      onPress: () => navigation.navigate('BusinessKartuku'),
    },
    {
      icon: <KomunitaskuIcon />,
      title: 'Komunitasku',
      subTitle: 'Seluruh komunitas yang tergabung dengan anda',
      onPress: () => navigation.navigate('KomunitasKartuku'),
    },
    {
      icon: <PortfolioIcon />,
      title: 'Karir',
      subTitle: 'Kumpulan karir anda',
      onPress: () => navigation.navigate('PortofolioKartuku'),
    },
    {
      icon: <ResumeIcon />,
      title: 'Resume',
      subTitle: 'Karir dan prestasi anda sebelumnya',
      onPress: () => navigation.navigate('ResumeKartuku'),
    },
  ];

  const RenderListMenuDashboard = () => {
    return listMenuDashboard.map((listMenuItem, index) => {
      return (
        <TouchableOpacity
          style={
            index !== listMenuDashboard.length - 1
              ? styles.borderLightGray1px
              : null
          }
          key={listMenuItem.title}
          onPress={listMenuItem.onPress}
          activeOpacity={1}>
          <View
            style={
              index === 0
                ? {...styles.flex1DirectionRow}
                : {...styles.flex1DirectionRow, ...styles.paddingTop2}
            }>
            <View>{listMenuItem.icon}</View>
            <View
              style={{...styles.flex1DirectionColumn, ...styles.marginLeft5}}>
              <Text
                style={{...styles.marginVertical15, ...styles.subHeaderText2}}>
                {listMenuItem.title}
              </Text>
              <Text
                style={{
                  ...styles.subHeaderRegulerText2,
                  ...styles.marginBottom3,
                }}>
                {listMenuItem.subTitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView>
      {/* Container Start */}
      <View style={styles.homeContainer}>
        <RenderListMenuDashboard />
      </View>
    </ScrollView>
  );
};

dashboardScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default dashboardScreen;
