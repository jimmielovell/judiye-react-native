import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BottomTabBar from 'screens/main/bottom-tab';
import HomeNavigator from './home';
import ChatNavigator from './chat';
import DiscoverNavigator from './discover';
import CalendarNavigator from './calendar';
import {useCallback} from 'react';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  const _TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar {...props} />,
    [],
  );
  return (
    <Tab.Navigator tabBar={_TabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen name="Discover" component={DiscoverNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
    </Tab.Navigator>
  );
}
