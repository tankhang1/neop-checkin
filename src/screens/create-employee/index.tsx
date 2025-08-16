import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import FormInput from '@/form/form-input/FormInput';
import { navigationRef } from '@/navigation';
import { CreateEmployeeInput, createEmployeeSchema } from '@/schemas/create-employee.schema';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { mvs, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackActions } from '@react-navigation/native';
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

const CreateEmployeeScreen = () => {
  // FORM
  const { control, handleSubmit, setError, reset } = useForm<CreateEmployeeInput>({
    resolver: yupResolver(createEmployeeSchema),
    defaultValues: createEmployeeSchema.getDefault(),
    mode: 'onSubmit',
    //reValidateMode: 'onSubmit',
  });
  // METHOD
  const onSubmit = async (data: CreateEmployeeInput) => {
    InteractionManager.runAfterInteractions(() => {
      navigationRef.dispatch(StackActions.replace('Checkin'));
    });
  };

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
                <Text style={styles.label}>Work place</Text>
                <Text style={styles.content}>Hugo B. Zigler</Text>
              </View>

              <View>
                <Text style={styles.label}>Full name</Text>
                <Text style={styles.content}>Hugo B. Zigler</Text>
              </View>
            </View>

            <View style={styles.formCont}>
              <FormInput control={control} name='email' placeholder='Input your email' label='Email' />
              <FormInput control={control} name='phoneNumber' placeholder='Input your phone' label='Phone Number' />
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
