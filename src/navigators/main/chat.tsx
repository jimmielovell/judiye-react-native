import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatsHeader, ChatsScreen} from 'screens/main/chats';

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="ChatScreen"
        component={ChatsScreen}
        options={{
          headerShown: true,
          header: props => <ChatsHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
