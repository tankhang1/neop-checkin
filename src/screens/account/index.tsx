import AppButton from '@/components/AppButton/AppButton';
import { WIDTH } from '@/constants/device.constants';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, View } from 'react-native';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <ICONS.LOGO.WHITE />
      <View style={styles.gap96}>
        <View style={styles.gap36}>
          <Text style={[FONTS.B34, styles.title]}>{`Log in to your\nAccount`}</Text>
          <ICONS.CORE.PLACE_HOLDER />
        </View>
        <AppButton
          buttonStyle={{
            backgroundColor: COLORS.white[1],
          }}
          buttonContainerStyle={{
            width: WIDTH - 2 * s(20),
            alignSelf: 'center',
          }}
          label='Continue with Google'
          leftSection={<ICONS.SOCIAL_LOGIN.GOOGLE />}
          labelStyle={{ color: COLORS.black[2] }}
        />
      </View>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue[5],
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(24),
  },
  title: {
    color: COLORS.white[1],
    textAlign: 'center',
    lineHeight: vs(40),
  },
  gap36: {
    gap: vs(36),
  },
  gap96: {
    gap: vs(96),
  },
});
