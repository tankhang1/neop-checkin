import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import React, { useMemo } from 'react';

import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type FormMessageProps = {
  style?: StyleProp<ViewStyle>;
  message?: string;

  variant?: 'error' | 'info' | 'success';
  containerStyle?: StyleProp<ViewStyle>;
};

const FormMessage = ({ message, style, containerStyle, variant = 'error' }: FormMessageProps) => {
  const color = useMemo<string>(() => {
    switch (variant) {
      case 'error':
        return COLORS.red[1];
      default:
        return COLORS.blue[1];
    }
  }, [variant]);
  if (!message) return null;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.message, { color }, style]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: vs(6),
    gap: s(4),
    alignItems: 'center',
  },
  message: {
    ...FONTS.R13,
    color: COLORS.red[1],
  },
});
export default FormMessage;
