import { TSearchResult } from '@/hooks/useSearchLocation';
import { TWorkspace } from '@/redux/slices/AppSlice';
import { NavigatorScreenParams } from '@react-navigation/native';

type TAppNavigation = {
  // Public
  Login: undefined;
  Register: undefined;
  TimeRunning: undefined;
  EditProfile: undefined;
  EmployeeHistory: undefined;

  // Private
  Account: undefined;
  Auth: undefined;
  Checkin: undefined;
  CreateEmployee: undefined;
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
  QrDisplay: undefined;
  QrGenerate: undefined;
  InvitationQrCode: {
    workspaceId: string;
    employeeId?: string;
  };
  CheckinQrCode: {
    workspace: TWorkspace;
  };
  Main: NavigatorScreenParams<TBottomNavigation>;
};
type TBottomNavigation = {
  Employee: undefined;
  EmployeeDetail: undefined;
  Account: undefined;
  QRCode: undefined;
};
export type { TAppNavigation, TBottomNavigation };
