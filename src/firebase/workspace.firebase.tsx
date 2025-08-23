import { TAccount, TEmployee, TWorklist, TWorkspace } from '@/redux/slices/AppSlice';
import firestore from '@react-native-firebase/firestore';

export const createWorkspace = async (workspace: TWorkspace) => {
  await firestore().collection('Workspaces').doc(workspace.id).set(workspace);
};
export const deleteWorkspace = async (workspaceId: string) => {
  await firestore().collection('Workspaces').doc(workspaceId).delete();
  await firestore()
    .collection('Employees')
    .where('workspaceId', '==', workspaceId)
    .get()
    .then((snapshot) => {
      const batch = firestore().batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    });
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

  const snapshot = await query.get();
  if (userId) return snapshot.docs.map((doc) => doc.data() as TWorkspace).filter((ws) => ws.accountId === userId);
  return snapshot.docs.map((doc) => doc.data() as TWorkspace).filter((ws) => !ws.accountId);
};

export const getEmployeeInWorkspace = async (workspaceId: string) => {
  const snapshot = await firestore().collection('Employees').where('workspaceId', '==', workspaceId).get();
  return snapshot.docs.map((doc) => doc.data());
};
export const getAllEmployees = async () => {
  const snapshot = await firestore().collection('Employees').get();
  return snapshot.docs.map((doc) => doc.data() as TEmployee);
};
export const createEmployeeInWorkspace = async (employee: TEmployee) => {
  await firestore().collection('Employees').doc(employee.id).set(employee);
};

export const getEmployeeInfo = async (employeeId: string) => {
  const snapshot = await firestore().collection('Employees').doc(employeeId).get();
  return snapshot.data();
};
export const getAccountByEmail = async (email: string) => {
  const snapshot = await firestore().collection('Users').where('email', '==', email).get();
  if (!snapshot.empty) {
    return snapshot.docs[0].data() as TAccount;
  }
  return null;
};

export const deleteEmployeeInWorkspace = async (employeeId: string) => {
  await firestore().collection('Employees').doc(employeeId).delete();
};

export const updateEmployeeInWorkspace = async (employee: Partial<TEmployee>) => {
  await firestore().collection('Employees').doc(employee.id).update(employee);
};

export const addEmployeeWorkList = async (employeeId: string, data: TWorklist) => {
  await firestore().collection('Employees').doc(employeeId).collection('WorkList').doc(data.id).set(data);
};

export const getEmployeeWorkList = async (employeeId: string) => {
  const snapshot = await firestore().collection('Employees').doc(employeeId).collection('WorkList').get();
  return snapshot.docs.map((doc) => doc.data() as TWorklist);
};

export const getWorklist = async (employeeId: string, workId: string) => {
  const snapshot = await firestore().collection('Employees').doc(employeeId).collection('WorkList').doc(workId).get();
  return snapshot.data() as TWorklist;
};

export const updateEmployeeWorkList = async (employeeId: string, workId: string, data: Partial<TWorklist>) => {
  await firestore().collection('Employees').doc(employeeId).collection('WorkList').doc(workId).update(data);
};
