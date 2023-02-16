import colors from '../watfoe/colors';

const light: Judiye.Theme.Colors = {
  primary: colors.black.primary,
  background: colors.white.primary,

  ripple: 'rgba(0, 0, 0, 0.06)',

  // The scrim background that appears below modals and expanded navigation menus.
  scrim: 'rgba(0, 0, 0, 0.610)',

  text: {
    primary: colors.black.primary,
    secondary: colors.black.secondary,
    link: colors.blue.main,
    success: colors.green.main,
    warning: colors.yellow.main,
    error: colors.red.main,
  },

  border: {
    primary: colors.black.primary,
    secondary: colors.black.secondary,
  },

  actions: {
    active: colors.black.primary,
    disabled: colors.black.secondary,
    focused: colors.black.primary,
    success: colors.blue.main,
    warning: colors.yellow.main,
    error: colors.red.main,
  },

  surface: {
    primary: colors.white.primary,
    secondary: colors.white.secondary,
    link: 'rgba(64, 173, 217, 0.13)',
    success: 'rgba(153, 179, 102, 0.13)',
    warning: 'rgba(229, 223, 93, 0.13)',
    error: 'rgba(255, 102, 102, 0.13)',
  },
};

const dark: Judiye.Theme.Colors = {
  primary: colors.black.primary,
  background: colors.white.primary,

  ripple: 'rgba(0, 0, 0, 0.06)',

  // The scrim background that appears below modals and expanded navigation menus.
  scrim: 'rgba(0, 0, 0, 0.610)',

  text: {
    primary: colors.black.primary,
    secondary: colors.black.secondary,
    link: colors.blue.main,
    success: colors.green.main,
    warning: colors.yellow.main,
    error: colors.red.main,
  },

  border: {
    primary: colors.black.primary,
    secondary: colors.black.secondary,
  },

  actions: {
    active: colors.black.primary,
    disabled: colors.black.secondary,
    focused: colors.black.primary,
    success: colors.blue.main,
    warning: colors.yellow.main,
    error: colors.red.main,
  },

  surface: {
    primary: colors.white.primary,
    secondary: colors.white.secondary,
    link: 'rgba(64, 173, 217, 0.13)',
    success: 'rgba(153, 179, 102, 0.13)',
    warning: 'rgba(229, 223, 93, 0.13)',
    error: 'rgba(255, 102, 102, 0.13)',
  },
};

export default {light, dark};
