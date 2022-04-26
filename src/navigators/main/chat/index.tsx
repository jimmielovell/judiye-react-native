import {createNativeStackNavigator} from '@react-navigation/native-stack';
import wrapper from 'hoc/wrapper';
import {
  ChatsHeader,
  ChatsScreen,
  InboxHeader,
  InboxScreen,
  ContactsHeader,
  ContactsScreen,
} from 'screens/main/chats';

const Stack = createNativeStackNavigator();

const ChatNavigator = wrapper(() => {
  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerShown: true,
          header: props => <ChatsHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          headerShown: true,
          header: props => <InboxHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          headerShown: true,
          header: props => <ContactsHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
});

export default ChatNavigator;
