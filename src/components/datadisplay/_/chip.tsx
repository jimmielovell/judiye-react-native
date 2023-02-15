import {Pressable} from 'components/buttons';
import {Text} from 'components/typography';
import {useTheme} from 'hooks';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Avatar, {AvatarProps} from './avatar';

interface ChipProps {
  avatar?: AvatarProps;
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function Chip(props: ChipProps) {
  const {avatar, children, style, onPress} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Pressable
      direction="row"
      justify="flex-start"
      align="center"
      onPress={onPress}
      style={[_style.cont, style]}>
      {avatar && <Avatar size={16} {...avatar} />}
      <Text size="chip" style={_style.text}>
        {children}
      </Text>
    </Pressable>
  );
}

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    cont: {
      borderColor: colors.border.secondary,
      borderWidth: 0.5,
      borderRadius: 12,
      height: 19,
      width: 'auto',
      padding: 1,
    },
    text: {
      lineHeight: 20,
      height: 20,
      marginHorizontal: spacing.xs,
    },
  });
}
