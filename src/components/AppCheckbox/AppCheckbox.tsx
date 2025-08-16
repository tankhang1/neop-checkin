import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s } from '@/utils/theme/responsive';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export type AppCheckboxProps = {
  label?: string | React.ReactNode;
  checked?: boolean;

  onChange?: (checked: boolean) => void;
  labelStyle?: StyleProp<TextStyle>;
  isError?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  bottomSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  rowContainerStyle?: StyleProp<ViewStyle>;
};
const AppCheckbox = ({
  label,
  labelStyle,
  style,
  checked = false,
  onChange,
  isError = false,
  containerStyle,
  bottomSection,
  rightSection,
  rowContainerStyle,
}: AppCheckboxProps) => {
  return (
    <View style={containerStyle}>
      <View style={[styles.rowContainer, rowContainerStyle]}>
        <TouchableOpacity style={styles.body} onPress={() => onChange?.(!checked)}>
          <View
            style={[
              styles.button,
              {
                backgroundColor: checked ? COLORS.blue[2] : COLORS.white[1],
                borderColor: isError ? COLORS.red[1] : checked ? COLORS.blue[2] : COLORS.blue[2],
              },
              style,
            ]}>
            {checked && <ICONS.CORE.CHECK color={COLORS.white[1]} width={s(18)} height={s(18)} />}
          </View>
          {!!label && (typeof label === 'string' ? <Text style={[styles.label, labelStyle]}>{label}</Text> : label)}
        </TouchableOpacity>
        {!!rightSection && rightSection}
      </View>
      {!!bottomSection && bottomSection}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    gap: s(12),
    alignItems: 'center',
  },
  button: {
    width: s(18),
    height: s(18),
    borderWidth: s(2),
    borderRadius: s(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...FONTS.R17,
    color: COLORS.blue[2],
  },
});
export default AppCheckbox;
