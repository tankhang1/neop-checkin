import { TWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  findNodeHandle,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { useSelector } from 'react-redux';
import AppTextInput, { AppTextInputProps } from '../AppTextInput/AppTextInput';

type TAppDropdown = {
  textProps: AppTextInputProps;
  isClosable?: boolean;
  onCallback?: (value: TWorkspace) => void;
  accountId: string;
  brandname: string;
  defaultValue?: string;
};
const AppWorkspaceDropdown = ({ textProps, isClosable, onCallback, accountId, brandname, defaultValue }: TAppDropdown) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<TWorkspace | null>(null);
  const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [search, setSearch] = useState('');
  const inputRef = useRef<View>(null);
  const { workspace } = useSelector((state: RootState) => state.app);
  // Reanimated values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  const onReset = () => {
    setSearch('');
    setSelected(null);
    closeDropdown();
  };
  const openDropdown = () => {
    console.log('Opening dropdown');
    if (inputRef.current) {
      console.log('Input ref found');
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
  const handleSelect = (item: TWorkspace) => {
    setSelected(item);
    setSearch(item.name || '');
    closeDropdown();
    onCallback?.(item);
  };
  const renderItem = ({ item, index }: ListRenderItemInfo<TWorkspace>) => {
    return (
      <TouchableOpacity key={index} style={styles.item} onPress={() => handleSelect(item)}>
        <Text style={FONTS.M14}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (defaultValue) {
      setSearch(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View ref={inputRef}>
      <TouchableOpacity onPress={openDropdown}>
        <AppTextInput
          onPressIn={openDropdown}
          placeholder='Select option'
          {...textProps}
          defaultValue={search}
          onChangeText={setSearch}
          rightSection={
            isClosable ? (
              <TouchableOpacity onPress={onReset}>
                <ICONS.CORE.X />
              </TouchableOpacity>
            ) : (
              textProps.rightSection
            )
          }
          readOnly
        />
      </TouchableOpacity>

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
            <FlatList data={workspace} keyExtractor={(item) => item.toString()} renderItem={renderItem} />
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
  item: {
    paddingVertical: 14,
    paddingLeft: 10,
    gap: 4,
  },
});

export default AppWorkspaceDropdown;
