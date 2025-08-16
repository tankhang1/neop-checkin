import React from 'react';
import AppNavigation from '@/navigation';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppLoading from '@/components/AppLoading';
import { Host } from 'react-native-portalize';
const App = () => {
  return (
    <Host>
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </Host>
  );
};

export default App;
