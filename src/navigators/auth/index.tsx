import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  VerifyOtpScreen,
  AuthStackParamList,
  SignupScreen,
  OnboardScreen,
} from 'screens/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
    </Stack.Navigator>
  );
}
