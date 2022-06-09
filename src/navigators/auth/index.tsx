import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigator from './login';
import SignupNavigator from './signup';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginNavigator} />
      <Stack.Screen name="Signup" component={SignupNavigator} />
    </Stack.Navigator>
  );
}
