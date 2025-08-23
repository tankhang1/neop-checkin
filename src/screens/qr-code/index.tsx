import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppWorkspaceDropdown from '@/components/AppWorkspaceDropdown';
import { navigationRef } from '@/navigation';
import { TWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const QrCodeScreen = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<TWorkspace | null>(null);
  const { account, brandname } = useSelector((state: RootState) => state.app);
  const onGenerate = () => {
    // Handle QR code generation logic here
    if (!selectedWorkspace) {
      // Show an error message or handle the case when no workspace is selected
      Toast.show({
        type: 'error',
        text1: 'Workspace not selected',
        text2: 'Please select a workspace to generate the QR code.',
      });
      return;
    }
    navigationRef.navigate('CheckinQrCode', {
      workspace: selectedWorkspace,
    });
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

        <AppWorkspaceDropdown
          accountId={account?.id || ''}
          brandname={brandname || ''}
          textProps={{
            label: 'Workplace',
            placeholder: 'Select',
            rightSection: <ICONS.CORE.PIN_LOCATION color='#3366FF' />,
            containerInputStyle: { width: '100%' },
          }}
          onCallback={setSelectedWorkspace}
        />
        <AppButton onPress={onGenerate} label='Generate' buttonContainerStyle={{ width: '100%', marginTop: vs(40) }} />
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
