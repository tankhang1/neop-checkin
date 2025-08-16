import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs, width } from '@/utils/theme/responsive';
import React, { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type AppSegmentControlOption = {
  key: string;
  label: string;
};

type AppSegmentControlProps = {
  style?: StyleProp<ViewStyle>;
  options: AppSegmentControlOption[];
  selectedOption?: string;
  onChange?: (option: string) => void;
  isScrollable?: boolean;
};

type OptionLayout = {
  x: number;
  width: number;
};

const AppSegmentControl = ({ style, options, selectedOption, onChange, isScrollable = false }: AppSegmentControlProps) => {
  const length = useMemo(() => options?.length || 1, [options?.length]);
  const defaultWidth = useMemo(() => (width - s(20 * 2)) / length, [length]);

  const [layouts, setLayouts] = useState<OptionLayout[]>([]);

  const translateX = useSharedValue(0);
  const highlightWidth = useSharedValue(defaultWidth);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: highlightWidth.value,
  }));

  const handlePress = (item: AppSegmentControlOption, index: number) => {
    onChange?.(item.key);
    if (isScrollable && layouts[index]) {
      const { x, width } = layouts[index];
      translateX.value = withTiming(x, { duration: 300 });
      highlightWidth.value = withTiming(width, { duration: 300 });
    } else {
      translateX.value = withTiming(index * defaultWidth, { duration: 300 });
      highlightWidth.value = withTiming(defaultWidth, { duration: 300 });
    }
  };

  const renderOptions = () =>
    options.map((item, index) => (
      <TouchableOpacity
        key={item.key}
        onPress={() => handlePress(item, index)}
        style={[styles.option, isScrollable && styles.scrollOption]}
        activeOpacity={0.7}>
        <Text style={item.key === selectedOption ? styles.selectedTitle : styles.optionTitle}>{item.label}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.overlayContainer, { width: defaultWidth }, animatedStyle]} />
      {renderOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - s(16 * 2),
    backgroundColor: COLORS.green[1],
    overflow: 'hidden',
    borderRadius: s(8),
    flexDirection: 'row',
  },

  option: {
    flex: 1,
    paddingVertical: vs(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollOption: {
    paddingHorizontal: s(12),
  },
  optionTitle: {
    ...FONTS.R17,
    color: COLORS.blue[1],
  },
  selectedTitle: {
    ...FONTS.M17,
    color: COLORS.blue[5],
  },
  overlayContainer: {
    position: 'absolute',
    //height: '100%',
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
    zIndex: -1,
    top: 4,
    bottom: 4,
    left: 4,
    paddingVertical: vs(10),
  },
});

export default AppSegmentControl;
