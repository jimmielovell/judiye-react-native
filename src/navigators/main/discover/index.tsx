import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DiscoverHeader, DiscoverScreen} from '../../../screens/main/discover';

const Stack = createNativeStackNavigator();

export default function DiscoverNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Hightlight"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          headerShown: true,
          header: props => <DiscoverHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
