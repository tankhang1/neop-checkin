import AppButton from '@/components/AppButton/AppButton';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppDivider from '@/components/AppDivider/AppDivider';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { height, s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TimeRunningScreen = () => {
  return (
    <AppContainer isScroll={false}>
      <View style={styles.headerCont}>
        <TouchableOpacity style={{ opacity: 0 }}>
          <ICONS.CORE.CLOCK />
        </TouchableOpacity>
        <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>Working</Text>
        <TouchableOpacity>
          <ICONS.CORE.CLOCK />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.avatarCont}>
            <Image
              source={{
                uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8',
              }}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
            <TouchableOpacity style={styles.cameraCont}>
              <ICONS.CORE.CAMERA />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginBottom: vs(24) }}>
            <Text style={{ ...FONTS.M17, color: COLORS.blue[1], marginBottom: vs(12) }}>Hugo B. Zigler</Text>
            <Text style={{ ...FONTS.R17, color: COLORS.blue[2], marginBottom: vs(8) }}>hugobzigler@gmail.com</Text>
            <Text style={{ ...FONTS.R17, color: COLORS.blue[2], marginBottom: vs(16) }}>310-919-4467</Text>
            <TouchableOpacity
              onPress={() => {
                navigationRef.navigate('EditProfile');
              }}>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[5] }}>Edit profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalCont}>
            <View style={styles.modalTitle}>
              <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>Apr 25, 2025</Text>
              <Text style={{ ...FONTS.B34, color: COLORS.blue[1] }}>03 : 45</Text>
            </View>

            <AppDivider style={{ width: width - THEME.PADDING_HORIZONTAL, marginBottom: vs(8) }} />

            <View style={styles.row}>
              <ICONS.CORE.MAP_PIN />
              <View style={{ flex: 1, gap: vs(8) }}>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Working at</Text>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>966 Glen Ellyn, Illinois 60137, USA</Text>
              </View>
            </View>

            <View style={styles.row}>
              <ICONS.CORE.CLOCK_RIGHT />
              <View style={{ flex: 1, gap: vs(8) }}>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[2] }}>Start time</Text>
                <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>08 : 55</Text>
              </View>
            </View>

            <AppButton
              buttonContainerStyle={{ width: width - THEME.PADDING_HORIZONTAL * 2, marginVertical: vs(47) }}
              buttonStyle={{ backgroundColor: '#DF6D14' }}
              label='Check Out'
              onPress={() => {
                navigationRef.navigate('EmployeeHistory');
              }}
            />
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
  },
  headerCont: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vs(12),
    backgroundColor: COLORS.white[1],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, // negative height gives shadow above
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // for Android
    zIndex: 10,
  },
  body: {
    flex: 1,
    backgroundColor: '#EBF2E8',
    alignItems: 'center',
  },
  avatarCont: {
    marginTop: vs(32),
    marginBottom: vs(16),
    borderRadius: 100,
    alignSelf: 'center',
  },
  cameraCont: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white[1],
    borderRadius: 100,
    width: s(32),
    height: s(32),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1, // negative height gives shadow above
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4, // for Android
  },
  modalCont: {
    backgroundColor: COLORS.white[1],
    flex: 1,
    borderTopLeftRadius: s(12),
    borderTopRightRadius: s(12),
    height: height * 0.6,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // negative height since it's at the top
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 6,

    width: width,
    //paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
    alignItems: 'center',
  },
  modalTitle: {
    alignItems: 'center',
    gap: vs(16),
    marginBottom: vs(24),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: s(23),
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
  },
});
export default TimeRunningScreen;
