import {forwardRef} from 'react';
import {Platform, Text, TextStyle} from 'react-native';
import {TextProps} from '../types';
import {useFontSize, useForwardedRef, useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';

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
      const textRef = useForwardedRef(ref);
      const {colors, fonts} = useTheme();

      // @ts-ignore
      if (style && style.fontSize) {
        // @ts-ignore
        const {fontSize, ...styleRest} = style;
        size = fontSize;
        style = styleRest;
      }
      const {fontSize, lineHeight} = useFontSize(size!);
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
          paddingTop: 1,
          ...Platform.select({
            android: {
              lineHeight,
            },
          }),
        },
        style,
      );

      return <Text ref={textRef} style={compStyle} {...rest} />;
    },
  ),
);

export default PText;
