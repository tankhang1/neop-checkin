import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { getEmployeeWorkList } from '@/firebase/workspace.firebase';
import { TWorklist } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WorkLogList from '../employee-detail/components/WorkLogList';

type Props = NativeStackScreenProps<TAppNavigation, 'EmployeeHistory'>;
const EmployeeHistory = ({ route }: Props) => {
  const employeeId = route.params?.employeeId;
  const [listWorklist, setListWorklist] = useState<TWorklist[]>([]);
  const onGetWorkList = useCallback(async () => {
    if (employeeId) {
      const data = await getEmployeeWorkList(employeeId);
      setListWorklist(data);
    }
  }, [employeeId]);
  useEffect(() => {
    onGetWorkList();
  }, [employeeId, onGetWorkList]);
  return (
    <AppContainer isScroll={false}>
      <AppHeader title='Working' isGoBack />

      <View style={styles.body}>
        <WorkLogList employeeId={employeeId} />
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(12),
    backgroundColor: COLORS.white[1],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, // negative height gives shadow above
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // for Android
    zIndex: 10,
  },
  body: {
    flex: 1,
    backgroundColor: '#EBF2E8',
    paddingHorizontal: s(16),
    paddingTop: vs(16),
  },
  card: {
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
    padding: s(16),
    width: width - THEME.PADDING_HORIZONTAL * 2,
    gap: vs(12),
  },
  content: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
    gap: vs(16),
  },
  cardRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
    paddingVertical: vs(12),
    flexDirection: 'row',
  },
  backButton: {
    paddingLeft: s(8),
    paddingVertical: vs(11),
    gap: s(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: COLORS.blue[5],
  },
});
export default EmployeeHistory;
