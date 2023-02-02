import {
  ColorValue,
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps,
  Platform,
} from 'react-native';
import {useFontFamily, useFontColor, useFontSize, useTheme} from 'hooks';
import {FontAppearance, FontVariant, FontWeight} from 'types/globals';
import {forwardRef} from 'react';
import wrapper from 'hoc/wrapper';

export interface TextProps extends RNTextProps {
  align?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  color?: FontAppearance | ColorValue;
  size?: FontVariant | number | string;
  weight?: FontWeight;
  decoration?: 'line-through' | 'none' | 'underline' | 'underline line-through';
  italic?: boolean;
}

const Text = wrapper(
  forwardRef<RNText, TextProps>(function Text(props, ref) {
    let {
      align,
      color,
      decoration = 'none',
      italic = false,
      size = 'body',
      style,
      weight = 'normal',
      ...rest
    } = props;
    const theme = useTheme();
    style = (style || {}) as TextStyle;
    const fontColor = useFontColor(
      style?.color,
      color || theme.colors.text.primary,
    );
    const fontSize = useFontSize(style.fontSize, size);
    const [fontFamily, fontWeight] = useFontFamily(
      style.fontWeight,
      weight,
      size,
    );

    const _style: TextStyle = {
      color: fontColor,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle: italic ? 'italic' : 'normal',
      includeFontPadding: false,
      textAlignVertical: 'center', // For android
      textAlign: align,
      textDecorationLine: decoration,
      paddingBottom: 0,
      ...Platform.select({
        ios: {
          lineHeight: fontSize,
        },
        android: {
          lineHeight: fontSize! * 1.2,
        },
      }),
    };

    return <RNText ref={ref} style={[_style, style]} {...rest} />;
  }),
);

export default Text;
