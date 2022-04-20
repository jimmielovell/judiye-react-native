import {forwardRef} from 'react';
import {Platform, Text, TextStyle} from 'react-native';
import {TextProps} from '../types';
import {useFontSize, useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import Animated from 'react-native-reanimated';

function isBold(
  weight:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
) {
  return (
    weight === '700' ||
    weight === '800' ||
    weight === '900' ||
    weight === 'bold'
  );
}

const PText = wrapper(
  forwardRef<Text, TextProps>(
    (
      {
        style,
        size,
        color,
        weight = 'normal',
        decoration = 'none',
        italic = false,
        ...rest
      },
      ref,
    ) => {
      const {colors, fonts} = useTheme();

      // @ts-ignore
      if (style && style.fontSize) {
        // @ts-ignore
        const {fontSize, ...styleRest} = style;
        size = fontSize;
        style = styleRest;
      }
      const {fontSize} = useFontSize(size!);
      const compStyle = useStyles<TextStyle>(
        {
          color: color || colors.textPrimary,
          fontSize,
          fontFamily: isBold(weight)
            ? fonts.boldFontFamily
            : fonts.regularFontFamily,
          fontWeight: weight,
          textDecorationLine: decoration,
          fontStyle: italic ? 'italic' : 'normal',
          includeFontPadding: false,
          textAlignVertical: 'center',
          paddingTop: Platform.OS === 'android' ? 0 : 1,
        },
        style,
      );

      return <Text ref={ref} style={compStyle} {...rest} />;
    },
  ),
);

export const AnimatedPText = Animated.createAnimatedComponent(PText);

export default PText;
