import { FONTS } from '@/utils/theme/fonts';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type AppAvatarProps = {
  name: string;
  size?: number;
  avatar?: string; // Optional, not used in this component but can be added for future use
};

const AppAvatar: React.FC<AppAvatarProps> = ({ name, size = 40, avatar }) => {
  // Get initials
  const getInitials = (text: string = 'Checkin') => {
    const words = text.trim().split(' ');
    if (words.length === 1) return words[0][0]?.toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Generate color from string
  const stringToColor = (str: string = 'Checkin') => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  // Decide text color (contrast: white or black)
  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? '#000000' : '#FFFFFF';
  };

  const backgroundColor = stringToColor(name);
  const textColor = getContrastColor(backgroundColor);
  if (!avatar)
    return (
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
        ]}>
        <Text style={[styles.text, { color: textColor }]}>{getInitials(name)}</Text>
      </View>
    );
  return <Image source={{ uri: avatar }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...FONTS.SB16,
  },
});

export default AppAvatar;
