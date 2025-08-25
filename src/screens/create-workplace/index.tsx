import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { TSearchResult } from '@/hooks/useSearchLocation';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InteractionManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddressBottomSheet from './components/AddressBottomSheet';

type Props = NativeStackScreenProps<TAppNavigation, 'CreateWorkplace'>;
type FormValues = {
  workspace: string;
  location?: TSearchResult;
};
const CreateWorkplaceScreen = ({ navigation }: Props) => {
  const [openAddressSheet, setOpenAddressSheet] = useState(false);
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: { workspace: '' },
  });
  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    // Navigate after submit
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate('Location', {
        workspace: data.workspace,
        location: data.location,
      });
    });
  };

  const onCancel = () => {
    navigationRef.goBack();
  };
  return (
    <AppContainer isScroll={false} style={styles.container}>
      <AppHeader
        leftSection={
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        }
      />
      <Text style={styles.create_workplace}>Create Workplace</Text>
      <View style={styles.gap20}>
        <Controller
          control={control}
          name='workspace'
          rules={{ required: 'Workspace is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <AppTextInput label='Workspace' placeholder='Input your Workspace' value={value} onChangeText={onChange} />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </View>
          )}
        />
        <TouchableOpacity onPress={() => setOpenAddressSheet(true)}>
          <AppTextInput
            label='Location'
            readOnly
            rightSection={<ICONS.CORE.PIN_LOCATION fill={COLORS.blue[5]} />}
            value={getValues('location')?.name}
            onPressIn={() => setOpenAddressSheet(true)}
            showSoftInputOnFocus={false}
          />
        </TouchableOpacity>
      </View>

      <AppButton
        label='Create'
        onPress={handleSubmit(onSubmit)}
        buttonContainerStyle={{
          position: 'absolute',
          width: '100%',
          bottom: vs(40),
          alignSelf: 'center',
        }}
        disable={!isDirty}
      />
      <AddressBottomSheet
        opened={openAddressSheet}
        onClose={() => setOpenAddressSheet(false)}
        onCallback={(value) => setValue('location', value)}
      />
    </AppContainer>
  );
};
export default CreateWorkplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    backgroundColor: COLORS.white[1],
  },
  cancel: {
    ...FONTS.R17,
    color: COLORS.blue[5],
  },
  create_workplace: {
    ...FONTS.B34,
    color: COLORS.blue[1],
    marginBottom: vs(31),
    marginTop: vs(18),
  },
  gap20: {
    gap: 20,
  },
  error: {
    ...FONTS.R12,
    color: COLORS.red[1],
    marginTop: vs(4),
  },
});
