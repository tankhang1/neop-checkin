import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s } from '@/utils/theme/responsive';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InfoItem = ({ icon, label, isDivider }: { icon: React.ReactNode; label: string; isDivider?: boolean }) => {
  return (
    <View style={[styles.container, isDivider && styles.divider]}>
      <View style={styles.iconContainer}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: s(48),
    backgroundColor: COLORS.white[1],
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
  },
  label: {
    ...FONTS.R17,
  },
  editButton: {
    ...FONTS.R17,
    color: COLORS.blue[5],
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
  },
});
