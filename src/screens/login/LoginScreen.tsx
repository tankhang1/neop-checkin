import AppButton from '@/components/AppButton/AppButton';
import AppCheckbox from '@/components/AppCheckbox/AppCheckbox';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppDivider from '@/components/AppDivider/AppDivider';
import FormInput from '@/form/form-input/FormInput';
import { navigationRef } from '@/navigation';
import { LoginInput, loginSchema } from '@/schemas/login.schema';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { mvs, s, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
  // STATE
  const [isRemmeberMe, setIsRememberMe] = useState(false);

  // FORM
  const { control, handleSubmit, setError, reset } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchema.getDefault(),
    mode: 'onSubmit',
  });

  // METHOD
  const onSubmit = async (data: LoginInput) => {};

  return (
    <AppContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.container}>
          <ICONS.LOGO.MD />
          <View style={styles.header}>
            <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(48) }}>Log in to your</Text>
            <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(48) }}>Account</Text>
          </View>

          <View style={styles.formCont}>
            <FormInput control={control} name='email' placeholder='Input your email' label='Email' />
            <FormInput control={control} name='password' placeholder='********' secureTextEntry label='Password' />
          </View>

          <View style={styles.remmeberMeCont}>
            <AppCheckbox label='Remember me' checked={isRemmeberMe} onChange={setIsRememberMe} />
            <TouchableOpacity>
              <Text style={{ ...FONTS.M17, color: COLORS.blue[5] }}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.butonCont}>
            <AppButton label='Log in' onPress={handleSubmit(onSubmit)} />
            <View style={styles.middleButtonCont}>
              <AppDivider variant='horizontal' style={{ flex: 1 }} />
              <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Or login with</Text>
              <AppDivider variant='horizontal' style={{ flex: 1 }} />
            </View>
            <AppButton
              label='Continue with Google'
              variant='outline'
              fontSize='sb14'
              onPress={() => {}}
              leftSection={<ICONS.SOCIAL_LOGIN.GOOGLE />}
            />

            <View style={styles.registerCont}>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigationRef.navigate('Register')}>
                <Text style={{ ...FONTS.M17, color: COLORS.blue[5] }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(48),
    backgroundColor: COLORS.white[1],
  },
  header: {
    marginTop: vs(24),
    marginBottom: vs(16),
  },
  formCont: {
    gap: vs(20),
  },
  remmeberMeCont: {
    marginTop: vs(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(48),
  },
  butonCont: {
    gap: vs(24),
    width: '100%',
  },
  middleButtonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(23),
  },
  registerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    justifyContent: 'center',
  },
});
export default LoginScreen;
