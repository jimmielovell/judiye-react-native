import colors from './judiye/colors';
import sizing from './judiye/sizing';
import spacing from './judiye/spacing';
import fonts from './judiye/fonts';

const commonLightDarkTheme = {
  fonts,
  sizing,
  spacing,
  animation: {},
};

export const DarkTheme: Judiye.Theme = {
  colors: colors.dark,
  dark: true,
  ...commonLightDarkTheme,
};

export const DefaultTheme: Judiye.Theme = {
  colors: colors.light,
  dark: false,
  ...commonLightDarkTheme,
};
