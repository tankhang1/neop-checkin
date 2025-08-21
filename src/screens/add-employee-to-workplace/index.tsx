import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppRadio from '@/components/AppRadio';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { WIDTH } from '@/constants/device.constants';
import { createEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import { uuid } from '@/hooks/uuid';
import { navigationRef } from '@/navigation';
import { addEmployee } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  position: 'Staff' | 'Manager';
};

type Props = NativeStackScreenProps<TAppNavigation, 'AddEmployeeToWorkplace'>;
const AddEmployeeToWorkplaceScreen = ({ route }: Props) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: 'Staff',
    },
  });

  const onGoBack = () => {
    navigationRef.goBack();
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data);
    const id = uuid();
    dispatch(
      addEmployee({
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        id,
        status: data.position === 'Manager' ? 'Working' : 'Disable',
        workspaceId: route.params.workspaceId,
      }),
    );
    createEmployeeInWorkspace({
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      id,
      status: data.position === 'Manager' ? 'Working' : 'Disable',
      workspaceId: route.params.workspaceId,
    });
    Toast.show({
      type: 'success',
      text1: 'Employee added successfully',
    });
    onGoBack();
  };

  return (
    <View style={styles.flex}>
      <AppContainer style={styles.container}>
        <AppHeader
          leftSection={
            <TouchableOpacity onPress={onGoBack}>
              <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Cancel</Text>
            </TouchableOpacity>
          }
          title='Add Employee'
        />

        <View style={[styles.gap20, styles.mt32]}>
          {/* Name */}
          <Controller
            control={control}
            name='name'
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <AppTextInput label='Name' placeholder='Nam Phan' value={value} onChangeText={onChange} />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </View>
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name='email'
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <AppTextInput label='Email' placeholder='namphan@gmail.com' value={value} onChangeText={onChange} />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </View>
            )}
          />

          {/* Phone */}
          <Controller
            control={control}
            name='phone'
            rules={{ required: 'Phone number is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <AppTextInput label='Phone number' placeholder='0123456789' value={value} onChangeText={onChange} />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </View>
            )}
          />

          {/* Position */}
          <Controller
            control={control}
            name='position'
            render={({ field: { onChange, value } }) => (
              <View>
                <Text style={[FONTS.M17, { color: COLORS.blue[1], marginBottom: vs(8) }]}>Position</Text>
                <View style={styles.radio_group}>
                  <View style={styles.flex}>
                    <AppRadio label='Staff' checked={value === 'Staff'} onPress={() => onChange('Staff')} />
                  </View>
                  <View style={styles.flex}>
                    <AppRadio label='Manager' checked={value === 'Manager'} onPress={() => onChange('Manager')} />
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </AppContainer>

      {/* Submit Button */}
      <AppButton
        label='Add'
        onPress={handleSubmit(onSubmit)}
        buttonContainerStyle={{
          position: 'absolute',
          width: WIDTH - 2 * s(20),
          bottom: vs(40),
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default AddEmployeeToWorkplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    gap: vs(32),
  },
  gap20: {
    gap: vs(20),
  },
  radio_group: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  mt32: {
    marginTop: vs(32),
  },
  error: {
    ...FONTS.R12,
    color: COLORS.red[1],
    marginTop: vs(4),
  },
});
