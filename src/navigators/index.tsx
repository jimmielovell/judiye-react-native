import {NavigationContainer} from '@react-navigation/native';
import wrapper from 'hoc/wrapper';
import {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {useStore} from 'store';
import {DarkTheme, DefaultTheme} from 'theme';
import AuthNavigator from './auth';
import MainNavigator from './main';

const Navigator = wrapper(function Navigator() {
  const isDarkMode = useColorScheme() === 'dark';
  const {auth} = useStore();

  const _Navigator = useMemo(() => {
    return auth.loggedIn ? MainNavigator : AuthNavigator;
  }, [auth.loggedIn]);

  return (
    // @ts-ignore
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <_Navigator />
    </NavigationContainer>
  );
});

export default Navigator;
