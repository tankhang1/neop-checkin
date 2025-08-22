import { addCode } from '@/firebase/code.firebase';
import { useEffect, useState } from 'react';
export type TGenerateQrCode = {
  workspaceId: string;
  type: 'invitation' | 'checkin' | 'workspace';
  employeeId?: string;
  userId?: string;
  timeout: number;
};
const generateSixDigitCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const useQrCode = ({ type, workspaceId, timeout, employeeId, userId }: TGenerateQrCode) => {
  const [qrCode, setQrCode] = useState<string>(generateSixDigitCode());

  useEffect(() => {
    const interval = setInterval(() => {
      const uniqueCode = generateSixDigitCode();
      addCode(uniqueCode, {
        timeout,
        type,
        workspaceId,
        employeeId,
        userId,
      });
      setQrCode(generateSixDigitCode());
    }, timeout);
    return () => clearInterval(interval);
  }, [timeout, type, workspaceId, employeeId, userId]);

  return qrCode;
};
