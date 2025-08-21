import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { WIDTH } from '@/constants/device.constants';
import { addUser } from '@/firebase/account.firebase';
import { logout, setAccount } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import InfoItem from './components/InfoItem';
import Profile from './components/Profile';
import WorkspaceItem from './components/WorkspaceItem';

const AccountScreen = () => {
  const dispatch = useDispatch();
  const { account, workspace } = useSelector((state: RootState) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  const onContinueWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('Attempting Google Sign-In...');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      console.log('Google Sign-In Result:', signInResult);
      // Try the new style of google-sign in result, from v13+ of that module
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        //@ts-expect-error no check
        idToken = signInResult?.idToken || '';
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(signInResult?.data?.idToken);

      // Sign-in the user with the credential
      const response = await signInWithCredential(getAuth(), googleCredential);
      setIsLoading(false);
      dispatch(
        setAccount({
          id: response.user.uid,
          email: response.user.email || '',
          name: response.user.displayName || '',
          url: response.user.photoURL || '',
          phone: response.user.phoneNumber || '',
        }),
      );
      addUser({
        id: response.user.uid,
        email: response.user.email || '',
        name: response.user.displayName || '',
        url: response.user.photoURL || '',
        phone: response.user.phoneNumber || '',
      });
      Toast.show({
        type: 'success',
        text1: 'Google Sign-In Successful',
        text2: `Welcome ${response.user.displayName || ''}`,
      });
      console.log('Google Sign-In Response:', response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Failed',
        text2: 'Please try again later.',
      });
      setIsLoading(false);
    }
  };
  const onLogout = () => {
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been logged out successfully',
    });
    GoogleSignin.signOut();
    dispatch(logout());
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '401853115864-851msct03lbt8kn4i0cb4f12nqeq59u7.apps.googleusercontent.com',
    });
  }, []);
  if (account) {
    return (
      <AppContainer isScroll={false} style={styles.container_account}>
        <AppHeader title='Account' />
        <ScrollView contentContainerStyle={styles.body_account}>
          <View style={styles.gap16}>
            <Profile name={account.name} email={account.email} avatar={account.url} />
            <View style={styles.card}>
              <InfoItem icon={<ICONS.CORE.EMAIL />} label={account.email} isDivider />
              <InfoItem icon={<ICONS.CORE.PHONE />} label={account.phone} />
            </View>
          </View>
          <View style={styles.gap12}>
            <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>Workplace</Text>
            <View style={styles.card}>
              {workspace?.map((ws) => (
                <WorkspaceItem key={ws.id} label={ws.name} isDivider />
              ))}
              <TouchableOpacity style={styles.add_workspace}>
                <ICONS.CORE.PLUS />
                <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>New Workplace</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.gap12}>
            <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>Trash</Text>
            <View style={styles.card}>
              {workspace?.map((ws) => (
                <WorkspaceItem key={ws.id} label={ws.name} isDivider />
              ))}
            </View>
          </View>
        </ScrollView>
        <AppButton
          label='Log out'
          onPress={onLogout}
          variant='transparent'
          buttonStyle={styles.buttonStyle}
          labelStyle={[FONTS.M17, { color: COLORS.blue[5] }]}
        />
      </AppContainer>
    );
  }
  return (
    <View style={styles.container}>
      <ICONS.LOGO.WHITE />
      <View style={styles.gap96}>
        <View style={styles.gap36}>
          <Text style={[FONTS.B34, styles.title]}>{`Log in to your\nAccount`}</Text>
          <ICONS.CORE.PLACE_HOLDER />
        </View>
        <AppButton
          buttonStyle={{
            backgroundColor: COLORS.white[1],
          }}
          buttonContainerStyle={{
            width: WIDTH - 2 * s(20),
            alignSelf: 'center',
          }}
          variant='transparent'
          onPress={onContinueWithGoogle}
          label='Continue with Google'
          leftSection={<ICONS.SOCIAL_LOGIN.GOOGLE />}
          labelStyle={{ color: COLORS.black[2] }}
          loading={isLoading}
        />
      </View>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue[5],
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(24),
  },
  container_account: {
    flex: 1,
    backgroundColor: COLORS.white[1],
  },
  body_account: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingVertical: vs(16),
    backgroundColor: COLORS.green[1],
    gap: vs(20),
  },
  title: {
    color: COLORS.white[1],
    textAlign: 'center',
    lineHeight: vs(40),
  },
  gap12: {
    gap: vs(12),
  },
  gap16: {
    gap: vs(16),
  },
  gap36: {
    gap: vs(36),
  },
  gap96: {
    gap: vs(96),
  },
  card: {
    paddingHorizontal: s(16),
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
  },
  add_workspace: {
    height: vs(48),
    alignItems: 'center',
    flexDirection: 'row',
    gap: s(14),
  },
  buttonStyle: {
    backgroundColor: COLORS.white[1],
    position: 'absolute',
    width: WIDTH - 2 * s(20),
    alignSelf: 'center',
    bottom: vs(40),
  },
});
