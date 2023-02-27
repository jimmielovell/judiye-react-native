import 'react-native-gesture-handler';
import {Platform, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import ErrorBoundary from 'hoc/error-boundary';
import Navigator from 'navigators';
import {initializeStore, StoreContext} from 'store';
import {useMemo} from 'react';

function Root() {
  // Determine from user app preferrence, if it's system
  // Determine from user system preferrence
  const store = initializeStore();

  const barStyle = useMemo(() => {
    // return store.getState().settings.theme === 'dark' ? 'light-content' : 'dark-content';
    if (Platform.OS === 'android') {
      return 'light-content';
    }

    return 'dark-content';
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreContext.Provider value={store}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#000000" barStyle={barStyle} />
          <Navigator />
        </SafeAreaProvider>
      </StoreContext.Provider>
    </GestureHandlerRootView>
  );
}

export default Root;
