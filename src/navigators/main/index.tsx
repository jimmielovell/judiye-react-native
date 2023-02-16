import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomTabBar from 'screens/main/bottom-tab';
import {useCallback} from 'react';
import {HomeHeader, HomeScreen} from 'screens/main/home';
import {CalendarHeader, CalendarScreen} from 'screens/main/calendar';
import {
  DiscoverHeader,
  DiscoverScreen,
  NewPostHeader,
  NewPostScreen,
  ViewPostHeader,
  ViewPostScreen,
} from 'screens/main/discover';
import {
  ChatsHeader,
  ChatsScreen,
  InboxHeader,
  InboxScreen,
  NewChatHeader,
  NewChatScreen,
} from 'screens/main/chats';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import ColleaguesScreen, {
  ColleaguesHeader,
} from 'screens/main/home/screen.colleagues';
import ConnectScreen, {ConnectHeader} from 'screens/main/home/screen.connect';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const _TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar {...props} />,
    [],
  );
  const _HomeHeader = useCallback(
    (props: BottomTabHeaderProps) => <HomeHeader {...props} />,
    [],
  );
  const _CalendarHeader = useCallback(
    (props: BottomTabHeaderProps) => <CalendarHeader {...props} />,
    [],
  );
  const _DiscoverHeader = useCallback(
    (props: BottomTabHeaderProps) => <DiscoverHeader {...props} />,
    [],
  );
  const _ChatsHeader = useCallback(
    (props: BottomTabHeaderProps) => <ChatsHeader {...props} />,
    [],
  );
  return (
    <Tab.Navigator tabBar={_TabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: _HomeHeader,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          header: _CalendarHeader,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          header: _DiscoverHeader,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatsScreen}
        options={{
          header: _ChatsHeader,
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  const _ColleaguesHeader = useCallback(
    (props: NativeStackHeaderProps) => <ColleaguesHeader {...props} />,
    [],
  );
  const _ConnectHeader = useCallback(
    (props: NativeStackHeaderProps) => <ConnectHeader {...props} />,
    [],
  );
  const _NewPostHeader = useCallback(
    (props: NativeStackHeaderProps) => <NewPostHeader {...props} />,
    [],
  );
  const _ViewPostHeader = useCallback(
    (props: NativeStackHeaderProps) => <ViewPostHeader {...props} />,
    [],
  );
  const _NewChatHeader = useCallback(
    (props: NativeStackHeaderProps) => <NewChatHeader {...props} />,
    [],
  );
  const _InboxHeader = useCallback(
    (props: NativeStackHeaderProps) => <InboxHeader {...props} />,
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
        component={MainTabs}
        options={{headerShown: false}}
      />

      {/* Home */}
      <Stack.Group>
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
      </Stack.Group>

      {/* Discover */}
      <Stack.Group>
        <Stack.Screen
          name="NewPostScreen"
          component={NewPostScreen}
          options={{
            header: _NewPostHeader,
            headerShown: true,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="ViewPostScreen"
          component={ViewPostScreen}
          options={{
            header: _ViewPostHeader,
            headerShown: true,
            presentation: 'modal',
          }}
        />
      </Stack.Group>

      {/* Chats */}
      <Stack.Group>
        <Stack.Screen
          name="NewChatScreen"
          component={NewChatScreen}
          options={{
            header: _NewChatHeader,
            headerShown: true,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="InboxScreen"
          component={InboxScreen}
          options={{
            header: _InboxHeader,
            headerShown: true,
            presentation: 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
