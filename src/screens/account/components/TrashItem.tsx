import AppAvatar from '@/components/AppAvatar';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TTrashItem = {
  name: string;
  email: string;
  avatar: string;
  isDivider?: boolean;
};
const TrashItem = ({ name, email, avatar, isDivider }: TTrashItem) => {
  return (
    <View style={styles.container}>
      <AppAvatar size={s(40)} name={name} avatar={avatar} />
      <View style={[styles.gap4, styles.flex, isDivider && { borderBottomWidth: 1, borderBottomColor: COLORS.blue[3] }]}>
        <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>{name}</Text>
        <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>{email}</Text>
      </View>
      <TouchableOpacity>
        <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
export default TrashItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white[1],
    padding: 16,
    height: vs(72),
    borderRadius: s(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
  },
  gap4: {
    gap: vs(4),
  },
  flex: {
    flex: 1,
  },
});
