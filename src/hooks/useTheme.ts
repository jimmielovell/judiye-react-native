import {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {DarkTheme, DefaultTheme} from 'theme';

function useTheme() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useMemo(() => {
    return isDarkMode ? DarkTheme : DefaultTheme;
  }, [isDarkMode]);

  return theme;
}

export default useTheme;
