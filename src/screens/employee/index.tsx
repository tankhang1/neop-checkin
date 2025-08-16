import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { IMAGES } from '@/utils/theme/images';
import { s, vs } from '@/utils/theme/responsive';
import { Image, StyleSheet, Text, View } from 'react-native';

const EmployeeScreen = () => {
  return (
    <AppContainer style={styles.container}>
      <AppHeader isGoBack />
      <View style={styles.body}>
        <Text style={[FONTS.B34]}>Employees</Text>
        <View style={styles.empty_body}>
          <Image source={IMAGES.ILLUSTARTIONS.WORKSPACE} style={styles.image} />
          <Text style={styles.empty_text}>Create your first workplace</Text>
          <AppButton label='Create Workplace' buttonContainerStyle={styles.empty_button} />
        </View>
      </View>
    </AppContainer>
  );
};
export default EmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
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
});
