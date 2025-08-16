import { isIOS } from '@/utils/helpers/platform.helper';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';

import { s, vs } from '@/utils/theme/responsive';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

export type AppTextInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  containerInputStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
} & TextInputProps;

const AppTextInput = ({
  containerStyle,
  containerInputStyle,
  style,
  label,
  labelStyle,
  required = false,
  leftSection,
  rightSection,
  ...props
}: AppTextInputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    const labelInitStyle = StyleSheet.flatten([styles.label, labelStyle]) as TextStyle;
    return (
      <View style={styles.labelCont}>
        <Text style={labelInitStyle}>{label}</Text>
        {required && <View style={styles.asterisk} />}
      </View>
    );
  };
  return (
    <View style={containerStyle}>
      {!!label && renderLabel()}
      <View style={[{ borderColor: isFocus ? COLORS.blue[2] : COLORS.blue[3] }, styles.containerInputStyle, containerInputStyle]}>
        {leftSection && leftSection}
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderTextColor={COLORS.blue[2]}
          style={[styles.input, style]}
          autoCapitalize={'none'}
          autoComplete={'off'}
          textContentType='none'
          scrollEnabled={false}
          {...props}
        />
        {!!rightSection && rightSection}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...FONTS.M17,
    color: COLORS.blue[1],
  },
  labelCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2),
    marginBottom: vs(6),
  },
  asterisk: {
    backgroundColor: COLORS.red[1],
    width: s(4),
    height: s(4),
    borderRadius: s(100),
  },
  containerInputStyle: {
    flexDirection: 'row',
    borderWidth: s(1),
    borderRadius: s(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(12),
    paddingVertical: isIOS ? vs(14) : vs(0),
    backgroundColor: COLORS.white[1],

    // 🔽 shadow for iOS
    shadowColor: COLORS.blue[4],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // 🔽 shadow for Android
    elevation: 3,
  },
  input: {
    ...FONTS.R14,
    color: COLORS.blue[1],
    flex: 1,
    lineHeight: isIOS ? 0 : undefined,
  },
});
export default AppTextInput;
