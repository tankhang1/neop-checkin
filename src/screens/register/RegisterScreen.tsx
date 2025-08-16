import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import FormInput from '@/form/form-input/FormInput';
import { navigationRef } from '@/navigation';
import { RegisterInput, registerSchema } from '@/schemas/register.schema';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { mvs, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const RegisterScreen = () => {
  // FORM
  const { control, handleSubmit, setError, reset } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
    defaultValues: registerSchema.getDefault(),
    mode: 'onSubmit',
    //reValidateMode: 'onSubmit',
  });

  // METHOD
  const onSubmit = async (data: RegisterInput) => {};

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }} onPress={() => navigationRef.goBack()}>
              Cancel
            </Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(48) }}>Register</Text>
          </View>

          <View style={styles.formCont}>
            <FormInput control={control} name='fullName' label='Full Name' placeholder='Input your name' />
            <FormInput control={control} name='email' label='Email' placeholder='Input your email' />
            <FormInput control={control} name='phoneNumber' label='Phone Number' placeholder='0123456789' />
            <FormInput control={control} name='password' label='Password' secureTextEntry placeholder='******' />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingBottom: vs(58) }}>
        <AppButton label='Register' onPress={handleSubmit(onSubmit)} />
      </View>
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
  formCont: {
    gap: vs(20),
  },
});
export default RegisterScreen;
