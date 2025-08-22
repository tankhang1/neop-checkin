import AppAvatar from '@/components/AppAvatar';
import AppBottomSheet from '@/components/AppBottomSheet';
import AppButton from '@/components/AppButton/AppButton';
import AppHeader from '@/components/AppHeader';
import AppRadio from '@/components/AppRadio';
import AppWorkspaceDropdown from '@/components/AppWorkspaceDropdown';
import { HEIGHT } from '@/constants/device.constants';
import { getWorkspace, updateEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import { navigationRef } from '@/navigation';
import { TEmployee, TWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

type TProfileCard = {
  employee: TEmployee | null;
  onForceUpdate: () => void;
};
type FormValues = {
  position: 'Staff' | 'Manager';
  workplace: TWorkspace | null;
};
const ProfileCard = ({ employee, onForceUpdate }: TProfileCard) => {
  const { account, brandname } = useSelector((state: RootState) => state.app);
  const [openedEdit, setOpenedEdit] = React.useState(false);
  const onInvitationQrCode = () => {
    navigationRef.navigate('InvitationQrCode', {
      workspaceId: employee?.workspaceId || '',
      employeeId: employee?.id || '',
    });
  };
  const { control, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      position: employee?.position || 'Staff',
      workplace: null,
    },
  });

  const onUpdateProfile = async (data: FormValues) => {
    if (!data.workplace?.id) {
      Toast.show({
        text1: 'Error',
        text2: 'Workplace is required',
        type: 'error',
      });
      return;
    }
    await updateEmployeeInWorkspace({
      id: employee?.id || '',
      position: data.position,
      workspaceId: data.workplace?.id,
    })
      .then(() => {
        onForceUpdate();
        setOpenedEdit(false);
      })
      .catch((error) => {
        Toast.show({
          text1: 'Error',
          text2: error.message,
          type: 'error',
        });
        console.log(error);
        setOpenedEdit(false);
      });
  };
  const onGetWorkspace = useCallback(async () => {
    if (employee?.workspaceId) {
      const data = await getWorkspace(employee.workspaceId);
      setValue('workplace', data as TWorkspace);
    }
  }, [employee?.workspaceId, setValue]);
  useEffect(() => {
    onGetWorkspace();
  }, [onGetWorkspace]);
  useEffect(() => {
    if (employee) {
      setValue('position', employee.position);
    }
  }, [employee, setValue]);
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <AppAvatar name={employee ? employee.name : '-'} />
        <View style={{ flex: 1, gap: vs(4), paddingLeft: s(16) }}>
          <Text style={styles.name}>{employee ? employee.name : '-'}</Text>
          <Text style={styles.role}>{employee ? employee.position : '-'}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpenedEdit(true)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        {/* Email */}
        <View style={styles.row}>
          <ICONS.CORE.EMAIL />
          <Text style={styles.text}>{employee ? employee.email : '-'}</Text>
        </View>

        {/* Phone */}
        <View style={styles.row}>
          <ICONS.CORE.PHONE />
          <Text style={[styles.text]}>{employee ? employee.phone : '-'}</Text>
        </View>
      </View>
      <AppButton
        onPress={onInvitationQrCode}
        variant='outline'
        label='Generate Invitation QRcode'
        buttonStyle={{
          borderColor: COLORS.blue[5],
        }}
        labelStyle={{
          ...FONTS.M17,
          color: COLORS.blue[5],
        }}
      />
      <AppBottomSheet height={HEIGHT * 0.6} visible={openedEdit} onClose={() => setOpenedEdit(false)}>
        <View>
          <AppHeader
            leftSection={
              <TouchableOpacity>
                <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Cancel</Text>
              </TouchableOpacity>
            }
            title='Edit'
          />
          <View style={{ gap: vs(16) }}>
            <Controller
              control={control}
              name='position'
              rules={{ required: 'Position is required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={{ marginTop: vs(20) }}>
                  <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>Position</Text>
                  <View style={styles.radio_group}>
                    <View style={{ flex: 1 }}>
                      <AppRadio label='Staff' checked={value === 'Staff'} onPress={() => onChange('Staff')} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <AppRadio label='Manager' checked={value === 'Manager'} onPress={() => onChange('Manager')} />
                    </View>
                  </View>
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </View>
              )}
            />
            <Controller
              control={control}
              name='workplace'
              rules={{ required: 'Workplace is required' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View>
                  <AppWorkspaceDropdown
                    accountId={account?.id || ''}
                    brandname={brandname}
                    textProps={{
                      label: 'Workplace',
                      placeholder: 'Select a workplace',
                      rightSection: <ICONS.CORE.CHERVON_DOWN />,
                    }}
                    defaultValue={value?.name}
                    onCallback={(val) => setValue('workplace', val)}
                  />
                  {error && <Text style={styles.error}>{error.message}</Text>}
                </View>
              )}
            />
          </View>
        </View>
        <AppButton label='Create' buttonContainerStyle={styles.create_button} onPress={handleSubmit(onUpdateProfile)} />
      </AppBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white[1],
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: vs(6),
    marginBottom: vs(16),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d9c8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#444',
  },
  name: {
    ...FONTS.M17,
    color: COLORS.blue[1],
  },
  role: {
    ...FONTS.R17,
    color: COLORS.blue[2],
  },
  edit: {
    ...FONTS.R17,
    color: COLORS.blue[5],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    marginLeft: 8,
    ...FONTS.R17,
    color: COLORS.blue[1],
  },
  button: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.blue[5],
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  info: {
    gap: vs(4),
    marginBottom: vs(16),
  },
  radio_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vs(8),
  },
  create_button: {
    position: 'absolute',
    width: '100%',
    bottom: 40,
    alignSelf: 'center',
  },
  error: {
    ...FONTS.R12,
    color: COLORS.red[1],
    marginTop: vs(4),
  },
});

export default ProfileCard;
