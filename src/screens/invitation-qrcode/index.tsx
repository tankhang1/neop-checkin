import AppHeader from '@/components/AppHeader';
import { useQrCode } from '@/hooks/useQrCode';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

type Props = NativeStackScreenProps<TAppNavigation, 'InvitationQrCode'>;
const InvitationQrCodeScreen = ({ route }: Props) => {
  const workspaceId = route.params?.workspaceId || '';
  const employeeId = route.params?.employeeId || '';
  const qrCode = useQrCode({
    timeout: 1000 * 60 * 60 * 24,
    type: 'invitation',
    workspaceId,
    employeeId,
  });
  const onGoBack = () => {
    navigationRef.goBack();
  };
  const onShareCode = () => {
    Share.open({
      title: 'Share QR Code',
      message: 'Scan this QR code to join the workspace',
      url: qrCode,
    });
  };
  return (
    <View style={styles.container}>
      <AppHeader
        leftSection={
          <TouchableOpacity onPress={onGoBack}>
            <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Back</Text>
          </TouchableOpacity>
        }
        title='Invitation QRcode'
        rightSection={
          <TouchableOpacity onPress={onShareCode}>
            <ICONS.CORE.SHARE />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <QRCode value={qrCode} size={240} />
        <Text style={[FONTS.R17, { color: COLORS.blue[1] }]}>QR code lasts for 24 hours</Text>
      </View>
    </View>
  );
};

export default InvitationQrCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white[1],
    paddingHorizontal: s(20),
    paddingTop: vs(11),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(40),
  },
});
