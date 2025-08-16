import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-portalize';

const AppLoading = () => {
  return (
    <Portal>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3768EC" />
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoading;
