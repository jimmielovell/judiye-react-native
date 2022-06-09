import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EmailScreen,
  PhoneScreen,
  OtpVerifyScreen,
  LoginStackParamList,
} from 'screens/auth/login';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginByPhone"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="LoginByPhone" component={PhoneScreen} />
      <Stack.Screen name="LoginByEmail" component={EmailScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
    </Stack.Navigator>
  );
}
