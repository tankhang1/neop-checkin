import AppButton from '@/components/AppButton/AppButton';
import { WIDTH } from '@/constants/device.constants';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AccountScreen = () => {
  const onContinueWithGoogle = async () => {
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
    console.log('Google Sign-In Response:', response);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '401853115864-851msct03lbt8kn4i0cb4f12nqeq59u7.apps.googleusercontent.com',
    });
  }, []);
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
          onPress={onContinueWithGoogle}
          label='Continue with Google'
          leftSection={<ICONS.SOCIAL_LOGIN.GOOGLE />}
          labelStyle={{ color: COLORS.black[2] }}
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
  title: {
    color: COLORS.white[1],
    textAlign: 'center',
    lineHeight: vs(40),
  },
  gap36: {
    gap: vs(36),
  },
  gap96: {
    gap: vs(96),
  },
});
