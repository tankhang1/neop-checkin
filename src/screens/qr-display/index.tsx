import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppDivider from '@/components/AppDivider/AppDivider';
import AppSegmentControl from '@/components/AppSegmentControl/AppSegmentControl';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { height, s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

enum OPTION_ENUM {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  QR_DISPLAY = 'QR_DISPLAY',
}
const options = [
  {
    label: 'Admin',
    key: OPTION_ENUM.ADMIN,
  },
  {
    label: 'Employee',
    key: OPTION_ENUM.EMPLOYEE,
  },
  {
    label: 'QR Display',
    key: OPTION_ENUM.QR_DISPLAY,
  },
];
const QrDisplayScreen = () => {
  // STATE
  const [selectedOption, setSelectedOption] = useState(OPTION_ENUM.QR_DISPLAY);

  return (
    <AppContainer>
      <ScrollView horizontal style={{ height: height * 0.4 }}>
        <View style={styles.imageCont}>
          <Image />
        </View>
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: height * 0.6 }}>
        <View style={styles.container}>
          <View style={styles.logoCont}>
            <ICONS.LOGO.MD />
          </View>
          <Text style={{ ...FONTS.R17, color: COLORS.blue[1], textAlign: 'center' }}>Scan to display Check In QRcode</Text>
          <AppButton label='Scan' buttonContainerStyle={{ marginVertical: vs(32) }} onPress={() => {}} />
          <View style={styles.middleButtonCont}>
            <AppDivider variant='horizontal' style={{ flex: 1 }} />
            <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>You are</Text>
            <AppDivider variant='horizontal' style={{ flex: 1 }} />
          </View>
          <AppSegmentControl
            selectedOption={selectedOption}
            options={options}
            onChange={(val) => setSelectedOption(val as OPTION_ENUM)}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
  },
  logoCont: {
    marginVertical: vs(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButtonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(23),
    marginBottom: vs(32),
  },
  imageCont: {
    width: width,
  },
});
export default QrDisplayScreen;
