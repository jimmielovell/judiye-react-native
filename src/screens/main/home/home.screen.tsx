import {StyleSheet} from 'react-native';
import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';

const HomeScreen = wrapper(function HomeScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return <Frame />;
});

function createStyle(_theme: Judiye.Theme) {
  // const {spacing} = theme;

  return StyleSheet.create({});
}

export default HomeScreen;
