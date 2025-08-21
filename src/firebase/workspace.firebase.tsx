import { TEmployee, TWorkspace } from '@/redux/slices/AppSlice';
import firestore from '@react-native-firebase/firestore';

export const createWorkspace = async (workspace: TWorkspace) => {
  await firestore().collection('Workspaces').doc(workspace.id).set(workspace);
};
export const deleteWorkspace = async (workspaceId: string) => {
  await firestore().collection('Workspaces').doc(workspaceId).delete();
};
export const updateWorkspace = async (workspaceId: string, data: Partial<TWorkspace>) => {
  await firestore().collection('Workspaces').doc(workspaceId).update(data);
};
export const getWorkspace = async (workspaceId: string) => {
  const snapshot = await firestore().collection('Workspaces').doc(workspaceId).get();
  return snapshot.data() as TWorkspace;
};

export const getWorkspacesByBandnameAndUserId = async (brandname: string, userId?: string) => {
  const query = firestore().collection('Workspaces').where('brandname', '==', brandname);
  if (userId) {
    query.where('userId', '==', userId);
  }
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as TWorkspace);
};

export const getEmployeeInWorkspace = async (workspaceId: string) => {
  const snapshot = await firestore().collection('Employees').where('workspaceId', '==', workspaceId).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const createEmployeeInWorkspace = async (employee: TEmployee) => {
  await firestore().collection('Employees').doc(employee.id).set(employee);
};

export const getEmployeeInfo = async (employeeId: string) => {
  const snapshot = await firestore().collection('Employees').doc(employeeId).get();
  return snapshot.data();
};

export const deleteEmployeeInWorkspace = async (employeeId: string) => {
  await firestore().collection('Employees').doc(employeeId).delete();
};

export const updateEmployeeInWorkspace = async (employee: Partial<TEmployee>) => {
  await firestore().collection('Employees').doc(employee.id).update(employee);
};
