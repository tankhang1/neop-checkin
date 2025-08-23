import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { useQrCode } from '@/hooks/useQrCode';
import { navigationRef } from '@/navigation';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';
type Props = NativeStackScreenProps<TAppNavigation, 'CheckinQrCode'>;
const CheckinQrCodeScreen = ({ route }: Props) => {
  const workspace = route.params.workspace;
  const { account } = useSelector((state: RootState) => state.app);
  const qrCode = useQrCode({
    timeout: 1000 * 60 * 5,
    type: 'workspace',
    workspaceId: workspace?.id,
    employeeId: '',
    userId: account?.id || '',
  });
  const onShareCode = () => {
    Share.open({
      title: 'Share QR Code',
      message: 'Scan this QR code to join the workspace',
      url: qrCode,
    });
  };
  const onGoBack = () => {
    navigationRef.goBack();
  };
  return (
    <AppContainer isScroll={false} style={styles.container}>
      <AppHeader
        leftSection={
          <TouchableOpacity onPress={onGoBack}>
            <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Back</Text>
          </TouchableOpacity>
        }
        title='Check In QRcode'
        rightSection={
          <TouchableOpacity onPress={onShareCode}>
            <ICONS.CORE.SHARE />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <ICONS.CORE.PIN_LOCATION />
        <Text style={[FONTS.R17, styles.address]}>{workspace?.address}</Text>
        <QRCode size={200} />
        <Text style={[FONTS.R48, { color: COLORS.blue[1], marginTop: vs(60) }]}>{qrCode}</Text>
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
  address: {
    color: COLORS.blue[1],
    marginTop: vs(8),
    marginBottom: vs(52),
    textAlign: 'center',
  },
});
