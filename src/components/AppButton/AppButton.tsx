import { COLORS } from '@/utils/theme/colors';
import { s } from '@/utils/theme/responsive';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from './button.theme';

export type TButtonVariant = 'primary' | 'transparent' | 'outline';

export type TButtonFontSize = 'm17' | 'sb14';

export type TButtonSize = 'xs' | 'sm' | 'md';

type AppButtonProps = {
  variant?: TButtonVariant;
  children?: React.ReactNode;
  onPress?: () => void;
  fontSize?: TButtonFontSize;
  size?: TButtonSize;
  disable?: boolean;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  loading?: boolean;
} & TouchableOpacityProps;

const AppButton = ({
  variant = 'primary',
  children,
  onPress,
  fontSize = 'm17',
  size = 'md',
  disable = false,
  buttonContainerStyle,
  buttonStyle,
  label,
  labelStyle,
  leftSection,
  rightSection,
  loading = false,
  ...props
}: AppButtonProps) => {
  const buttonInitStyle = StyleSheet.flatten([
    styles.container,
    theme.variant[variant],
    theme.spacing[size],
    buttonStyle,
  ]) as ViewStyle;

  const renderMiddle = () => {
    const labelInitStyle = StyleSheet.flatten([
      styles.middleContainer,
      theme.fontSize[fontSize],
      { color: theme.variant[variant]?.color },
      labelStyle,
    ]) as TextStyle;
    return (
      <View>
        {!!label && <Text style={[labelInitStyle]}>{label}</Text>}
        {!!children && children}
      </View>
    );
  };

  return (
    <View style={[buttonContainerStyle]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={buttonInitStyle}
        disabled={disable || !onPress}
        onPress={() => onPress?.()}
        {...props}>
        {loading ? (
          <ActivityIndicator size={'small'} color={theme.variant[variant]?.color} />
        ) : (
          <>
            {leftSection && leftSection}
            {renderMiddle()}
            {rightSection && rightSection}
          </>
        )}
      </TouchableOpacity>
      {disable && <View style={[StyleSheet.absoluteFill, buttonInitStyle, styles.disableContainer]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: s(8),
  },
  middleContainer: {
    marginHorizontal: s(8),
  },
  disableContainer: {
    backgroundColor: COLORS.overlay[2],
  },
});

export default AppButton;
