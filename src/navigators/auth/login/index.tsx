import {createNativeStackNavigator} from '@react-navigation/native-stack';
import wrapper from 'hoc/wrapper';
import {EmailScreen, PhoneScreen, OtpVerifyScreen} from 'screens/auth/login';

const Stack = createNativeStackNavigator();

const LoginNavigator = wrapper(() => {
  return (
    <Stack.Navigator
      initialRouteName="LoginByPhone"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginByPhone" component={PhoneScreen} />
      <Stack.Screen name="LoginByEmail" component={EmailScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
    </Stack.Navigator>
  );
});

export default LoginNavigator;
