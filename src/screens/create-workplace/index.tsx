import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InteractionManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = NativeStackScreenProps<TAppNavigation, 'CreateWorkplace'>;
const CreateWorkplaceScreen = ({ navigation }: Props) => {
  const onLocation = () => {
    InteractionManager.runAfterInteractions(() => {
      navigation.replace('Location');
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
        <AppTextInput label='Workplace' placeholder='Input your Workplace' />
        <AppTextInput label='Location' rightSection={<ICONS.CORE.PIN_LOCATION fill={COLORS.blue[5]} />} />
      </View>

      <AppButton
        label='Create'
        onPress={onLocation}
        buttonContainerStyle={{
          position: 'absolute',
          width: '100%',
          bottom: vs(40),
          alignSelf: 'center',
        }}
      />
    </AppContainer>
  );
};
export default CreateWorkplaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: vs(10),
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
  },
  gap20: {
    gap: 20,
  },
});
