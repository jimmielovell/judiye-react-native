import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from 'theme';
import AuthNavigator from './auth';
import MainNavigator from './main';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    // @ts-ignore
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="MainNavigator"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
