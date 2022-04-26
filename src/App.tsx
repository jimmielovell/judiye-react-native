import {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from 'hoc/error-boundary';
import wrapper from 'hoc/wrapper';
import {DarkTheme, DefaultTheme} from 'theme';
import Navigator from 'navigators';

const App = wrapper(() => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <StatusBar
          backgroundColor="#fff"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <ErrorBoundary>
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <Navigator />
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

export default App;
