import AppButton from '@/components/AppButton/AppButton';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { Image, StyleSheet, Text, View } from 'react-native';

const QrDisplayScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ICONS.CORE.MAP_PIN />
        <Text style={{ ...FONTS.R17, color: COLORS.blue[1], marginTop: vs(12), marginBottom: vs(16) }}>
          966 Glen Ellyn, Illinois 60137, USA
        </Text>
        <Text style={{ ...FONTS.M19, color: COLORS.blue[1] }}>Workplace</Text>
        <Image source={IMAGES.CORE.QR_CODE} style={{ width: s(240), height: s(240) }} />
      </View>
      <View style={styles.buttonCont}>
        <AppButton
          buttonStyle={styles.button}
          label='Cancel'
          labelStyle={{ color: COLORS.blue[5] }}
          onPress={() => navigationRef.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white[1],
  },
  container: {
    flex: 1, // take remaining height above button
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.white[1],
    borderColor: COLORS.blue[5],
    borderWidth: 1,
  },
  buttonCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingBottom: vs(58),
  },
});
export default QrDisplayScreen;
