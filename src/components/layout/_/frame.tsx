import {StyleSheet} from 'react-native';
import wrapper from 'hoc/wrapper';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatListProps} from 'react-native/types';
import {useTheme} from 'hooks';
import {Flex, FlexProps} from 'components/layout';

interface FrameProps extends FlexProps {
  bottomTab?: boolean;
  topBar?: boolean;
}

interface FramedFlatListProps<Item> extends FlatListProps<Item>, FrameProps {}

const Frame = wrapper(function Frame(props: FrameProps) {
  const insets = useSafeAreaInsets();
  const {bottomTab = true, topBar = true, style, ...rest} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  const safeAreaViewStyle = {
    paddingTop: topBar ? 0 : insets.top,
    paddingBottom: bottomTab
      ? insets.bottom + theme.sizing.height.lg
      : insets.bottom,
  };

  return (
    <Flex
      justify="flex-start"
      style={[_style.frame, style, safeAreaViewStyle]}
      {...rest}
    />
  );
});

export const FramedFlatList = wrapper(function FramedFlatList<Item>(
  props: FramedFlatListProps<Item>,
) {
  const insets = useSafeAreaInsets();
  const {bottomTab = true, style, ...rest} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  const safeAreaViewStyle = {
    marginBottom: bottomTab ? insets.bottom + theme.spacing.sm : insets.bottom,
  };

  return (
    <FlatList style={[_style.frame, style, safeAreaViewStyle]} {...rest} />
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors} = theme;

  return StyleSheet.create({
    frame: {
      backgroundColor: colors.background,
      width: '100%',
    },
  });
}

export default Frame;
