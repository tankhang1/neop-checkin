import { WIDTH } from '@/constants/device.constants';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BOTTOM_ROUTES = new Map([
  [
    'Employee',
    {
      label: 'Employee',
      icon: <ICONS.BOTTOM_NAVIGATION.EMPLOYEE />,
      icon_active: <ICONS.BOTTOM_NAVIGATION.EMPLOYEE_ACTIVE />,
    },
  ],
  [
    'QRCode',
    {
      label: 'QRCode',
      icon: <ICONS.BOTTOM_NAVIGATION.QR_CODE />,
      icon_active: <ICONS.BOTTOM_NAVIGATION.QR_CODE_ACTIVE />,
    },
  ],
  [
    'Account',
    {
      label: 'Account',
      icon: <ICONS.BOTTOM_NAVIGATION.ACCOUNT />,
      icon_active: <ICONS.BOTTOM_NAVIGATION.ACCOUNT_ACTIVE />,
    },
  ],
]);
type TItem = {
  isActive: boolean;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
};
const Item = ({ item }: { item: TItem }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={item.onPress}>
      {item.icon}
      <Text
        style={[
          item.isActive ? FONTS.M10 : FONTS.R10,
          {
            color: item.isActive ? COLORS.blue[5] : COLORS.blue[1],
          },
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};
const AppBottomNavigation = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  console.log(state);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routeNames.map((route, index) => {
        const isFocused = state.index === index;

        const item = BOTTOM_ROUTES.get(route);
        if (!item) return null;

        return (
          <Item
            key={route}
            item={{
              label: item.label,
              icon: isFocused ? item.icon_active : item.icon,
              isActive: isFocused,
              onPress: () => {
                navigation.navigate(route);
              },
            }}
          />
        );
      })}
    </View>
  );
};
export default AppBottomNavigation;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: COLORS.blue[3],
    backgroundColor: COLORS.white[1],
  },
  icon: {
    marginRight: 8,
  },
  item: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    height: 58,
  },
});
