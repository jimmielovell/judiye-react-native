import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useCallback} from 'react';
import {HomeHeader, HomeScreen} from 'screens/main/home';
import '@react-navigation/elements';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  const _HomeHeader = useCallback(
    (props: NativeStackHeaderProps) => <HomeHeader {...props} />,
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
    </Stack.Navigator>
  );
}
