import AppTextInput, { AppTextInputProps } from '@/components/AppTextInput/AppTextInput';
import { COLORS } from '@/utils/theme/colors';
import { s, vs } from '@/utils/theme/responsive';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import FormMessage from '../form-message/FormMessage';

export type FormInputProps<T extends FieldValues> = Pick<UseControllerProps<T>, 'name' | 'control'> &
  AppTextInputProps & {
    formatStringFunction?: (value: string) => string; // format phone number
    withCharCount?: boolean;
  };

const FormInput = <T extends FieldValues>({
  name,
  control,
  formatStringFunction,
  containerInputStyle,
  ...props
}: FormInputProps<T>) => {
  if (!control) return null;

  const { multiline } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
        <View style={styles.container}>
          <AppTextInput
            value={formatStringFunction ? formatStringFunction(value) : value}
            onChangeText={(val) => onChange(val)}
            //onBlur={onBlur}
            containerInputStyle={[
              multiline && styles.multiline, // apply multiline style
              fieldError && { borderColor: COLORS.red[1], borderWidth: s(0.5) }, // apply red border on error
              containerInputStyle, // allow external override
            ]}
            {...props}
          />
          <FormMessage message={fieldError?.message} variant={'error'} containerStyle={{ marginTop: 0 }} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: vs(8),
  },
  charCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
  },

  multiline: {
    height: vs(128),
    alignItems: 'flex-start',
  },
});
export default FormInput;
