import AppButton from '@/components/AppButton/AppButton';
import AppHeader from '@/components/AppHeader';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from './components/Card';

const EmployeeScreen = () => {
  const insets = useSafeAreaInsets();
  const isEmpty = false; // This should be replaced with actual logic to check if there are employees
  const onCreateWorkplace = () => {
    navigationRef.navigate('CreateWorkplace');
  };
  const onAddEmployee = () => {
    Alert.alert('More Workplace', 'Connect to your account to create more workplaces', [
      { text: 'Cancel', style: 'default' },
      { text: 'Connect', style: 'default', onPress: () => navigationRef.navigate('AddEmployeeToWorkplace') },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <AppHeader
          isGoBack
          rightSection={
            !isEmpty ? (
              <TouchableOpacity style={{ paddingRight: s(14) }}>
                <ICONS.CORE.ADD_WORKPLACE fill={COLORS.blue[5]} />
              </TouchableOpacity>
            ) : null
          }
        />
        <View style={styles.search}>
          <Text style={[FONTS.B34, { marginBottom: vs(8) }]}>Employees</Text>
          <AppTextInput containerInputStyle={{ gap: s(8) }} leftSection={<ICONS.CORE.SEARCH />} placeholder='Search' />
        </View>
      </View>
      <View style={[styles.body, styles.pt16, { backgroundColor: COLORS.green[1] }]}>
        <Card workplace='Workplace 1' onAddEmployee={onAddEmployee} />
      </View>
      {isEmpty && (
        <View style={styles.body}>
          <Text style={[FONTS.B34]}>Employees</Text>
          <View style={styles.empty_body}>
            <Image source={IMAGES.ILLUSTARTIONS.WORKSPACE} style={styles.image} />
            <Text style={styles.empty_text}>Create your first workplace</Text>
            <AppButton onPress={onCreateWorkplace} label='Create Workplace' buttonContainerStyle={styles.empty_button} />
          </View>
        </View>
      )}
    </View>
  );
};
export default EmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    backgroundColor: COLORS.white[1],
  },
  header: {
    backgroundColor: COLORS.white[1],
    paddingBottom: vs(10),
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.white[1],
    paddingHorizontal: 20,
  },
  image: {
    width: s(320),
    height: vs(260),
    resizeMode: 'contain',
  },
  empty_body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_text: {
    ...FONTS.R17,
    color: COLORS.blue[1],
    marginTop: vs(32),
    marginBottom: vs(20),
  },
  empty_button: {
    width: '100%',
  },
  search: {
    gap: s(8),
    paddingHorizontal: s(14),
  },
  pt16: {
    paddingTop: vs(16),
  },
});
