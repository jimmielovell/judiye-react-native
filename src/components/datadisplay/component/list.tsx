import {ScrollView, ViewProps} from 'react-native';
import {useStyles} from 'hooks';
import wrapper from 'hoc/wrapper';
import {Pressable} from 'components/buttons';
import {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated';

export const ListItem = wrapper(props => {
  const compStyles = useStyles({
    width: '100%',
  });

  return (
    <Pressable
      style={compStyles}
      {...props}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}
      layout={Layout.springify()}
    />
  );
});

const List = wrapper(({children, style}: ViewProps) => {
  // gutter = Number(gutter);

  const contCompStyles = useStyles(style, {
    width: '100%',
  });

  return <ScrollView style={contCompStyles}>{children}</ScrollView>;
});

export default List;
