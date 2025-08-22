import AppHeader from '@/components/AppHeader';
import { deleteEmployeeInWorkspace, getEmployeeInfo } from '@/firebase/workspace.firebase';
import { navigationRef } from '@/navigation';
import { TEmployee } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ProfileCard from './components/ProfileCard';
import WorkLogList from './components/WorkLogList';

type Props = NativeStackScreenProps<TAppNavigation, 'EmployeeDetail'>;
const EmployeeDetailScreen = ({ route }: Props) => {
  const workspaceId = route.params.workspaceId;
  const employeeId = route.params.employeeId;
  const [employee, setEmployee] = useState<TEmployee | null>(null);
  const onGetEmployeeInfo = useCallback(async () => {
    if (!employeeId || !workspaceId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid employee or workspace ID',
      });
      navigationRef.goBack();
      return;
    }
    const data = await getEmployeeInfo(employeeId);
    setEmployee(data as TEmployee);
  }, [employeeId, workspaceId]);
  const onDeleteEmployee = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this employee?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            if (employeeId) {
              navigationRef.goBack();
              await deleteEmployeeInWorkspace(employeeId);
              Toast.show({
                type: 'success',
                text1: 'Employee deleted successfully',
              });
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const insets = useSafeAreaInsets();
  useEffect(() => {
    onGetEmployeeInfo();
  }, [onGetEmployeeInfo]);
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader
        isGoBack
        title={employee ? employee.name : '-'}
        rightSection={
          <View style={[styles.rows, styles.pr20]}>
            <TouchableOpacity>
              <ICONS.CORE.CALENDAR />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteEmployee}>
              <ICONS.CORE.DELETE />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.body}>
        <ProfileCard employee={employee} onForceUpdate={onGetEmployeeInfo} />
        {employee?.id && <WorkLogList employeeId={employee.id} />}
      </View>
    </View>
  );
};

export default EmployeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white[1],
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(20),
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.green[1],
    paddingHorizontal: s(20),
    paddingTop: vs(16),
    gap: vs(16),
  },
  pr20: {
    paddingRight: s(20),
  },
});
