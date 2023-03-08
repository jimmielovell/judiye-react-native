import {StyleSheet} from 'react-native';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import {Frame} from 'components/layout';
import Post from './_/post';

export const ViewPostHeader = wrapper(function ViewPostHeader() {
  return <AppBar showBackButton title="Highlight" />;
});

const ViewPostScreen = wrapper(function ViewPostScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Frame bottomTab={false}>
      <Post id="1" />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    postsCont: {
      width: '100%',
      height: '100%',
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.lg,
    },
  });
}

export default ViewPostScreen;
