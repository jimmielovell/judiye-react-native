import React from 'react';
import {PixelRatio, Text, TextStyle} from 'react-native';
import {CTextProps} from '../types';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
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
  React.forwardRef<Text, CTextProps>(
    (
      {
        style,
        size,
        color,
        weight = 'normal',
        decoration = 'none',
        italic = false,
        ...rest
      }: CTextProps,
      ref,
    ) => {
      const textRef = useForwardedRef(ref);
      const {colors, fonts} = useTheme();
      size = Number(size) || fonts.defaultSize;
      // Let's use the default lineHeight for now!
      // const lineHeight = fonts.lineHeight;

      const fontScale = PixelRatio.getFontScale();

      const fontSize = React.useMemo(() => {
        return size! * fontScale;
      }, [size, fontScale]);

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
          // lineHeight,
        },
        style,
      );

      return <Text ref={textRef} style={compStyle} {...rest} />;
    },
  ),
);

export default PText;
