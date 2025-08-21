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
      {title && <Text style={styles.title}>{title}</Text>}
      {leftSection && leftSection}
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
    backgroundColor: COLORS.white[1],
  },
  title: {
    ...FONTS.M17,
    color: COLORS.blue[1],
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    alignSelf: 'center',
    zIndex: 0,
  },
  backButton: {
    paddingLeft: s(8),
    paddingVertical: vs(11),
    gap: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  back: {
    color: COLORS.blue[5],
  },
});
