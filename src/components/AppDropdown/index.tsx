import React, { useRef, useState } from 'react';
import { findNodeHandle, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import AppTextInput, { AppTextInputProps } from '../AppTextInput/AppTextInput';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

type TAppDropdown = {
  textProps: AppTextInputProps;
};
const AppDropdown = ({ textProps }: TAppDropdown) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const inputRef = useRef<View>(null);

  // Reanimated values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const openDropdown = () => {
    if (inputRef.current) {
      const handle = findNodeHandle(inputRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          setInputLayout({ x: pageX, y: pageY + 5, width, height });
          setVisible(true);

          opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) });
          translateY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) });
        });
      }
    }
  };

  const closeDropdown = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(-10, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(setVisible)(false);
      }
    });
  };

  const handleSelect = (item: string) => {
    setSelected(item);
    closeDropdown();
  };

  return (
    <View ref={inputRef}>
      <AppTextInput onPress={openDropdown} placeholder='Select option' {...textProps} />

      {visible && (
        <Portal>
          {/* Backdrop that closes dropdown when pressed */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDropdown}>
            <View />
          </Pressable>

          <Animated.View
            style={[
              styles.dropdown,
              {
                top: inputLayout.y + inputLayout.height,
                left: inputLayout.x,
                width: inputLayout.width,
              },
              animatedStyle,
            ]}>
            <FlatList
              data={OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 200,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

export default AppDropdown;
