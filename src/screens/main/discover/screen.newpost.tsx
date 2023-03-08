import {StyleSheet} from 'react-native';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import {Frame} from 'components/layout';

export const NewPostHeader = wrapper(function NewPostHeader() {
  return (
    <AppBar showBackButton showAvatar secondPostfixButton={{name: 'Check'}} />
  );
});

const NewPostScreen = wrapper(function ViewPostScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return <Frame bottomTab={false} />;
});

function createStyle(_theme: Judiye.Theme) {
  return StyleSheet.create({});
}

export default NewPostScreen;
