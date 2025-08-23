import AppButton from '@/components/AppButton/AppButton';
import { getWorkspace } from '@/firebase/workspace.firebase';
import { useQrCode } from '@/hooks/useQrCode';
import { navigationRef } from '@/navigation';
import { TWorkspace } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<TAppNavigation, 'QrDisplay'>;
const QrDisplayScreen = ({ route }: Props) => {
  const qrCode = route.params?.data;
  const [workspace, setWorkspace] = useState<TWorkspace | null>(null);
  const code = useQrCode({
    brand: qrCode?.brand || '',
    createdAt: Date.now(),
    timeout: 1000 * 60,
    type: 'checkin',
    workspaceId: qrCode?.workspaceId || '',
    employeeId: qrCode?.employeeId || '',
    userId: qrCode?.userId || '',
  });
  const onGetWorkspace = useCallback(async () => {
    if (!qrCode?.workspaceId) {
      Toast.show({
        type: 'error',
        text1: 'Workspace not found',
        text2: 'Please scan a valid QR code.',
      });
      return;
    }
    const data = await getWorkspace(qrCode?.workspaceId);
    setWorkspace(data);
  }, [qrCode?.workspaceId]);
  useEffect(() => {
    if (qrCode?.workspaceId) {
      onGetWorkspace();
    }
  }, [qrCode?.workspaceId, onGetWorkspace]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ICONS.CORE.MAP_PIN />
        <Text style={styles.address}>{workspace?.address || ''}</Text>
        <View style={styles.qrCode}>
          <Text style={{ ...FONTS.M19, color: COLORS.blue[1] }}>Workplace</Text>
          <QRCode value={code} size={s(220)} />
          <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>{workspace?.brandname}</Text>
        </View>
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
  address: {
    ...FONTS.R17,
    color: COLORS.blue[1],
    marginTop: vs(12),
    marginBottom: vs(16),
    textAlign: 'center',
  },
  qrCode: {
    gap: vs(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default QrDisplayScreen;
