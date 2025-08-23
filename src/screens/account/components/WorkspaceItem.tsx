import { deleteWorkspace as deleteWorkspaceStore } from '@/firebase/workspace.firebase';
import { deleteWorkspace } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s } from '@/utils/theme/responsive';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const WorkspaceItem = ({ label, isDivider, workspaceId }: { label: string; isDivider?: boolean; workspaceId: string }) => {
  const dispatch = useDispatch();
  const onDeleteWorkspace = () => {
    Alert.alert('Delete Workspace', 'Are you sure you want to delete this workspace?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteWorkspaceStore(workspaceId);
          dispatch(deleteWorkspace(workspaceId));
          Toast.show({
            type: 'success',
            text1: 'Workspace deleted',
            text2: 'The workspace has been deleted successfully',
          });
        },
      },
    ]);
  };
  return (
    <View style={[styles.container, isDivider && styles.divider]}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity onPress={onDeleteWorkspace}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkspaceItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: s(48),
    backgroundColor: COLORS.white[1],
  },

  label: {
    ...FONTS.R17,
  },
  deleteButton: {
    ...FONTS.R17,
    color: COLORS.blue[5],
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
  },
});
