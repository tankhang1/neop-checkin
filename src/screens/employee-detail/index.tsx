import AppHeader from '@/components/AppHeader';
import { COLORS } from '@/utils/theme/colors';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileCard from './components/ProfileCard';
import WorkLogList from './components/WorkLogList';

const EmployeeDetailScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AppHeader
        isGoBack
        title='Hugo B. Zigler'
        rightSection={
          <View style={[styles.rows, styles.pr20]}>
            <TouchableOpacity>
              <ICONS.CORE.CALENDAR />
            </TouchableOpacity>
            <TouchableOpacity>
              <ICONS.CORE.DELETE />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.body}>
        <ProfileCard />
        <WorkLogList />
      </View>
    </View>
  );
};

export default EmployeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white[1],
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(20),
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.green[1],
    paddingHorizontal: s(20),
    paddingTop: vs(16),
    gap: vs(16),
  },
  pr20: {
    paddingRight: s(20),
  },
});
