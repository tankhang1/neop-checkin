import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import { navigationRef } from '@/navigation';
import { updateEmployeeId } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { mvs, s, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

type Props = NativeStackScreenProps<TAppNavigation, 'Checkin'>;
const CheckinScreen = ({ route }: Props) => {
  const dispatch = useDispatch();
  const params = route.params?.employeeId;
  const { employeeId } = useSelector((state: RootState) => state.app);
  const onScan = async () => {
    navigationRef.navigate('ScanScreen', {
      employeeId: employeeId || '',
    });
  };
  const onWorkList = async () => {
    navigationRef.navigate('EmployeeHistory', {
      employeeId: employeeId!,
    });
  };
  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          Toast.show({
            type: 'success',
            text1: 'Logout successful',
            text2: 'You have been logged out.',
          });
          dispatch(updateEmployeeId(undefined));
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        },
      },
    ]);
  };
  useEffect(() => {
    if (params) dispatch(updateEmployeeId(params));
  }, [dispatch, params]);
  return (
    <AppContainer isScroll={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerCont}>
            <TouchableOpacity onPress={onLogout} style={{ flexDirection: 'row', alignItems: 'center', gap: s(8) }}>
              <ICONS.CORE.LOGOUT />
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onWorkList}>
              <ICONS.CORE.CLOCK />
            </TouchableOpacity>
          </View>

          <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(48) }}>Check In</Text>
          <Text style={{ ...FONTS.R17, color: COLORS.blue[1], textAlign: 'center', marginVertical: vs(48) }}>
            Scan QR code to Check In
          </Text>

          <Image source={IMAGES.ILLUSTARTIONS.CHECKIN} style={styles.image} />
        </View>
      </ScrollView>
      <AppButton buttonContainerStyle={styles.buttonCont} label='Scan' onPress={onScan} />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white[1],
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(12),
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(16),
  },
  buttonCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingBottom: vs(58),
  },
  image: {
    width: 324,
    height: 300,
    alignSelf: 'center',
  },
});
export default CheckinScreen;
