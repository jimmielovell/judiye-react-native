import {StatusBar, useColorScheme} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorBoundary from 'hoc/error-boundary';
import Navigator from 'navigators';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        backgroundColor="#fff"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <SafeAreaProvider>
        <ErrorBoundary>
          <Navigator />
        </ErrorBoundary>
      </SafeAreaProvider>
    </>
  );
}
