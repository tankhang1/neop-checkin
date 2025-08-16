import { COLORS } from '@/utils/theme/colors';
import { s, vs } from '@/utils/theme/responsive';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type DividerProps = {
  variant?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
};

const AppDivider = ({ variant = 'horizontal', style }: DividerProps) => {
  return <View style={[{ backgroundColor: COLORS.blue[3] }, styles[variant], style]} />;
};

const styles = StyleSheet.create({
  vertical: {
    height: vs(14),
    width: s(1),
  },
  horizontal: {
    height: vs(1),
    width: s(343),
  },
});
export default AppDivider;
