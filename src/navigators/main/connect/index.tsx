import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ConnectHeader,
  ConnectScreen,
  DiscoverProfessionalsHeader,
  DiscoverProfessionalsScreen,
} from 'screens/main/connect';

const Stack = createNativeStackNavigator();

export default function ConnectNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Connect"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          headerShown: true,
          header: props => <ConnectHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="DiscoverProfessionals"
        component={DiscoverProfessionalsScreen}
        options={{
          headerShown: true,
          header: props => <DiscoverProfessionalsHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
