import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignupScreen, OnboardScreen} from 'screens/auth/signup';
import wrapper from 'hoc/wrapper';

const Stack = createNativeStackNavigator();

const SignupNavigator = wrapper(() => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Onboard" component={OnboardScreen} />
    </Stack.Navigator>
  );
});

export default SignupNavigator;
