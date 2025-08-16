import { COLORS } from '@/utils/theme/colors';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type AppContainerProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  withSafeArea?: boolean;
};

const AppContainer = ({ style, children, withSafeArea = true }: AppContainerProps) => {
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={[styles.container, style]}>
      {withSafeArea ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white[1] }}>{children}</SafeAreaView>
      ) : (
        <>{children}</>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AppContainer;
