import AppHeader from '@/components/AppHeader';
import { verifyCode } from '@/firebase/code.firebase';
import { addEmployeeWorkList, getEmployeeInfo } from '@/firebase/workspace.firebase';
import { uuid } from '@/hooks/uuid';
import { navigationRef } from '@/navigation';
import { TEmployee } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

type Props = NativeStackScreenProps<TAppNavigation, 'ScanScreen'>;
const ScanScreen = ({ route }: Props) => {
  const [code, setCode] = useState('');
  const insets = useSafeAreaInsets();
  const [isActive, setIsActive] = useState(false);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      if (codes[0]?.value) setCode(codes[0].value);
    },
  });
  const device = useCameraDevice('back');
  const onRequestPermission = async () => {
    const status = await Camera.requestCameraPermission();
    if (status === 'denied') {
      Alert.alert('Camera Permission Denied', 'Please enable camera permission in settings', [
        { text: 'OK', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    setIsActive(true);
  };
  const onVerify = async () => {
    if (!code) {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'Please scan a QR code first',
      });
      return;
    }
    if (code.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'Invalid code format',
      });
      return;
    }
    const data = await verifyCode(code);
    if (!data) {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'Invalid verification code',
      });
      return;
    }
    if (Date.now() - data.createdAt > data.timeout) {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: 'Verification code expired',
      });
      return;
    }
    if (data.type === 'invitation') {
      if (data.employeeId) {
        const employee = (await getEmployeeInfo(data.employeeId)) as TEmployee;
        if (employee.status === 'Disable') {
          navigationRef.navigate('CreateEmployee', { data: data });
        } else {
          navigationRef.navigate('Checkin', { employeeId: data.employeeId });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: 'Invalid invitation code',
        });
      }
    }
    if (data.type === 'checkin') {
      if (!route.params?.employeeId) {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: 'Invalid employee ID',
        });
        return;
      }
      const id = uuid();

      await addEmployeeWorkList(route.params?.employeeId as string, {
        id,
        dateIn: new Date(),
        dateOut: new Date(),
      });
      navigationRef.navigate('TimeRunning', { employeeId: route.params?.employeeId!, workId: id });
    }
    if (data.type === 'workspace') {
      navigationRef.navigate('QrDisplay', { data });
    }
    // Call your verification API here
  };
  useEffect(() => {
    onRequestPermission();
  }, []);
  if (device)
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: insets.top }}>
          <AppHeader title='Scan QrCode' isGoBack backColor='white' />
        </View>
        <Camera
          style={StyleSheet.absoluteFill}
          codeScanner={codeScanner}
          enableZoomGesture={false}
          device={device}
          isActive={isActive}
          pointerEvents='auto'
        />
        {code && (
          <TouchableOpacity style={styles.button} onPress={onVerify}>
            <Image source={require('@/assets/images/check.png')} style={styles.check} />
            <Text style={[FONTS.M16, { color: COLORS.black[1] }]}>Verify</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.note, { bottom: 100 }]}>Data: {code}</Text>

        <Text style={styles.note}>*Note: Please leave your qr code in the camera view to scan automatically</Text>
      </View>
    );
};

export default ScanScreen;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100,
    height: 50,
    gap: 8,
    backgroundColor: COLORS.white[1],
    borderRadius: 100,
    padding: 12,
  },
  check: {
    width: 24,
    resizeMode: 'contain',
  },
  note: {
    ...FONTS.R14,
    color: COLORS.white[1],
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: '60%',
  },
});
