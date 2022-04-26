import {createNativeStackNavigator} from '@react-navigation/native-stack';
import wrapper from 'hoc/wrapper';
import {HomeHeader, HomeScreen} from 'screens/main/home';

const Stack = createNativeStackNavigator();

const HomeNavigator = wrapper(() => {
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
});

export default HomeNavigator;
