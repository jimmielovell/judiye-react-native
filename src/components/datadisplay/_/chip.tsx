import {Flex} from 'components/layout';
import {Text} from 'components/typography';
import {useTheme} from 'hooks';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Avatar, {AvatarProps} from './avatar';

interface ChipProps {
  avatar?: AvatarProps;
  children: string;
  style?: StyleProp<ViewStyle>;
}

export default function Chip(props: ChipProps) {
  const {avatar, children, style} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex
      direction="row"
      justify="flex-start"
      align="center"
      style={[_style.cont, style]}>
      {avatar && <Avatar size={16} {...avatar} />}
      <Text size="chip" style={_style.text}>
        {children}
      </Text>
    </Flex>
  );
}

function createStyle(theme: Judiye.Theme) {
  const {colors, sizing, spacing} = theme;

  return StyleSheet.create({
    cont: {
      borderColor: colors.border.secondary,
      borderWidth: sizing.border.width,
      borderRadius: 12,
      height: 20,
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
