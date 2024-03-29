import {StyleSheet} from 'react-native';
import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import AppBar from '../app-bar';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

export const HomeHeader = wrapper(function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = useCallback(
    (screenName: String) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  return (
    <AppBar
      showAvatar
      firstPostfixButton={{
        name: 'Calendar',
        onPress: () => navigateToScreen('CalendarScreen'),
      }}
      secondPostfixButton={{
        name: 'Users',
        onPress: () => navigateToScreen('ColleaguesScreen'),
      }}
    />
  );
});

const HomeScreen = wrapper(function HomeScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return <Frame />;
});

function createStyle(theme: Judiye.Theme) {
  const {sizing, spacing} = theme;

  return StyleSheet.create({});
}

export default HomeScreen;
