import { getEmployeeWorkList } from '@/firebase/workspace.firebase';
import { TWorklist } from '@/redux/slices/AppSlice';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { vs } from '@/utils/theme/responsive';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
dayjs.extend(isoWeek);

type TWorkLog = {
  date: string;
  checkIn?: string;
  checkOut?: string;
  isActive: boolean;
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

type TWorkLogList = {
  employeeId: string;
};
const WorkLogList = ({ employeeId }: TWorkLogList) => {
  const [listWorklist, setListWorklist] = useState<TWorklist[]>([]);
  const onGetWorkList = useCallback(async () => {
    const data = await getEmployeeWorkList(employeeId);
    setListWorklist(
      data
        .map((item) => ({
          ...item,
          //@ts-expect-error error
          dateIn: item.dateIn?.toDate(),
          //@ts-expect-error error
          dateOut: item.dateOut?.toDate(),
        }))
        .sort((a, b) => b.dateIn - a.dateIn), // Sort descending by dateIn
    );
  }, [employeeId]);
  const getWeekLabel = (value: Date) => {
    const date = dayjs(value);
    const now = dayjs();
    if (date.isoWeek() === now.isoWeek() && date.year() === now.year()) {
      return 'This week';
    }
    if (date.isoWeek() === now.subtract(1, 'week').isoWeek() && date.year() === now.subtract(1, 'week').year()) {
      return 'Last week';
    }
    const start = date.startOf('isoWeek').format('MMM DD');
    const end = date.endOf('isoWeek').format('MMM DD');
    return `${start} - ${end}`;
  };
  const groupByWeek = useMemo(() => {
    return listWorklist.reduce((acc, item) => {
      const weekLabel = getWeekLabel(item.dateIn);
      if (!acc[weekLabel]) {
        acc[weekLabel] = [];
      }
      acc[weekLabel].push({
        date: dayjs(item.dateIn).format('MMM DD, YYYY'),
        checkIn: dayjs(item.dateIn).format('HH:mm'),
        checkOut: item.dateOut ? dayjs(item.dateOut).format('HH:mm') : undefined,
        isActive: true,
      });
      return acc;
    }, {} as Record<string, TWorkLog[]>);
  }, [listWorklist]);
  useEffect(() => {
    onGetWorkList();
  }, [employeeId, onGetWorkList]);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* This week */}

        {Object.entries(groupByWeek).map(([weekLabel, workLogs]) => (
          <View key={weekLabel} style={styles.section}>
            <Text style={styles.sectionTitle}>{weekLabel}</Text>
            {workLogs.map((log, index) => (
              <WorkLogCard
                key={`${weekLabel}-${index}`}
                date={log.date}
                checkIn={log.checkIn}
                checkOut={log.checkOut}
                isActive={index !== workLogs.length - 1}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  section: {
    backgroundColor: COLORS.white[1],
    padding: 16,
    paddingBottom: 0,
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
