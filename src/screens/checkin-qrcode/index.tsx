import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CheckinQrCodeScreen = () => {
  return (
    <AppContainer isScroll={false} style={styles.container}>
      <AppHeader
        leftSection={
          <TouchableOpacity>
            <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Back</Text>
          </TouchableOpacity>
        }
        title='Check In QRcode'
        rightSection={
          <TouchableOpacity>
            <ICONS.CORE.SHARE />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <ICONS.CORE.PIN_LOCATION />
        <Text style={[FONTS.R17, { color: COLORS.blue[1], marginTop: vs(8), marginBottom: vs(52) }]}>
          966 Glen Ellyn, Illinois 60137, USA
        </Text>
        <QRCode size={200} />
        <Text style={[FONTS.R48, { color: COLORS.blue[1], marginTop: vs(60) }]}>123456</Text>
      </View>
    </AppContainer>
  );
};
export default CheckinQrCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: vs(10),
    backgroundColor: COLORS.white[1],
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
