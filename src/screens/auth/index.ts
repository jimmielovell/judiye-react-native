import VerifyOtpScreen, {VerifyOtpScreenParamList} from './screen.verify-otp';
import LoginScreen, {LoginScreenParamList} from './screen.login';
import SignupScreen, {SignupScreenParamList} from './screen.signup';
import OnboardScreen, {OnboardScreenParamList} from './screen.onboard';

export type AuthStackParamList = LoginScreenParamList &
  VerifyOtpScreenParamList &
  SignupScreenParamList &
  OnboardScreenParamList;

export {LoginScreen, VerifyOtpScreen, SignupScreen, OnboardScreen};
