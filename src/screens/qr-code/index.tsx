import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { Image, StyleSheet, Text, View } from 'react-native';

const QrCodeScreen = () => {
  const onGenerate = () => {
    // Handle QR code generation logic here
    navigationRef.navigate('CheckinQrCode');
  };
  return (
    <AppContainer isScroll={false} style={{ flex: 1 }}>
      <AppHeader title='QRcode' />
      <View style={styles.body}>
        <Text style={FONTS.M24}>Create Check In QRcode</Text>
        <Image
          source={IMAGES.CORE.PIN_LOCATION}
          style={{ marginTop: vs(40), marginBottom: vs(40), height: vs(230), resizeMode: 'contain' }}
        />
        <AppTextInput
          label='Workplace'
          placeholder='Select'
          rightSection={<ICONS.CORE.PIN_LOCATION color={COLORS.blue[5]} />}
          containerInputStyle={{ width: '100%', marginBottom: vs(40) }}
        />
        <AppButton onPress={onGenerate} label='Generate' buttonContainerStyle={{ width: '100%' }} />
      </View>
    </AppContainer>
  );
};
export default QrCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: s(20),
  },
});
