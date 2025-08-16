import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { s, vs } from '@/utils/theme/responsive';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardItem from './CardItem';

type TCard = {
  workplace: string;
  onAddEmployee?: () => void;
};
const Card = ({ workplace, onAddEmployee }: TCard) => {
  const isEmployee = true;
  const isDownload = false;
  return (
    <View style={styles.overall}>
      <View style={styles.container}>
        <Text style={[FONTS.M19, { color: COLORS.blue[1] }]}>{workplace}</Text>
        <View style={styles.actions}>
          {isEmployee && (
            <TouchableOpacity onPress={onAddEmployee}>
              <ICONS.CORE.DOWNLOAD color={isDownload ? COLORS.blue[5] : COLORS.blue[3]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onAddEmployee}>
            <ICONS.CORE.ADD_EMPLOYEE />
          </TouchableOpacity>
        </View>
      </View>
      {isEmployee && <CardItem id='1' name='John Doe' role='Software Engineer' status='Working' />}
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(24),
  },
  overall: {
    backgroundColor: COLORS.white[1],
    borderRadius: s(8),
    padding: s(16),
    gap: vs(16),
  },
});
