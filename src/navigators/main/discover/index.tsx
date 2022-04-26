import {createNativeStackNavigator} from '@react-navigation/native-stack';
import wrapper from 'hoc/wrapper';
import {DiscoverHeader, DiscoverScreen} from '../../../screens/main/discover';

const Stack = createNativeStackNavigator();

const HighlightNavigator = wrapper(() => {
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
});

export default HighlightNavigator;
