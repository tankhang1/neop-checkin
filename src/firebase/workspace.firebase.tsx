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

export const getEmployeeInWorkspace = async (workspaceId: string) => {
  const snapshot = await firestore().collection('Employees').where('workspaceId', '==', workspaceId).get();
  return snapshot.docs.map((doc) => doc.data());
};
