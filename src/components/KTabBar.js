import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddBox from 'src/assets/image/svg/add_box.svg';

// Style
import styles from 'src/assets/style/main/index';

const KTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const RenderMainBottomNavigator = () => {
    return state.routes.map((route, index) => {
      const {options} = descriptors[route.key];
      let iconName;
      let component;
      let size = 20;
      let color = '#000000';
      let colorFocused = '#504589';
      let iconStyle = styles.bottomTabIconStyle;
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const isFocused = state.index === index;
      let onPress = null;

      // custom route navigation (if you want to change bottom tab to navigate to another screen, not stack)
      onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      if (route.name === 'Home') {
        iconName = isFocused ? 'home-sharp' : 'home-sharp';
        component = (
          <Ionicons
            name={iconName}
            size={size}
            color={isFocused ? colorFocused : color}
          />
        );
      } else if (route.name === 'Transaksi') {
        iconName = isFocused ? 'card-sharp' : 'card-outline';
        component = (
          <Ionicons
            name={iconName}
            size={size}
            color={isFocused ? colorFocused : color}
          />
        );
      } else if (route.name === 'Notifikasi') {
        iconName = isFocused ? 'bell' : 'bell-outline';
        component = (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={isFocused ? colorFocused : color}
          />
        );
      } else if (route.name === 'Komunitas') {
        iconName = isFocused ? 'account-group' : 'account-group';
        component = (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={isFocused ? colorFocused : color}
          />
        );
      } else if (route.name === 'Dashboard') {
        iconName = isFocused ? 'account' : 'account';
        component = (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={isFocused ? colorFocused : color}
          />
        );
      } else if (route.name === 'ScanBarcode') {
        component = <AddBox />;
      }

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      if (route.name === 'ScanBarcode') {
        iconStyle = styles.middleBottomTabIconStyle;
      }

      return (
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={1}
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          key={route.name}
          style={{
            ...iconStyle,
          }}>
          {component}
          <Text
            style={{
              ...styles.textBottomTablIconLabel,
            }}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{...styles.containerTabStyle}}>
      {<RenderMainBottomNavigator />}
    </View>
  );
};

KTabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
  descriptors: PropTypes.object,
  state: PropTypes.object,
};

export default KTabBar;
