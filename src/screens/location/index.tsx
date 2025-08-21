import AppAddressDropdown from '@/components/AppAddressDropdown';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppHeader from '@/components/AppHeader';
import { createWorkspace } from '@/firebase/workspace.firebase';
import { TSearchResult } from '@/hooks/useSearchLocation';
import { uuid } from '@/hooks/uuid';
import { navigationRef } from '@/navigation';
import { addWorkspace } from '@/redux/slices/AppSlice';
import { RootState } from '@/redux/store';
import { COLORS } from '@/utils/theme/colors';
import { ICONS } from '@/utils/theme/icons';
import { TAppNavigation } from '@/utils/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import BottomLocation from './components/BottomLocation';

type Props = NativeStackScreenProps<TAppNavigation, 'Location'>;
const LocationScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const { brandname, account } = useSelector((state: RootState) => state.app);
  const workspace = route.params?.workspace || '';
  const location = route.params?.location;
  const [curLocation, setCurLocation] = useState<TSearchResult | undefined>(undefined);
  const onGoBack = () => {
    navigationRef.navigate('Main', { screen: 'Employee' });
  };
  const onCreateWorkspace = () => {
    const id = uuid();
    dispatch(
      addWorkspace({
        name: workspace,
        accountId: account?.id || '',
        address: curLocation?.display_name || '',
        brandname,
        id,
        latitude: curLocation?.lat ? +curLocation.lat : 0,
        longitude: curLocation?.lon ? +curLocation.lon : 0,
      }),
    );
    createWorkspace({
      name: workspace,
      accountId: account?.id || '',
      address: curLocation?.display_name || '',
      brandname,
      id,
      latitude: curLocation?.lat ? +curLocation.lat : 0,
      longitude: curLocation?.lon ? +curLocation.lon : 0,
    });
    Toast.show({
      type: 'success',
      text1: 'Workspace created successfully',
    });
    navigation.popTo('Main', { screen: 'Employee' });
  };
  useEffect(() => {
    if (location) {
      setCurLocation(location);
    }
  }, [location]);
  return (
    <AppContainer isScroll={false} style={styles.container}>
      <AppHeader isGoBack backColor={COLORS.blue[1]} onBackPress={onGoBack} title='Location' />
      <View style={styles.body}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: curLocation?.lat ? +curLocation.lat : 37.78825,
            longitude: curLocation?.lon ? +curLocation.lon : -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {curLocation && (
            <Marker
              coordinate={{
                latitude: +curLocation.lat,
                longitude: +curLocation.lon,
              }}
              title='Selected Location'
              description={curLocation?.display_name || ''}
            />
          )}
        </MapView>
        <View style={styles.search}>
          <AppAddressDropdown
            textProps={{
              placeholder: '966 Glen Ellyn Rd',
              leftSection: <ICONS.CORE.PIN_LOCATION />,
              containerInputStyle: {
                gap: 8,
              },
            }}
            isClosable
            onCallback={(value) => setCurLocation(value)}
          />
        </View>
      </View>
      <BottomLocation address={curLocation?.display_name} onSubmit={onCreateWorkspace} />
    </AppContainer>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    position: 'relative',
  },
  search: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
});
