import {forwardRef} from 'react';
import {Text} from 'react-native';
import {TextProps} from '../types';
import PText from '../ptext';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';

export const TextError = wrapper(
  forwardRef<Text, TextProps>((props: TextProps, ref) => {
    const {colors} = useTheme();
    return <PText ref={ref} color={colors.errorText} {...props} />;
  }),
);

export const TextLink = wrapper(
  forwardRef<Text, TextProps>((props: TextProps, ref) => {
    const {colors} = useTheme();
    return <PText ref={ref} color={colors.linkText} {...props} />;
  }),
);

export const ScreenTitle = wrapper(
  forwardRef<Text, TextProps>((props: TextProps, ref) => {
    return <PText ref={ref} size={20} weight="700" {...props} />;
  }),
);
