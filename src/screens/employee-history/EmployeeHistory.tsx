import AppContainer from '@/components/AppContainer/AppContainer';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs, width } from '@/utils/theme/responsive';
import { THEME } from '@/utils/theme/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EmployeeHistory = () => {
  return (
    <AppContainer isScroll={false}>
      <View style={styles.headerCont}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigationRef.goBack();
          }}>
          <ICONS.CORE.CHERVON_LEFT fill={COLORS.blue[5]} />
          <Text style={[FONTS.R17, { color: COLORS.blue[5] }]}>Back</Text>
        </TouchableOpacity>
        <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>Working</Text>
        <TouchableOpacity>
          <ICONS.CORE.CLOCK />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>This week</Text>

              {[...Array(4)].map(() => (
                <View style={styles.cardRow}>
                  <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>Apr 24, 2025</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: s(12) }}>
                    <Text style={{ ...FONTS.R17, color: COLORS.green[2] }}>08 : 57</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.blue[3] }}>To</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.orange[1] }}>17 : 00</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>Last week</Text>

              {[...Array(4)].map(() => (
                <View style={styles.cardRow}>
                  <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>Apr 24, 2025</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: s(12) }}>
                    <Text style={{ ...FONTS.R17, color: COLORS.green[2] }}>08 : 57</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.blue[3] }}>To</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.orange[1] }}>17 : 00</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={{ ...FONTS.M17, color: COLORS.blue[1] }}>07/04/2025 - 12/04/2025</Text>

              {[...Array(4)].map(() => (
                <View style={styles.cardRow}>
                  <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>Apr 24, 2025</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: s(12) }}>
                    <Text style={{ ...FONTS.R17, color: COLORS.green[2] }}>08 : 57</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.blue[3] }}>To</Text>
                    <Text style={{ ...FONTS.R17, color: COLORS.orange[1] }}>17 : 00</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
    padding: s(16),
    width: width - THEME.PADDING_HORIZONTAL * 2,
    gap: vs(12),
  },
  content: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: vs(16),
    gap: vs(16),
  },
  cardRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
    paddingVertical: vs(12),
    flexDirection: 'row',
  },
  backButton: {
    paddingLeft: s(8),
    paddingVertical: vs(11),
    gap: s(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    color: COLORS.blue[5],
  },
});
export default EmployeeHistory;
