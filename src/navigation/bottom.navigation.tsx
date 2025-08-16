import AppBottomNavigation from '@/components/AppBottomNavigation';
import AccountScreen from '@/screens/account';
import EmployeeScreen from '@/screens/employee';
import QrCodeScreen from '@/screens/qr-code';
import { TBottomNavigation } from '@/utils/types/navigation.types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<TBottomNavigation>();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <AppBottomNavigation {...props} />}>
      <Tab.Screen name='Employee' component={EmployeeScreen} />
      <Tab.Screen name='Account' component={AccountScreen} />
      <Tab.Screen name='QRCode' component={QrCodeScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
