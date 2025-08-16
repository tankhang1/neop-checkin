import { WIDTH } from '@/constants/device.constants';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type TAppHeader = {
  title?: string;
  onBackPress?: () => void;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  isGoBack?: boolean;
  backColor?: string;
};
const AppHeader = ({ title, onBackPress, rightSection, leftSection, isGoBack, backColor = COLORS.blue[5] }: TAppHeader) => {
  const onGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigationRef.goBack();
    }
  };
  return (
    <View style={styles.container}>
      {isGoBack && (
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <ICONS.CORE.CHERVON_LEFT fill={backColor} />
          <Text style={[FONTS.R17, { color: backColor }]}>Back</Text>
        </TouchableOpacity>
      )}
      {leftSection && leftSection}
      {title && <Text style={styles.title}>{title}</Text>}
      {rightSection && rightSection}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: vs(44),
  },
  title: {
    ...FONTS.M17,
    color: COLORS.blue[1],
    width: WIDTH,
    position: 'absolute',
    textAlign: 'center',
  },
  backButton: {
    paddingLeft: s(8),
    paddingVertical: vs(11),
    gap: s(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: COLORS.blue[5],
  },
});
