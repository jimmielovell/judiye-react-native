import {forwardRef, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {Icon} from 'components/datadisplay';
import {PText} from 'components/typography';
import {
  ButtonProps,
  FillButtonProps,
  IconButtonProps,
  TextButtonProps,
} from '../types';
import {useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import Pressable from './pressable';

const FillButton = wrapper(
  forwardRef<View, FillButtonProps>(
    ({style, textStyle, children, icon, ...rest}, ref) => {
      const {colors, sizing} = useTheme();
      const iconProps = useMemo(() => {
        if (icon) {
          icon.color = icon.color || colors.buttonPrimaryText;
          return icon;
        }
      }, [colors.buttonPrimaryText, icon]);

      const compStyles = useStyles<ViewStyle>(
        {
          backgroundColor: colors.primary,
          borderRadius: sizing.buttonBorderRadius,
          height: sizing.buttonHeight,
          zIndex: 1000,
        },
        style,
      );
      const textCompStyles = useStyles(
        {color: colors.buttonPrimaryText, marginLeft: icon ? 8 : 0},
        textStyle,
      );

      return (
        <Pressable ref={ref} style={compStyles} {...rest}>
          {icon && <Icon {...iconProps!} />}
          <PText numberOfLines={1} style={textCompStyles}>
            {children}
          </PText>
        </Pressable>
      );
    },
  ),
);

const OutlineButton = wrapper(
  forwardRef<View, FillButtonProps>(
    ({style, textStyle, children, icon, ...rest}, ref) => {
      const {colors, sizing} = useTheme();
      const iconProps = useMemo(() => {
        if (icon) {
          icon.color = icon.color || colors.text;
          return icon;
        }
      }, [icon, colors.text]);

      const compStyles = useStyles<ViewStyle>(
        {
          borderColor: colors.primary,
          borderWidth: sizing.borderWidth,
          borderRadius: sizing.buttonBorderRadius,
          backgroundColor: 'transparent',
          height: sizing.buttonHeight - sizing.borderWidth * 2,
          zIndex: 1000,
        },
        style,
      );
      const textCompStyles = useStyles(
        {color: colors.text, marginLeft: icon ? 8 : 0},
        textStyle,
      );

      return (
        <Pressable ref={ref} style={compStyles} {...rest}>
          {icon && <Icon {...iconProps!} />}
          <PText numberOfLines={1} weight="600" style={textCompStyles}>
            {children}
          </PText>
        </Pressable>
      );
    },
  ),
);

const IconButton = wrapper(
  forwardRef<View, IconButtonProps>(
    ({style, name, size, color, ...rest}, ref) => {
      const {colors, sizing} = useTheme();
      color = color || colors.text;

      const compStyles = useStyles<ViewStyle>(
        {
          alignItems: 'center',
          backgroundColor: colors.backgroundSecondary,
          borderRadius: 1000,
          width: sizing.buttonHeight,
          height: sizing.buttonHeight,
          justifyContent: 'center',
          zIndex: 1000,
        },
        style,
      );

      return (
        <Pressable
          android_ripple={{
            borderless: true,
          }}
          ref={ref}
          style={compStyles}
          {...rest}>
          <Icon name={name} color={color} size={size} />
        </Pressable>
      );
    },
  ),
);

const TextButton = wrapper(
  forwardRef<View, TextButtonProps>(({style, children, ...rest}, ref) => {
    const {colors, sizing} = useTheme();

    const compStyles = useStyles<ViewStyle>({
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: sizing.buttonBorderRadius,
      height: sizing.buttonHeight,
      justifyContent: 'center',
      paddingHorizontal: 13,
      zIndex: 1000,
    });
    const textCompStyles = useStyles({color: colors.text}, style);

    return (
      <Pressable ref={ref} style={compStyles} {...rest}>
        <PText numberOfLines={1} weight="600" style={textCompStyles}>
          {children}
        </PText>
      </Pressable>
    );
  }),
);

const Button = wrapper(
  forwardRef<View, ButtonProps>(({appearance, ...rest}, ref) => {
    const buttonComponent = useMemo(() => {
      switch (appearance) {
        case 'outline':
          return <OutlineButton ref={ref} {...rest} />;
        case 'icon':
          // @ts-expect-error
          return <IconButton ref={ref} {...rest} />;
        case 'text':
          return <TextButton ref={ref} {...rest} />;
        default:
          return <FillButton ref={ref} {...rest} />;
      }
    }, [appearance, ref, rest]);

    return buttonComponent;
  }),
);

export default Button;
