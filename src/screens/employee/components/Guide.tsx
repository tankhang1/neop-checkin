import AppButton from '@/components/AppButton/AppButton';
import { WIDTH } from '@/constants/device.constants';
import { updateFirstTimeWorkspace } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const CONTENTS = new Map([
  [
    0,
    {
      title: 'Click here to create employees list.',
      desc: 'Free trial allows you to manage 5 employees.',
      triangle: { top: vs(216) + vs(52) + vs(27), right: s(8) },
      dot: { right: s(8), top: vs(4) },
      height: vs(52),
      top: vs(216) + vs(52) + vs(22),
      left: s(16),
    },
  ],
  [
    1,
    {
      title: 'Click to view employee information',
      height: vs(120),
      triangle: { top: vs(216) + vs(120) + vs(27), right: vs(36) },
      dot: { right: WIDTH / 2 - s(44), top: vs(60) },
      top: vs(216) + vs(120) + vs(22),
      left: s(16),
    },
  ],
  [
    2,
    {
      title: 'Generate invitation QRcode and send to employees',
      height: vs(200),
      triangle: { top: vs(216) + vs(200) + vs(27), right: WIDTH / 2 - s(44) },
      dot: { right: WIDTH / 2 - s(44), top: vs(100) },
      top: vs(216) + vs(200) + vs(22),
      left: s(16),
    },
  ],
]);

const Guide = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  // Reanimated shared values
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(20);
  const scaleAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = 0;
    slideAnim.value = 20;
    scaleAnim.value = 0;

    fadeAnim.value = withTiming(1, { duration: 350 });
    slideAnim.value = withTiming(0, { duration: 350 });
    scaleAnim.value = withSpring(1, { damping: 12, stiffness: 120 });
  }, [step]);

  // Animated styles
  const cardStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  return (
    <Portal>
      {/* Overlay */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(55,104,236,0.1)', padding: s(20) }]} />

      {/* Animated Card */}
      <Animated.View
        style={[
          styles.card,
          { height: CONTENTS.get(step)?.height || vs(52) },
          step === 2 && { alignItems: 'flex-start' },
          cardStyle,
        ]}>
        {step === 2 ? (
          <ICONS.CORE.PLACE_HOLDER_2 />
        ) : (
          <View style={styles.card_rows}>
            <Text style={FONTS.M19}>Your workplace</Text>
            <ICONS.CORE.ADD_EMPLOYEE />
          </View>
        )}
        {step === 1 && <ICONS.CORE.PLACE_HOLDER_1 />}
        {step !== 2 && (
          <Animated.View
            style={[
              styles.dot,
              {
                top: CONTENTS.get(step)?.dot?.top,
                right: CONTENTS.get(step)?.dot?.right,
              },
              dotStyle,
            ]}
          />
        )}
        {step === 2 && (
          <AppButton
            variant='outline'
            label='Generate Invitation QRcode'
            buttonContainerStyle={{ width: '100%' }}
            buttonStyle={{ borderColor: COLORS.blue[5] }}
            labelStyle={{ color: COLORS.blue[5] }}
          />
        )}
      </Animated.View>

      {/* Tooltip */}
      <Animated.View
        style={[
          styles.content,
          {
            top: CONTENTS.get(step)?.top || vs(0),
            left: CONTENTS.get(step)?.left,
          },
          contentStyle,
        ]}>
        <View>
          {CONTENTS.get(step)?.title && (
            <Text style={[FONTS.R17, { color: COLORS.white[1], marginBottom: CONTENTS.get(step)?.desc ? vs(18) : 0 }]}>
              {CONTENTS.get(step)?.title}
            </Text>
          )}
          {CONTENTS.get(step)?.desc && <Text style={[FONTS.R15, { color: COLORS.white[1] }]}>{CONTENTS.get(step)?.desc}</Text>}
        </View>
        <View style={styles.rows}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: s(8) }}>
            {Array.from({ length: CONTENTS.size }).map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === step ? s(16) : s(4),
                  height: s(4),
                  borderRadius: s(100),
                  backgroundColor: index === step ? 'rgba(217, 217, 217, 1)' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </View>
          {step === 2 ? (
            <TouchableOpacity
              style={styles.understood_button}
              onPress={() => {
                dispatch(updateFirstTimeWorkspace(false));
              }}>
              <Text style={[FONTS.M17, { color: COLORS.white[1] }]}>Understood</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.right_button} onPress={() => setStep(step + 1)}>
              <ICONS.CORE.CHERVON_RIGHT />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Portal>
  );
};

export default Guide;

const styles = StyleSheet.create({
  card: {
    width: WIDTH - 2 * s(16),
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: s(8),
    shadowColor: '#E4E5E7',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    padding: s(16),
    elevation: 2,
    backgroundColor: COLORS.white[1],
    position: 'absolute',
    top: vs(216),
    gap: vs(24),
  },
  dot: {
    width: s(44),
    height: s(44),
    borderRadius: s(100),
    backgroundColor: 'rgba(55, 104, 236, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(55, 104, 236, 1)',
    position: 'absolute',
  },
  content: {
    padding: s(20),
    backgroundColor: 'rgba(55, 104, 236, 1)',
    borderRadius: s(8),
    width: WIDTH - 2 * s(16),
    alignSelf: 'center',
    position: 'absolute',
    gap: vs(24),
  },
  right_button: {
    width: s(40),
    height: s(40),
    borderRadius: s(8),
    borderColor: COLORS.white[1],
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  understood_button: {
    borderRadius: s(8),
    borderColor: COLORS.white[1],
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: vs(48),
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  card_rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: WIDTH - 2 * s(16) - s(32),
  },
});
