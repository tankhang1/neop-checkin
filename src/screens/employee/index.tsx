import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { StyleSheet, Text, View } from 'react-native';

const EmployeeScreen = () => {
  return (
    <AppContainer style={styles.container}>
      <AppHeader isGoBack />
      <View style={styles.body}>
        <Text style={[FONTS.B34]}>Employees</Text>
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
});
