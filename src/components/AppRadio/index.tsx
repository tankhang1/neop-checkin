import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TAppRadio = {
  label: string;
  checked?: boolean;
  onPress?: (checked: boolean) => void;
};
const AppRadio = ({ label, checked = false, onPress }: TAppRadio) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(!checked)}>
      <View style={styles.radio_container}>
        <View style={[styles.radio, checked && { borderColor: COLORS.blue[5] }]}>
          {checked && <View style={styles.radio_active} />}
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
export default AppRadio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio_container: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.blue[1],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio_active: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.blue[5],
  },
  radioSelected: {
    backgroundColor: COLORS.blue[1],
  },
  label: {
    ...FONTS.R17,
    color: COLORS.blue[1],
  },
});
