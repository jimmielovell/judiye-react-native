import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type LoginStackParamList = {
  LoginByEmail: undefined;
  LoginByPhone: undefined;
  OtpVerify: {
    value: string;
    type: string;
  };
};

type EmailScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'LoginByEmail'
>;
type PhoneScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'LoginByPhone'
>;
type OtpVerifyScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'OtpVerify'
>;

export type {
  LoginStackParamList,
  EmailScreenProps,
  PhoneScreenProps,
  OtpVerifyScreenProps,
};
