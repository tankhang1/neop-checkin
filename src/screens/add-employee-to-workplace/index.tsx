import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppRadio from '@/components/AppRadio';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { WIDTH } from '@/constants/device.constants';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddEmployeeToWorkplaceScreen = () => {
  const onGoBack = () => {
    console.log('Go back pressed');
    navigationRef.goBack();
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
          <AppTextInput label='Name' placeholder='Nam Phan' />
          <AppTextInput label='Email' placeholder='namphan@gmail.com' />
          <AppTextInput label='Phone number' placeholder='0123456789' />
          <View>
            <Text style={[FONTS.R17, { marginBottom: vs(8) }]}>Position</Text>
            <View style={styles.radio_group}>
              <View style={styles.flex}>
                <AppRadio label='Staff' />
              </View>
              <View style={styles.flex}>
                <AppRadio label='Manager' />
              </View>
            </View>
          </View>
        </View>
      </AppContainer>
      <AppButton
        label='Add'
        onPress={onGoBack}
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
    paddingTop: vs(10),
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
  buttonContainer: {
    position: 'absolute',
    bottom: vs(20),
    width: '100%',
  },
  mt32: {
    marginTop: vs(32),
  },
});
