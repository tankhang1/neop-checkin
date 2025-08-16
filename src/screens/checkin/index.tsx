import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { IMAGES } from '@/utils/theme/images';
import { mvs, s, vs } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const index = () => {
  return (
    <AppContainer isScroll={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerCont}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: s(8) }}>
              <ICONS.CORE.LOGOUT />
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <ICONS.CORE.CLOCK />
            </TouchableOpacity>
          </View>

          <Text style={{ ...FONTS.B36, color: COLORS.blue[1], lineHeight: mvs(48) }}>Check In</Text>
          <Text style={{ ...FONTS.R17, color: COLORS.blue[1], textAlign: 'center', marginVertical: vs(48) }}>
            Scan QR code to Check In
          </Text>

          <Image source={IMAGES.ILLUSTARTIONS.CHECKIN} style={styles.image} />
        </View>
      </ScrollView>
      <AppButton buttonContainerStyle={styles.buttonCont} label='Scan' onPress={() => navigationRef.navigate('TimeRunning')} />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white[1],
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(12),
  },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(16),
  },
  buttonCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingBottom: vs(58),
  },
  image: {
    width: 324,
    height: 300,
    alignSelf: 'center',
  },
});
export default index;
