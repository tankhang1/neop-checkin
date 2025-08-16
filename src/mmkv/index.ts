import {MMKV} from 'react-native-mmkv';

export const mmkv = new MMKV();

// Adapter for redux-persist
export const mmkvStorage = {
  getItem: (key: string): Promise<string | null> =>
    Promise.resolve(mmkv.getString(key) ?? null),
  setItem: (key: string, value: string): Promise<void> =>
    Promise.resolve(mmkv.set(key, value)),
  removeItem: (key: string): Promise<void> => Promise.resolve(mmkv.delete(key)),
};
