import AppAvatar from '@/components/AppAvatar';
import { deleteEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import { deleteEmployee } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

type TTrashItem = {
  name: string;
  email: string;
  avatar: string;
  id: string;
  isDivider?: boolean;
};
const TrashItem = ({ name, email, avatar, id, isDivider }: TTrashItem) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    Alert.alert('Delete Employee', 'Are you sure you want to delete this employee?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          // Handle delete action
          await deleteEmployeeInWorkspace(id);
          dispatch(deleteEmployee(id));
          Toast.show({
            type: 'success',
            text1: 'Employee Deleted',
            text2: 'The employee has been deleted successfully',
          });
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <AppAvatar size={s(40)} name={name} avatar={avatar} />
      <View style={[styles.rightSection, isDivider && styles.divider]}>
        <View style={[styles.gap4, styles.flex]}>
          <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>{name}</Text>
          <Text style={[FONTS.R17, { color: COLORS.blue[2] }]} numberOfLines={1}>
            {email}
          </Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TrashItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white[1],
    height: vs(72),
    borderRadius: s(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
  },
  gap4: {
    gap: vs(4),
  },
  flex: {
    flex: 1,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: s(8),
    paddingVertical: vs(8),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
  },
});
