import AppButton from '@/components/AppButton/AppButton';
import { WIDTH } from '@/constants/device.constants';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, View } from 'react-native';

type TBottomLocation = {
  address?: string;
  onSubmit?: () => void;
};
const BottomLocation = ({ address, onSubmit }: TBottomLocation) => {
  return (
    <View style={styles.container}>
      <Text style={[FONTS.M17, { color: COLORS.blue[1] }]}>Your Workplace</Text>
      <View style={styles.address}>
        <ICONS.CORE.PIN_LOCATION fill={COLORS.blue[1]} />
        {address && (
          <Text textBreakStrategy='balanced' style={styles.label}>
            {address}
          </Text>
        )}
      </View>

      <AppButton label='Submit' onPress={onSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white[1],
    width: WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4, // negative height gives shadow above
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4, // for Android
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: s(20),
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(16),
    marginBottom: vs(20),
    gap: s(12),
  },
  label: {
    ...FONTS.R17,
    color: COLORS.blue[1],
    maxWidth: '90%',
    lineHeight: vs(20),
  },
});

export default BottomLocation;
