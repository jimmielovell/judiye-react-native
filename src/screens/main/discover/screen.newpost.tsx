import {StyleSheet} from 'react-native';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import {Frame} from 'components/layout';

export const NewPostHeader = wrapper(function NewPostHeader() {
  return (
    <AppBar
      showBackButton
      backButtonIconName="Clear"
      title="New post"
      secondPostfixButton={{name: 'Edit'}}
    />
  );
});

const NewPostScreen = wrapper(function DiscoverScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return <Frame />;
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

export default NewPostScreen;
