import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import { updateEmployeeInWorkspace } from '@/firebase/workspace.firebase';
import FormInput from '@/form/form-input/FormInput';
import { navigationRef } from '@/navigation';
import { CreateEmployeeInput, createEmployeeSchema } from '@/schemas/create-employee.schema';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<TAppNavigation, 'EditProfile'>;
const EditProfileScreen = ({ route }: Props) => {
  const phone = route.params?.phone;
  const email = route.params?.email;
  const id = route.params?.id;

  // FORM
  const { control, handleSubmit, setError, reset } = useForm<CreateEmployeeInput>({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: {
      email: email || '',
      phoneNumber: phone || '',
    },
    mode: 'onSubmit',
    //reValidateMode: 'onSubmit',
  });

  // METHOD
  const onSubmit = async (data: CreateEmployeeInput) => {
    console.log('data', data);
    await updateEmployeeInWorkspace({
      id,
      email: data.email,
      phone: data.phoneNumber,
    });
    Toast.show({
      type: 'success',
      text1: 'Update Successful',
      text2: 'Your profile has been updated successfully',
    });
    navigationRef.goBack();
  };
  return (
    <AppContainer isScroll={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }} onPress={() => navigationRef.goBack()}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }} onPress={() => navigationRef.goBack()}>
              Edit profile
            </Text>
            <TouchableOpacity>
              <ICONS.CORE.TRANSFORM />
            </TouchableOpacity>
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
        </ScrollView>

        <View style={{ paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingBottom: vs(58) }}>
          <AppButton label='Save' onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(18),
  },
  formCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(32),
    gap: vs(20),
  },
});
export default EditProfileScreen;
