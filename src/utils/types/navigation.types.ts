import { TGenerateQrCode } from '@/hooks/useQrCode';
import { TSearchResult } from '@/hooks/useSearchLocation';
import { TWorkspace } from '@/redux/slices/AppSlice';
import { NavigatorScreenParams } from '@react-navigation/native';

type TAppNavigation = {
  // Public
  Login: undefined;
  Register: undefined;
  TimeRunning: {
    employeeId: string;
    workId: string;
  };
  EditProfile: {
    email?: string;
    phone?: string;
    id: string;
  };
  EmployeeHistory: {
    employeeId: string;
  };

  // Private
  Account: undefined;
  Auth: undefined;
  Checkin: {
    employeeId: string;
  };
  CreateEmployee: {
    data: TGenerateQrCode;
  };
  AddEmployeeToWorkplace: {
    workspaceId: string;
  };
  CreateWorkplace: undefined;
  EmployeeDetail: {
    employeeId: string;
    workspaceId: string;
  };
  Location: {
    workspace: string;
    location?: TSearchResult;
  };
  QrDisplay: {
    data?: TGenerateQrCode;
  };
  QrGenerate: undefined;
  InvitationQrCode: {
    workspaceId: string;
    employeeId?: string;
  };
  CheckinQrCode: {
    workspace: TWorkspace;
  };
  Main: NavigatorScreenParams<TBottomNavigation>;
  ScanScreen: undefined | { employeeId?: string };
};
type TBottomNavigation = {
  Employee: undefined;
  EmployeeDetail: undefined;
  Account: undefined;
  QRCode: undefined;
};
export type { TAppNavigation, TBottomNavigation };
