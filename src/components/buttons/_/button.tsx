import {Icon, IconProps} from 'components/datadisplay';
import {Text} from 'components/typography';
import {useTheme} from 'hooks';
import {ForwardedRef, forwardRef, useMemo} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Pressable, PressableProps} from 'components/buttons';

export interface FillButtonProps extends PressableProps {
  type?: 'button' | 'submit' | 'reset';
  appearance?: 'fill';
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
}

export interface OutlineButtonProps
  extends Omit<FillButtonProps, 'appearance'> {
  appearance: 'outline';
}

export interface IconButtonProps
  extends Omit<PressableProps, 'appearance' | 'icon' | 'textStyle'>,
    IconProps {
  appearance: 'icon';
}

export interface TextButtonProps
  extends Omit<FillButtonProps, 'appearance' | 'icon'> {
  appearance: 'text';
  textStyle?: StyleProp<TextStyle>;
}

export type ButtonProps =
  | FillButtonProps
  | OutlineButtonProps
  | IconButtonProps
  | TextButtonProps;

function FillButton(
  props: Omit<FillButtonProps, 'appearance'> & {
    forwardedRef: ForwardedRef<View>;
  },
) {
  const {style, textStyle, children, icon, forwardedRef, ...rest} = props;
  const {colors, sizing} = useTheme();
  const iconElement = useMemo(() => {
    if (icon) {
      icon.color = icon.color || colors.text.primary;
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Icon {...icon} style={[icon.style, {marginRight: children ? 3 : 0}]} />
      );
    }

    return null;
  }, [children, colors.text.primary, icon]);

  const _styles: ViewStyle = {
    backgroundColor: colors.primary,
    borderRadius: 1000,
    height: sizing.height.lg,
    overflow: 'hidden',
  };

  const element = useMemo(() => {
    if (typeof children === 'string') {
      return (
        <Text
          align="center"
          color={colors.background}
          size="body"
          numberOfLines={1}
          style={textStyle}>
          {children}
        </Text>
      );
    }

    return children;
  }, [children, colors.background, textStyle]);

  return (
    <Pressable
      ref={forwardedRef}
      direction="row"
      style={[_styles, style]}
      {...rest}>
      {iconElement}
      <>{element}</>
    </Pressable>
  );
}

function OutlineButton(
  props: Omit<OutlineButtonProps, 'appearance'> & {
    forwardedRef: ForwardedRef<View>;
  },
) {
  const {style, textStyle, ...rest} = props;
  const {colors, sizing} = useTheme();
  if (rest.icon) {
    rest.icon.color = rest.icon.color || colors.text.primary;
  }

  const _style: ViewStyle = {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: sizing.border.width,
  };

  const computedTextStyle = {
    color: colors.text.primary,
  };

  return (
    <FillButton
      style={[_style, style]}
      textStyle={[computedTextStyle, textStyle]}
      {...rest}
    />
  );
}

function TextButton(
  props: Omit<TextButtonProps, 'appearance'> & {
    forwardedRef: ForwardedRef<View>;
  },
) {
  const {style, ...rest} = props;
  const _styles: ViewStyle = {
    borderWidth: 0,
    height: 'auto',
  };

  return <OutlineButton self="flex-start" style={[_styles, style]} {...rest} />;
}

function IconButton(
  props: Omit<IconButtonProps, 'appearance'> & {
    forwardedRef: ForwardedRef<View>;
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {name, size, color, android_ripple, style, children, ...rest} = props;
  const {colors, sizing} = useTheme();

  const _styles: ViewStyle = {
    backgroundColor: colors.surface.secondary,
    width: sizing.height.nm,
    height: sizing.height.nm,
  };

  return (
    <FillButton
      android_ripple={{
        ...android_ripple,
        borderless: true,
      }}
      style={[_styles, style]}
      icon={{
        name,
        size: size || 20,
        color: color || colors.text.primary,
      }}
      {...rest}
    />
  );
}

const Button = forwardRef<View, ButtonProps>(function Button(props, ref) {
  const {appearance, ...rest} = props;
  switch (appearance) {
    case 'outline':
      return <OutlineButton forwardedRef={ref} {...rest} />;
    case 'icon':
      // @ts-ignore
      return <IconButton forwardedRef={ref} {...rest} />;
    case 'text':
      return <TextButton forwardedRef={ref} {...rest} />;
    default:
      return <FillButton forwardedRef={ref} {...rest} />;
  }
});

export default Button;
