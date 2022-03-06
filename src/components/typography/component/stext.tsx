import {forwardRef} from 'react';
import {Text} from 'react-native';
import {CTextProps} from '../types';
import PText from './ptext';
import {useForwardedRef, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';

const SText = wrapper(
  forwardRef<Text, CTextProps>((props: CTextProps, ref) => {
    const textRef = useForwardedRef(ref);
    const {colors} = useTheme();
    return <PText ref={textRef} color={colors.textSecondary} {...props} />;
  }),
);

export default SText;
