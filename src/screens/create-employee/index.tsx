import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import { getEmployeeInfo, getWorkspace, updateEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import FormInput from '@/form/form-input/FormInput';
import { navigationRef } from '@/navigation';
import { TEmployee, TWorkspace } from '@/redux/slices/AppSlice';
import { CreateEmployeeInput, createEmployeeSchema } from '@/schemas/create-employee.schema';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { mvs, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<TAppNavigation, 'CreateEmployee'>;
const CreateEmployeeScreen = ({ route }: Props) => {
  const data = route.params?.data;
  const [employee, setEmployee] = useState<TEmployee | null>(null);
  const [workspace, setWorkspace] = useState<TWorkspace | null>(null);
  // FORM
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeInput>({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
    },
    mode: 'onSubmit',
    //reValidateMode: 'onSubmit',
  });
  // METHOD
  const onSubmit = async (data: CreateEmployeeInput) => {
    console.log('data', data);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Employee updated successfully',
    });
    await updateEmployeeInWorkspace({
      email: data.email,
      phone: data.phoneNumber,
      status: 'Working',
      id: employee?.id,
    });
    InteractionManager.runAfterInteractions(() => {
      navigationRef.dispatch(StackActions.replace('Checkin', { employeeId: employee?.id }));
    });
  };
  const onGetEmployeeInfo = useCallback(async () => {
    // TO DO
    if (!data?.employeeId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Employee ID is required',
      });
      navigationRef.goBack();
      return;
    }
    const employeeData = (await getEmployeeInfo(data.employeeId)) as TEmployee;
    if (employeeData?.email) {
      setValue('email', employeeData.email);
    }
    if (employeeData?.phone) {
      setValue('phoneNumber', employeeData.phone);
    }
    setEmployee(employeeData as TEmployee);
  }, [data?.employeeId, setEmployee, setValue]);
  const onGetWorkspaceInfo = useCallback(async () => {
    if (!data?.workspaceId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Workspace ID is required',
      });
      navigationRef.goBack();
      return;
    }
    const workspaceData = await getWorkspace(data.workspaceId);
    setWorkspace(workspaceData as TWorkspace);
  }, [data?.workspaceId, setWorkspace]);

  useEffect(() => {
    onGetEmployeeInfo();
    onGetWorkspaceInfo();
  }, [onGetEmployeeInfo, onGetWorkspaceInfo]);
  console.log('errors', errors);
  return (
    <AppContainer isScroll={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }} onPress={() => navigationRef.goBack()}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(40) }}>{`Create\nyour profile`}</Text>
            </View>
            <View style={styles.infoCont}>
              <View>
                <Text style={styles.label}>Workspace</Text>
                <Text style={styles.content}>{workspace?.name}</Text>
              </View>

              <View>
                <Text style={styles.label}>Full name</Text>
                <Text style={styles.content}>{employee?.name}</Text>
              </View>
            </View>

            <View style={styles.formCont}>
              <FormInput control={control} name='email' placeholder='Input your email' label='Email' />
              <FormInput
                control={control}
                name='phoneNumber'
                placeholder='Input your phone'
                label='Phone Number'
                keyboardType='numbers-and-punctuation'
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingBottom: vs(58) }}>
          <AppButton label='Create' onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(18),
  },
  header: {
    marginTop: vs(18),
    marginBottom: vs(32),
  },
  infoCont: {
    gap: vs(28),
  },
  label: {
    ...FONTS.M17,
    color: COLORS.blue[1],
    marginBottom: vs(12),
  },
  content: {
    ...FONTS.R17,
  },
  formCont: {
    paddingVertical: vs(32),
    gap: vs(20),
  },
});

export default CreateEmployeeScreen;
