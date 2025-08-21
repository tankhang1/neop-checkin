import { getEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import { TEmployee, TWorkspace } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardItem from './CardItem';

type TCard = {
  workplace: TWorkspace;
  onAddEmployee?: () => void;
};
const Card = ({ workplace, onAddEmployee }: TCard) => {
  const [listEmployee, setListEmployee] = useState<TEmployee[]>([]);
  const isDownload = useMemo(() => listEmployee.length > 1, [listEmployee.length]);
  const onGetListEmployee = useCallback(async () => {
    const employees = await getEmployeeInWorkspace(workplace.id);
    if (employees.length > 0) {
      setListEmployee([...employees] as TEmployee[]);
    }
  }, [workplace.id]);
  useEffect(() => {
    onGetListEmployee();
  }, [workplace.id, onGetListEmployee]);
  return (
    <View style={styles.overall}>
      <View style={styles.container}>
        <Text style={[FONTS.M19, { color: COLORS.blue[1] }]}>{workplace.name}</Text>
        <View style={styles.actions}>
          {isDownload && (
            <TouchableOpacity onPress={onAddEmployee}>
              <ICONS.CORE.DOWNLOAD color={COLORS.blue[5]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onAddEmployee}>
            <ICONS.CORE.ADD_EMPLOYEE />
          </TouchableOpacity>
        </View>
      </View>
      {listEmployee.map((item, index) => (
        <CardItem
          key={item.id}
          id={item.id}
          name={item.name}
          role={item.position}
          status={item.status}
          isDivider={index !== listEmployee.length - 1}
        />
      ))}
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
    gap: vs(16),
  },
});
