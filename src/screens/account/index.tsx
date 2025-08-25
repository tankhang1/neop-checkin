import AppBottomSheet from '@/components/AppBottomSheet';
import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { WIDTH } from '@/constants/device.constants';
import { updateUser } from '@/firebase/account.firebase';
import { getAccountByEmail, getWorkspacesByBandnameAndUserId, updateWorkspace } from '@/firebase/workspace.firebase';
import { navigationRef } from '@/navigation';
import { logout, setAccount, setWorkspace, updateAccount } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import InfoItem from './components/InfoItem';
import Profile from './components/Profile';
import TrashItem from './components/TrashItem';
import WorkspaceItem from './components/WorkspaceItem';
type FormEditValues = {
  email: string;
  phone: string;
};
const AccountScreen = () => {
  const dispatch = useDispatch();
  const [openedEditAccount, setOpenedEditAccount] = useState(false);
  const { account, brandname, workspace, employees } = useSelector((state: RootState) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<FormEditValues>({
    defaultValues: {
      email: account?.email,
      phone: account?.phone,
    },
  });
  const trashEmployees = useMemo(() => employees.filter((e) => e.status === 'Disable'), [employees]);
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
      const user = await getAccountByEmail(response.user.email || '');
      if (user) {
        dispatch(setAccount(user));
      } else {
        dispatch(
          setAccount({
            id: response.user.uid,
            email: response.user.email || '',
            name: response.user.displayName || '',
            url: response.user.photoURL || '',
            phone: response.user.phoneNumber || '',
          }),
        );
      }
      workspace.forEach((ws) => {
        updateWorkspace(ws.id, {
          accountId: response.user.uid,
        });
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
  const onGetListWorkspace = useCallback(async () => {
    const data = await getWorkspacesByBandnameAndUserId(brandname, account?.id || '');
    dispatch(setWorkspace(data));
  }, [brandname, account?.id, dispatch]);
  const onLogout = () => {
    Toast.show({
      type: 'success',
      text1: 'Logged Out',
      text2: 'You have been logged out successfully',
    });
    GoogleSignin.signOut();
    dispatch(logout());
  };
  const onAddNewWorkspace = () => {
    navigationRef.navigate('CreateWorkplace');
  };
  const onSave = async (data: FormEditValues) => {
    console.log('Edit Account Data:', data);
    if (!account?.id) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Account ID is missing',
      });
      return;
    }
    await updateUser({
      email: data.email,
      phone: data.phone,
      id: account?.id || '',
    });
    dispatch(
      updateAccount({
        email: data.email,
        phone: data.phone,
      }),
    );
    setOpenedEditAccount(false);
    Toast.show({
      type: 'success',
      text1: 'Account Updated',
      text2: 'Your account information has been updated successfully',
    });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '401853115864-851msct03lbt8kn4i0cb4f12nqeq59u7.apps.googleusercontent.com',
    });
  }, []);
  useEffect(() => {
    if (account?.id) {
      onGetListWorkspace();
    }
  }, [account?.id, onGetListWorkspace]);
  if (account) {
    return (
      <AppContainer isScroll={false} style={styles.container_account}>
        <AppHeader title='Account' />
        <View style={styles.body_account}>
          <ScrollView contentContainerStyle={{ gap: vs(20), paddingHorizontal: s(20), paddingVertical: vs(16) }}>
            <View style={styles.gap16}>
              <Profile name={account.name} email={account.email} avatar={account.url} />
              <View style={styles.card}>
                <InfoItem icon={<ICONS.CORE.EMAIL />} label={account.email} isDivider onEdit={() => setOpenedEditAccount(true)} />
                <InfoItem icon={<ICONS.CORE.PHONE />} label={account.phone} onEdit={() => setOpenedEditAccount(true)} />
              </View>
            </View>
            <View style={styles.gap12}>
              <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>Workplace</Text>
              <View style={styles.card}>
                {workspace?.map((ws, index) => (
                  <WorkspaceItem workspaceId={ws.id} key={ws.id} label={ws.name} isDivider={index !== workspace.length - 1} />
                ))}
                <TouchableOpacity style={styles.add_workspace} onPress={onAddNewWorkspace}>
                  <ICONS.CORE.PLUS />
                  <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>New Workplace</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.gap12}>
              <Text style={[FONTS.R17, { color: COLORS.blue[2] }]}>Trash</Text>
              <View style={styles.card}>
                {trashEmployees?.map((e, i) => (
                  <TrashItem
                    key={e.id}
                    id={e.id}
                    avatar={''}
                    email={e.email}
                    name={e.name}
                    isDivider={i !== trashEmployees.length - 1}
                  />
                ))}
              </View>
            </View>
            <View style={{ height: vs(200) }} />
          </ScrollView>
        </View>

        <AppButton
          label='Log out'
          onPress={onLogout}
          variant='transparent'
          buttonStyle={styles.buttonStyle}
          labelStyle={[FONTS.M17, { color: COLORS.blue[5] }]}
        />
        <AppBottomSheet visible={openedEditAccount} onClose={() => setOpenedEditAccount(false)}>
          <View style={styles.bottomSheetContent}>
            <Text style={[FONTS.M17, { color: COLORS.black[1], textAlign: 'center' }]}>Edit Account</Text>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email is invalid',
                },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View>
                  <AppTextInput
                    style={styles.input}
                    placeholder='Email'
                    label='Email'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name='phone'
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone number is invalid',
                },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View>
                  <AppTextInput
                    style={styles.input}
                    placeholder='Phone'
                    label='Phone Number'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType='numbers-and-punctuation'
                  />
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </View>
              )}
            />

            <AppButton
              label='Save'
              onPress={handleSubmit(onSave)}
              buttonStyle={styles.saveButton}
              labelStyle={[FONTS.M17, { color: COLORS.white[1] }]}
            />
          </View>
        </AppBottomSheet>
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

    backgroundColor: COLORS.green[1],
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
  bottomSheetContent: {
    backgroundColor: COLORS.white[1],
    gap: vs(12),
  },
  input: {},
  saveButton: {
    backgroundColor: COLORS.blue[5],
    borderRadius: s(8),
  },
  error: {
    ...FONTS.R12,
    color: COLORS.red[1],
    marginTop: vs(4),
  },
});
