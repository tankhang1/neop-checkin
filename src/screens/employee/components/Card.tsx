import { getEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import { setEmployees, TEmployee, TWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import * as RNFS from '@dr.pogodin/react-native-fs';
import { useCallback, useEffect, useMemo } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import XLSX from 'xlsx';
import CardItem from './CardItem';
type TCard = {
  workplace: TWorkspace;
  search: string;
  onAddEmployee?: () => void;
};
const Card = ({ workplace, search, onAddEmployee }: TCard) => {
  const { employees } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const isDownload = useMemo(() => employees.length > 1, [employees.length]);
  const onGetListEmployee = useCallback(async () => {
    const employees = await getEmployeeInWorkspace(workplace.id);
    if (employees.length > 0) {
      // Sort so that managers are on top
      const sorted = [...employees].sort((a, b) => {
        if (a.position === 'Manager' && b.position !== 'Manager') return -1;
        if (a.position !== 'Manager' && b.position === 'Manager') return 1;
        return 0;
      });
      dispatch(setEmployees(sorted as TEmployee[]));
    }
  }, [workplace.id, dispatch]);
  const onExportExcel = async () => {
    if (Platform.OS === 'android') {
      const isPermit = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (!isPermit) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toast.show({
            type: 'error',
            text1: 'Permission Denied',
            text2: 'Storage permission is required to export Excel file',
          });
          return;
        }
      }
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    const path =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/employees.xlsx`
        : `${RNFS.ExternalStorageDirectoryPath}/employees.xlsx`;

    if (Platform.OS === 'ios') {
      await Share.open({
        url: 'file://' + path,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename: 'employees',
      });
    }

    console.log('Success');
    Toast.show({
      type: 'success',
      text1: 'Export Successful',
      text2: 'Employees exported to Excel successfully',
    });
  };
  useEffect(() => {
    onGetListEmployee();
  }, [onGetListEmployee]);
  return (
    <View style={styles.overall}>
      <View style={styles.container}>
        <Text style={[FONTS.M19, { color: COLORS.blue[1] }]}>{workplace.name}</Text>
        <View style={styles.actions}>
          {isDownload && (
            <TouchableOpacity onPress={onExportExcel}>
              <ICONS.CORE.DOWNLOAD color={COLORS.blue[5]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onAddEmployee}>
            <ICONS.CORE.ADD_EMPLOYEE />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {employees
          .filter((item) => item.name.includes(search))
          .map((item, index) => (
            <CardItem
              key={item.id}
              id={item.id}
              workspaceId={workplace.id}
              name={item.name}
              role={item.position}
              status={item.status}
              isDivider={index !== employees.length - 1}
            />
          ))}
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(24),
  },
  overall: {
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
    padding: s(16),
    paddingBottom: 0,
    gap: vs(16),
  },
});
