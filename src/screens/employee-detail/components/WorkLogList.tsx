import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { vs } from '@/utils/theme/responsive';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

type TWorkLog = {
  date: string;
  checkIn?: string;
  checkOut?: string;
  isActive: boolean;
};

const data = {
  thisWeek: [
    { date: 'Apr 24, 2025', checkIn: '08:57', checkOut: '17:00' },
    { date: 'Apr 23, 2025', checkIn: '09:03', checkOut: '17:05' },
    { date: 'Apr 22, 2025', checkIn: '09:01', checkOut: '17:02' },
    { date: 'Apr 21, 2025', checkIn: '08:56', checkOut: '17:03' },
  ],
  lastWeek: [
    { date: 'Apr 18, 2025', checkIn: '08:55', checkOut: '17:05' },
    { date: 'Apr 17, 2025' }, // Off
    { date: 'Apr 16, 2025', checkIn: '09:03', checkOut: '17:05' },
    { date: 'Apr 15, 2025', checkIn: '09:01', checkOut: '17:02' },
    { date: 'Apr 14, 2025', checkIn: '08:56', checkOut: '17:03' },
  ],
};

const WorkLogCard = ({ date, checkIn, checkOut, isActive }: TWorkLog) => (
  <View style={[styles.item, !isActive && { borderBottomWidth: 0 }]}>
    <Text style={styles.date}>{date}</Text>
    {checkIn && checkOut ? (
      <View style={styles.timeRow}>
        <Text style={[styles.time]}>{checkIn}</Text>
        <Text style={styles.to}>To</Text>
        <Text style={[styles.time]}>{checkOut}</Text>
      </View>
    ) : (
      <Text style={[styles.off]}>Off</Text>
    )}
  </View>
);

const WorkLogList = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* This week */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This week</Text>
          <FlatList
            data={data.thisWeek}
            keyExtractor={(item, index) => 'thisWeek-' + index}
            renderItem={({ item, index }) => <WorkLogCard {...item} isActive={data.thisWeek.length - 1 !== index} />}
          />
        </View>

        {/* Last week */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last week</Text>
          <FlatList
            data={data.lastWeek}
            keyExtractor={(item, index) => 'lastWeek-' + index}
            renderItem={({ item, index }) => <WorkLogCard {...item} isActive={data.lastWeek.length - 1 !== index} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    backgroundColor: COLORS.white[1],
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    ...FONTS.M17,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vs(11),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue[3],
  },
  date: {
    ...FONTS.R17,
    color: COLORS.blue[1],
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    ...FONTS.R17,
    color: '#3A7D44',
  },
  to: {
    marginHorizontal: 6,
    ...FONTS.R17,
    color: COLORS.blue[2],
  },
  off: {
    ...FONTS.R17,
    color: '#DF6D14',
  },
});

export default WorkLogList;
