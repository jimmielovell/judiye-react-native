import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeHeader, HomeScreen} from 'screens/main/home';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: props => <HomeHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
