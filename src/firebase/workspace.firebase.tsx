import { TWorkspace } from '@/redux/slices/AppSlice';
import firestore from '@react-native-firebase/firestore';

export const createWorkspace = async (workspace: TWorkspace) => {
  await firestore().collection('Workspaces').doc(workspace.id).set(workspace);
};
export const deleteWorkspace = async (workspaceId: string) => {
  await firestore().collection('Workspaces').doc(workspaceId).delete();
};
export const updateWorkspace = async (workspace: TWorkspace) => {
  await firestore().collection('Workspaces').doc(workspace.id).update(workspace);
};
