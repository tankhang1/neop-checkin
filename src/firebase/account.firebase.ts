import { TAccount } from '@/redux/slices/AppSlice';
import { collection, doc, getFirestore, setDoc } from '@react-native-firebase/firestore';

export const addUser = async (user: TAccount) => {
  try {
    const userRef = doc(collection(getFirestore(), 'users'), user.id);
    await setDoc(userRef, user);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const updateUser = async (user: TAccount) => {
  try {
    const userRef = doc(collection(getFirestore(), 'users'), user.id);
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(collection(getFirestore(), 'users'), userId);
    await setDoc(userRef, { deleted: true }, { merge: true });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
