import AppLoading from '@/components/AppLoading';
import AppNavigation from '@/navigation';
import store, { persistor } from '@/redux/store';
import React from 'react';
import { Host } from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <Host>
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <AppNavigation />
          <Toast />
        </PersistGate>
      </Provider>
    </Host>
  );
};

export default App;
