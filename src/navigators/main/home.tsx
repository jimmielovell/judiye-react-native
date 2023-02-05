import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {HomeHeader, HomeScreen} from 'screens/main/home';
import '@react-navigation/elements';
import ColleaguesScreen, {
  ColleaguesHeader,
} from 'screens/main/home/screen.colleagues';
import ConnectScreen, {ConnectHeader} from 'screens/main/home/screen.connect';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  const _HomeHeader = useCallback(
    (props: NativeStackHeaderProps) => <HomeHeader {...props} />,
    [],
  );
  const _ColleaguesHeader = useCallback(
    (props: NativeStackHeaderProps) => <ColleaguesHeader {...props} />,
    [],
  );
  const _ConnectHeader = useCallback(
    (props: NativeStackHeaderProps) => <ConnectHeader {...props} />,
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: _HomeHeader,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ColleaguesScreen"
        component={ColleaguesScreen}
        options={{
          header: _ColleaguesHeader,
          headerShown: true,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ConnectScreen"
        component={ConnectScreen}
        options={{
          header: _ConnectHeader,
          headerShown: true,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
}
