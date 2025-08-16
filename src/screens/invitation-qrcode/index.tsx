import AppHeader from '@/components/AppHeader';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
const InvitationQrCodeScreen = () => {
  const onGoBack = () => {
    navigationRef.goBack();
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
          <TouchableOpacity>
            <ICONS.CORE.SHARE />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <QRCode value='Just some string value' size={240} />
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
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(40),
  },
});
