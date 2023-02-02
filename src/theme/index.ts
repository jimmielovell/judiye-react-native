import colors from './judiye/colors';
import fonts from './watfoe/fonts';
import sizing from './watfoe/sizing';
import spacing from './watfoe/spacing';
import shape from './watfoe/shape';

const commonTheme = {
  fonts,
  sizing,
  spacing,
  shape,
};

export const DarkTheme: Judiye.Theme = {
  colors: colors.dark,
  dark: true,
  ...commonTheme,
};

export const DefaultTheme: Judiye.Theme = {
  colors: colors.light,
  dark: false,
  ...commonTheme,
};
