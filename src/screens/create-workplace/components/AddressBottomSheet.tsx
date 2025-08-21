import AppBottomSheet from '@/components/AppBottomSheet';
import AppTextInput from '@/components/AppTextInput/AppTextInput';
import { TSearchResult, useSearchLocation } from '@/hooks/useSearchLocation';
import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { ICONS } from '@/utils/theme/icons';
import { vs } from '@/utils/theme/responsive';
import { useDeferredValue, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TAddressBottomSheet = {
  opened: boolean;
  onClose: () => void;
  onCallback?: (value: TSearchResult) => void;
};
const AddressBottomSheet = ({ opened, onClose, onCallback }: TAddressBottomSheet) => {
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const { searchLocation, loading, results } = useSearchLocation();
  const deferredSearch = useDeferredValue(search);
  const onSelect = (item: TSearchResult) => {
    onCallback?.(item);
    onClose();
  };
  const renderItem = ({ item }: ListRenderItemInfo<TSearchResult>) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
        <Text style={FONTS.M14}>{item.name}</Text>
        <Text style={FONTS.R12} numberOfLines={1}>
          {item.display_name}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    searchLocation(deferredSearch);
  }, [deferredSearch]);
  return (
    <AppBottomSheet visible={opened} onClose={onClose}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <AppTextInput
          placeholder='Input your Workspace'
          rightSection={<ICONS.CORE.PIN_LOCATION fill={COLORS.blue[5]} />}
          defaultValue={deferredSearch}
          onChangeText={setSearch}
        />
        <FlatList data={results} renderItem={renderItem} ListFooterComponent={loading ? <ActivityIndicator /> : null} />
      </View>
    </AppBottomSheet>
  );
};

export default AddressBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  item: {
    paddingVertical: vs(14),
    gap: vs(4),
  },
});
