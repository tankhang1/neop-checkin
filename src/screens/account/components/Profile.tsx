import AppAvatar from '@/components/AppAvatar';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, View } from 'react-native';

type TProfile = {
  name: string;
  email: string;
  avatar: string;
};
const Profile = ({ name, email, avatar }: TProfile) => {
  return (
    <View style={styles.container}>
      <AppAvatar size={s(40)} name={name} avatar={avatar} />
      <View style={styles.gap4}>
        <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>{name}</Text>
        <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>{email}</Text>
      </View>
    </View>
  );
};
export default Profile;

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
});
