import {forwardRef, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {Icon} from 'components/datadisplay';
import {PText} from 'components/typography';
import Pressable from '../pressable';
import {
  ButtonProps,
  FillButtonProps,
  IconButtonProps,
  TextButtonProps,
} from '../types';
import {useStyles, useTheme} from 'hooks';

const FillButton = forwardRef<View, FillButtonProps>(function FillButton(
  {style, textStyle, children, icon, ...rest},
  ref,
) {
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
      overflow: 'hidden',
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
});

const OutlineButton = forwardRef<View, FillButtonProps>(function OutlineButton(
  {style, textStyle, children, icon, ...rest},
  ref,
) {
  const {colors, sizing} = useTheme();
  if (icon) {
    icon.color = icon.color || colors.text;
  }

  const compStyle = useStyles<ViewStyle>(
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
  const _textStyle = useStyles(
    {color: colors.text, marginLeft: icon ? 8 : 0},
    textStyle,
  );

  return (
    <FillButton
      ref={ref}
      style={compStyle}
      textStyle={_textStyle}
      icon={icon}
      {...rest}>
      {children}
    </FillButton>
  );
});

const IconButton = forwardRef<View, IconButtonProps>(function IconButton(
  {style, name, size, color, android_ripple, ...rest},
  ref,
) {
  const {colors, sizing} = useTheme();
  color = color || colors.text;

  const compStyles = useStyles<ViewStyle>(
    {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 1000,
      width: sizing.buttonHeight,
      height: sizing.buttonHeight,
      zIndex: 1000,
    },
    style,
  );

  return (
    <Pressable
      android_ripple={{
        ...android_ripple,
        borderless: true,
      }}
      ref={ref}
      style={compStyles}
      {...rest}>
      <Icon name={name} color={color} size={size || 20} />
    </Pressable>
  );
});

const TextButton = forwardRef<View, TextButtonProps>(function TextButton(
  {style, children, ...rest},
  ref,
) {
  const compStyles = useStyles<ViewStyle>(
    {
      borderWidth: 0,
    },
    style,
  );

  return (
    <OutlineButton ref={ref} self="flex-start" style={compStyles} {...rest}>
      {children}
    </OutlineButton>
  );
});

const Button = forwardRef<View, ButtonProps>(function Button(
  {appearance = 'fill', ...rest},
  ref,
) {
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
});

export default Button;
