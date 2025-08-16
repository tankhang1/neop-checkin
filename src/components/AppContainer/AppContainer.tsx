import { COLORS } from '@/utils/theme/colors';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppContainerProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const AppContainer = ({ style, children }: AppContainerProps) => {
  return (
    <KeyboardAvoidingView style={[styles.container, style]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white[1] }}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AppContainer;
