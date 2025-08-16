import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

type AppBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const AppBottomSheet = ({ visible, onClose, children }: AppBottomSheetProps) => {
  if (!visible) return null;

  return (
    <Portal>
      {/* Backdrop with fade in/out */}
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.backdrop}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      </Animated.View>

      {/* Bottom sheet with slide in/out */}
      <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.sheet}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default AppBottomSheet;
