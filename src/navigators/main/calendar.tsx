import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CalendarHeader, CalendarScreen} from 'screens/main/calendar';

const Stack = createNativeStackNavigator();

export default function CalendarNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CalendarScreen"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerShown: true,
          header: props => <CalendarHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
