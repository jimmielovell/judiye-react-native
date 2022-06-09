import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignupScreen, OnboardScreen} from 'screens/auth/signup';

const Stack = createNativeStackNavigator();

export default function SignupNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Onboard" component={OnboardScreen} />
    </Stack.Navigator>
  );
}
