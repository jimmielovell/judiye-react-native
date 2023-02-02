import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import ErrorBoundary from 'hoc/error-boundary';
import Navigator from 'navigators';
import {initializeStore, StoreContext} from 'store';

function Root() {
  // Determine from user app preferrence, if it's system
  // Determine from user system preferrence
  const isDarkMode = useColorScheme() === 'dark';
  const store = initializeStore();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreContext.Provider value={store}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Navigator />
        </SafeAreaProvider>
      </StoreContext.Provider>
    </GestureHandlerRootView>
  );
}

export default Root;
