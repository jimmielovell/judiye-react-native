import {useCallback} from 'react';
import {Platform} from 'react-native';
import {
  BottomTabBarProps,
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import BottomTabBar from 'screens/main/bottom-tab';

import {
  CalendarHeader,
  CalendarScreen,
  ColleaguesHeader,
  ColleaguesScreen,
  ConnectHeader,
  ConnectScreen,
  HomeHeader,
  HomeScreen,
} from 'screens/main/home';
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
  NotificationsHeader,
  NotificationsScreen,
} from 'screens/main/notifications';
import {ProfileDrawer} from 'screens/main/profile';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const _TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar {...props} />,
    [],
  );
  const _HomeHeader = useCallback(
    (props: BottomTabHeaderProps) => <HomeHeader {...props} />,
    [],
  );
  const _NotificationsHeader = useCallback(
    (props: BottomTabHeaderProps) => <NotificationsHeader {...props} />,
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
        name="Discover"
        component={DiscoverScreen}
        options={{
          header: _DiscoverHeader,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Bell"
        component={NotificationsScreen}
        options={{
          header: _NotificationsHeader,
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

function MainDrawer() {
  const _DrawerContent = useCallback(
    (props: DrawerContentComponentProps) => <ProfileDrawer {...props} />,
    [],
  );

  return (
    <Drawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.3)',
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        drawerStyle: {
          width: '80%',
        },
        lazy: true,
      }}
      initialRouteName="MainTabs"
      drawerContent={_DrawerContent}>
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default function MainStack() {
  const platform = Platform.OS;

  const _ColleaguesHeader = useCallback(
    (props: NativeStackHeaderProps) => <ColleaguesHeader {...props} />,
    [],
  );
  const _ConnectHeader = useCallback(
    (props: NativeStackHeaderProps) => <ConnectHeader {...props} />,
    [],
  );
  const _CalendarHeader = useCallback(
    (props: NativeStackHeaderProps) => <CalendarHeader {...props} />,
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
        component={MainDrawer}
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
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{
            header: _CalendarHeader,
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
            presentation: platform === 'ios' ? 'fullScreenModal' : 'modal',
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
            presentation: platform === 'ios' ? 'fullScreenModal' : 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
