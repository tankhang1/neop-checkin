import { NavigatorScreenParams } from '@react-navigation/native';

type TAppNavigation = {
  // Public
  Login: undefined;
  Register: undefined;

  // Private
  Account: undefined;
  Auth: undefined;
  Checkin: undefined;
  CreateEmployee: undefined;
  CreateWorkplace: undefined;
  Location: undefined;
  QrDisplay: undefined;
  QrGenerate: undefined;
  Main: NavigatorScreenParams<TBottomNavigation>;
};
type TBottomNavigation = {
  Employee: undefined;
  Account: undefined;
  QRCode: undefined;
};
export type { TAppNavigation, TBottomNavigation };
