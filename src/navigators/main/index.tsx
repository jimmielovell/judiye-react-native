import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from 'screens/main/bottom-tab';
import HomeNavigator from './home';
import ConnectNavigator from './connect';
import ChatNavigator from './chat';
import DiscoverNavigator from './discover';
import wrapper from 'hoc/wrapper';

const Tab = createBottomTabNavigator();

const MainNavigator = wrapper(() => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Discover" component={DiscoverNavigator} />
      <Tab.Screen name="Connect" component={ConnectNavigator} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
    </Tab.Navigator>
  );
});

export default MainNavigator;
