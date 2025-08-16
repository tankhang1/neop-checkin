import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { mvs, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CreateEmployeeScreen = () => {
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
            <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(40) }}>{`Create\nyour profile`}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: THEME.PADDING_HORIZONTAL, paddingBottom: vs(58) }}>
        <AppButton label='Register' />
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
});

export default CreateEmployeeScreen;
