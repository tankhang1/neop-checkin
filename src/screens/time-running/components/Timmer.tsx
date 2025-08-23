import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { vs } from '@/utils/theme/responsive';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Timer = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.modalTitle}>
      <Text style={{ ...FONTS.R17, color: COLORS.blue[1] }}>{time.format('MMM D, YYYY')}</Text>
      <Text style={{ ...FONTS.B34, color: COLORS.blue[1] }}>{time.format('HH:mm')}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  modalTitle: {
    alignItems: 'center',
    gap: vs(16),
    marginBottom: vs(24),
  },
});
