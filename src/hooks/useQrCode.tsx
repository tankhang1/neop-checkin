import { addCode } from '@/firebase/code.firebase';
import { RootState } from '@/redux/store';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export type TGenerateQrCode = {
  workspaceId: string;
  type: 'invitation' | 'checkin' | 'workspace';
  employeeId?: string;
  userId?: string;
  timeout: number;
  createdAt: number;
  brand: string;
};
const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const useQrCode = ({ type, workspaceId, timeout, employeeId, userId }: TGenerateQrCode) => {
  const { brandname } = useSelector((state: RootState) => state.app);
  const [qrCode, setQrCode] = useState<string>(generateSixDigitCode());
  const onQrCodeGenerated = useCallback(async () => {
    const code = generateSixDigitCode();
    await addCode(code, {
      timeout,
      type,
      workspaceId,
      employeeId,
      userId,
      createdAt: Date.now(),
      brand: brandname,
    });
    setQrCode(code);
  }, [timeout, type, workspaceId, employeeId, userId, brandname]);
  useEffect(() => {
    const interval = setInterval(() => {
      onQrCodeGenerated();
    }, timeout);
    return () => clearInterval(interval);
  }, [timeout, onQrCodeGenerated]);
  useEffect(() => {
    onQrCodeGenerated();
  }, [onQrCodeGenerated]);
  return qrCode;
};
