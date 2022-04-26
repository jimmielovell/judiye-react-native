import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './auth';
import MainNavigator from './main';
import wrapper from 'hoc/wrapper';

const Stack = createNativeStackNavigator();

const Navigator = wrapper(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
});

export default Navigator;
