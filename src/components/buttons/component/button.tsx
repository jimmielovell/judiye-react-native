import {forwardRef, createRef, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {Icon} from 'components/icons';
import {PText} from 'components/typography';
import {ButtonProps} from '../types';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import Touchable from './touchable';
import wrapper from 'hoc/wrapper';

const Button = wrapper(
  forwardRef<View, ButtonProps>(
    ({appearance, style, textStyle, children, icon, ...rest}, ref) => {
      const buttonRef = useForwardedRef(ref || createRef<View>());
      const {colors, sizing} = useTheme();
      const [contStyles, textColor] = useMemo(() => {
        if (appearance === 'text') {
          return [
            {
              borderWidth: 0,
              backgroundColor: colors.buttonSecondaryContainer,
            },
            colors.buttonSecondaryText,
          ];
        } else if (appearance === 'outline') {
          return [
            {
              borderColor: colors.buttonSecondaryOutline,
              borderWidth: sizing.inputBorderWidth,
              backgroundColor: colors.buttonSecondaryContainer,
            },
            colors.buttonSecondaryText,
          ];
        } else if (appearance === 'icon') {
          return [
            {
              borderRadius: 0,
              height: sizing.buttonIconSize,
              width: sizing.buttonIconSize,
            },
            colors.buttonSecondaryText,
          ];
        } else {
          return [
            {backgroundColor: colors.buttonPrimaryContainer},
            colors.buttonPrimaryText,
          ];
        }
      }, [appearance, colors, sizing]);
      const iconProps = useMemo(() => {
        if (icon) {
          icon.color = icon.color || textColor;
          return icon;
        }
      }, [icon, textColor]);

      const compStyles = useStyles<ViewStyle>(
        {
          borderRadius: sizing.buttonBorderRadius,
          height: sizing.buttonHeight,
          zIndex: 1000,
        },
        contStyles,
        style,
      );
      const textCompStyles = useStyles(
        {color: textColor, marginLeft: icon ? 8 : 0},
        textStyle,
      );

      return (
        <Touchable ref={buttonRef} style={compStyles} {...rest}>
          {(icon || appearance === 'icon') && <Icon {...iconProps!} />}
          {appearance !== 'icon' && (
            <PText weight="bold" style={textCompStyles}>
              {children}
            </PText>
          )}
        </Touchable>
      );
    },
  ),
);

export default Button;
