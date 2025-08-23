import { TGenerateQrCode } from '@/hooks/useQrCode';
import firestore from '@react-native-firebase/firestore';

export const addCode = async (code: string, data: TGenerateQrCode) => {
  try {
    console.log('Adding code:', code, data);
    const cleanData = Object.fromEntries(
      Object.entries({ code, ...data }).map(([key, value]) => [key, value === undefined ? '' : value]),
    );
    const codeRef = firestore().collection('Codes').doc(code);
    await codeRef.set(cleanData);
  } catch (error) {
    console.error('Error adding code:', error);
  }
};

export const verifyCode = async (code: string) => {
  try {
    const codeRef = firestore().collection('Codes').doc(code);
    const codeSnapshot = await codeRef.get();
    if (codeSnapshot.exists()) {
      return codeSnapshot.data() as TGenerateQrCode;
    } else {
      console.log('Code not found');
      return null;
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    return null;
  }
};
