import AppAvatar from '@/components/AppAvatar';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type TCardItem = {
  workspaceId: string;
  id: string;
  name: string;
  role: string;
  status: 'Working' | 'Off' | 'Disable';
  isDivider?: boolean;
};
const MapStatus = new Map([
  [
    'Working',
    {
      background: '#34C759',
      text: '#FFFFFF',
    },
  ],
  [
    'Off',
    {
      background: '#C6D5DD',
      text: '#253352',
    },
  ],
  [
    'Disable',
    {
      background: '#C6D5DD',
      text: '#FFFFFF',
    },
  ],
]);
const CardItem = ({ id, workspaceId, name, role, status, isDivider }: TCardItem) => {
  const onEmployeeDetail = () => {
    navigationRef.navigate('EmployeeDetail', {
      employeeId: id,
      workspaceId: workspaceId,
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onEmployeeDetail}>
      {/* Avatar */}
      <AppAvatar name={name} />

      <View style={[styles.rightSection, isDivider && { borderBottomWidth: 1, borderColor: COLORS.blue[3] }]}>
        {/* User Info */}
        <View style={styles.info}>
          <Text style={[styles.name, status === 'Disable' && { color: COLORS.blue[3] }]}>{name}</Text>
          <Text style={[styles.role, status === 'Disable' && { color: COLORS.blue[3] }]}>{role}</Text>
        </View>

        <View style={styles.actions}>
          {/* Enable Button */}
          <TouchableOpacity style={[styles.enableBtn, { backgroundColor: MapStatus.get(status)?.background }]}>
            <Text style={[styles.enableText, { color: MapStatus.get(status)?.text }]}>{status}</Text>
          </TouchableOpacity>

          {/* Call Icon */}
          <TouchableOpacity>
            <ICONS.CORE.PHONE />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
    backgroundColor: COLORS.white[1],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5D8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(16),
  },
  avatarText: {
    ...FONTS.M16,
    color: '#2C2C54',
  },
  info: {
    flex: 1,
    gap: vs(4),
  },
  name: {
    ...FONTS.M17,
    color: COLORS.blue[1],
  },
  role: {
    ...FONTS.R17,
    color: COLORS.blue[2],
  },
  enableBtn: {
    backgroundColor: COLORS.blue[5],
    borderRadius: 6,
    paddingHorizontal: s(10),
    paddingVertical: s(4),
    marginRight: s(10),
  },
  enableText: {
    ...FONTS.M13,
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(20),
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: vs(72),
  },
});

export default CardItem;
