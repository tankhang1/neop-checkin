import { TSearchResult } from '@/hooks/useSearchLocation';
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
  InvitationQrCode: undefined;
  CheckinQrCode: undefined;
  Main: NavigatorScreenParams<TBottomNavigation>;
};
type TBottomNavigation = {
  Employee: undefined;
  EmployeeDetail: undefined;
  Account: undefined;
  QRCode: undefined;
};
export type { TAppNavigation, TBottomNavigation };
