import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ErrorBoundary from 'hoc/error-boundary';
import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';

const App = wrapper(() => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar
          backgroundColor="#fff"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <ErrorBoundary>
          <Frame />
        </ErrorBoundary>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

export default App;
