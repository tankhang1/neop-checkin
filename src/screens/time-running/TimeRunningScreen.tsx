import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppDivider from '@/components/AppDivider/AppDivider';
import { getEmployeeInfo, getWorklist, getWorkspace, updateEmployeeWorkList } from '@/firebase/workspace.firebase';
import { navigationRef } from '@/navigation';
import { TEmployee, TWorklist, TWorkspace } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { height, s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Timer from './components/Timmer';

type Props = NativeStackScreenProps<TAppNavigation, 'TimeRunning'>;
const TimeRunningScreen = ({ route, navigation }: Props) => {
  const employeeId = route.params?.employeeId;
  const workId = route.params?.workId;
  const [isLoading, setIsLoading] = useState(false);
  const [workspace, setWorkspace] = useState<TWorkspace | null>(null);
  const [employee, setEmployee] = useState<TEmployee | null>(null);
  const [worklist, setWorklist] = useState<TWorklist | null>(null);
  const onGetWorkspace = async (workspaceId: string) => {
    const data = await getWorkspace(workspaceId);
    setWorkspace(data);
  };
  const onGetEmployee = useCallback(async () => {
    if (employeeId) {
      const data = (await getEmployeeInfo(employeeId)) as TEmployee;
      setEmployee(data);
      onGetWorkspace(data.workspaceId);
    }
  }, [employeeId]);
  const onCheckout = async () => {
    if (workId && employeeId) {
      setIsLoading(true);
      await updateEmployeeWorkList(employeeId, workId, { dateOut: new Date() });
      Toast.show({
        type: 'success',
        text1: 'Checkout Successful',
        text2: 'You have successfully checked out',
      });
      setIsLoading(false);
      navigation.pop(2);
    }
  };
  const onWorkList = async () => {
    navigationRef.navigate('EmployeeHistory', {
      employeeId: employeeId!,
    });
  };
  const onLaunchLibrary = () => {
    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
  };
  const onGetWorkList = useCallback(async () => {
    if (workId && employeeId) {
      const data = await getWorklist(employeeId, workId);
      setWorklist(data);
    }
  }, [employeeId, workId]);
  useFocusEffect(() => {
    onGetEmployee();
    onGetWorkList();
  });
  return (
    <AppContainer isScroll={false}>
      <View style={styles.headerCont}>
        <TouchableOpacity style={{ opacity: 0 }}>
          <ICONS.CORE.CLOCK />
        </TouchableOpacity>
        <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>Working</Text>
        <TouchableOpacity onPress={onWorkList}>
          <ICONS.CORE.CLOCK />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.avatarCont}>
            <Image
              source={{
                uri: employee?.avatar || 'https://www.w3schools.com/howto/img_avatar.png',
              }}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
            <TouchableOpacity style={styles.cameraCont} onPress={onLaunchLibrary}>
              <ICONS.CORE.CAMERA />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginBottom: vs(24) }}>
            <Text style={{ ...FONTS.M17, color: COLORS.blue[1], marginBottom: vs(12) }}>{employee?.name}</Text>
            <Text style={{ ...FONTS.R17, color: COLORS.blue[2], marginBottom: vs(8) }}>{employee?.email}</Text>
            <Text style={{ ...FONTS.R17, color: COLORS.blue[2], marginBottom: vs(16) }}>{employee?.phone}</Text>
            <TouchableOpacity
              onPress={() => {
                navigationRef.navigate('EditProfile', { email: employee?.email, phone: employee?.phone, id: employee?.id! });
              }}>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }}>Edit profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalCont}>
            <Timer />

            <AppDivider style={{ width: width - THEME.PADDING_HORIZONTAL, marginBottom: vs(8) }} />

            <View style={styles.row}>
              <ICONS.CORE.MAP_PIN />
              <View style={{ flex: 1, gap: vs(8) }}>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Working at</Text>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>{workspace?.name}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <ICONS.CORE.CLOCK_RIGHT />
              <View style={{ flex: 1, gap: vs(8) }}>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Start time</Text>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>
                  {worklist?.dateIn
                    ? //@ts-expect-error no check
                      dayjs(worklist?.dateIn.toDate()).format('HH:mm')
                    : '-'}
                </Text>
              </View>
            </View>

            <AppButton
              buttonContainerStyle={{ width: width - THEME.PADDING_HORIZONTAL * 2, marginVertical: vs(47) }}
              buttonStyle={{ backgroundColor: '#DF6D14' }}
              label='Check Out'
              onPress={onCheckout}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
  },
  headerCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(12),
    backgroundColor: COLORS.white[1],
    zIndex: 10,
  },
  body: {
    flex: 1,
    backgroundColor: '#EBF2E8',
    alignItems: 'center',
  },
  avatarCont: {
    marginTop: vs(32),
    marginBottom: vs(16),
    borderRadius: 100,
    alignSelf: 'center',
  },
  cameraCont: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white[1],
    borderRadius: 100,
    width: s(32),
    height: s(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCont: {
    backgroundColor: COLORS.white[1],
    flex: 1,
    borderTopLeftRadius: s(12),
    borderTopRightRadius: s(12),
    height: height * 0.6,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // negative height since it's at the top
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,

    width: width,
    //paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
    alignItems: 'center',
  },
  modalTitle: {
    alignItems: 'center',
    gap: vs(16),
    marginBottom: vs(24),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: s(23),
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
  },
});
export default TimeRunningScreen;
