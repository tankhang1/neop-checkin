import AppContainer from '@/components/AppContainer/AppContainer';
import AppDropdown from '@/components/AppDropdown';
import AppHeader from '@/components/AppHeader';
import { navigationRef } from '@/navigation';
import { COLORS } from '@/utils/theme/colors';
import { ICONS } from '@/utils/theme/icons';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import BottomLocation from './components/BottomLocation';

const LocationScreen = () => {
  const onGoBack = () => {
    navigationRef.navigate('Main', { screen: 'Employee' });
  };
  return (
    <AppContainer isScroll={false} style={styles.container}>
      <AppHeader isGoBack backColor={COLORS.blue[1]} onBackPress={onGoBack} title='Location' />
      <View style={styles.body}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.search}>
          <AppDropdown
            textProps={{
              placeholder: '966 Glen Ellyn Rd',
              leftSection: <ICONS.CORE.PIN_LOCATION />,
              containerInputStyle: {
                gap: 8,
              },
              rightSection: <ICONS.CORE.X />,
            }}
          />
        </View>
      </View>
      <BottomLocation address='966 Glen Ellyn Rd' />
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
