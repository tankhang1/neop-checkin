import AuthScreen from '@/screens/auth';
import CheckinScreen from '@/screens/checkin';
import CreateEmployeeScreen from '@/screens/create-employee';
import CreateWorkplaceScreen from '@/screens/create-workplace';
import EmployeeScreen from '@/screens/employee';
import LocationScreen from '@/screens/location';
import LoginScreen from '@/screens/login/LoginScreen';
import QrDisplayScreen from '@/screens/qr-display';
import QrGenerateScreen from '@/screens/qr-generate';
import RegisterScreen from '@/screens/register/RegisterScreen';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<TAppNavigation>();
export const navigationRef = createNavigationContainerRef<TAppNavigation>();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName='Checkin'
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen name='Checkin' component={CheckinScreen} />
        <Stack.Screen name='QrDisplay' component={QrDisplayScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name='Auth' component={AuthScreen} />
        <Stack.Screen name='CreateEmployee' component={CreateEmployeeScreen} />
        <Stack.Screen name='CreateWorkplace' component={CreateWorkplaceScreen} />
        <Stack.Screen name='Employee' component={EmployeeScreen} />
        <Stack.Screen name='Location' component={LocationScreen} />
        <Stack.Screen name='QrGenerate' component={QrGenerateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
