import {colors as watfoeColors} from '../watfoe/colors';

const light: Judiye.Theme.Colors = {
  primary: watfoeColors.black,
  background: watfoeColors.white,
  backgroundPrimary: watfoeColors.white,
  backgroundSecondary: watfoeColors.primary.grey,

  text: watfoeColors.font.primary,
  textPrimary: watfoeColors.font.primary,
  textSecondary: watfoeColors.font.secondary,

  linkText: watfoeColors.primary.blue,
  linkContainer: 'transparent',

  errorText: watfoeColors.primary.red,
  errorContainer: 'transparent',

  inputOutline: watfoeColors.black,
  inputOutlineFocused: watfoeColors.black,
  inputOutlineErrored: watfoeColors.primary.red,
  inputLabelText: watfoeColors.font.primary,
  inputLabelBackground: 'transparent',
  inputLabelFocused: watfoeColors.font.primary,
  inputLabelErrored: watfoeColors.primary.red,
  inputErrorText: watfoeColors.primary.red,
  inputErrorContainer: watfoeColors.white,
  inputContainer: watfoeColors.white,
  inputValue: watfoeColors.font.primary,
  inputValueErrored: watfoeColors.font.primary,

  buttonPrimaryText: watfoeColors.white,
  buttonPrimaryContainer: watfoeColors.black,
  buttonPrimaryOutline: 'transparent',
  buttonSecondaryText: watfoeColors.font.primary,
  buttonSecondaryContainer: 'transparent',
  buttonSecondaryOutline: watfoeColors.black,

  notification: watfoeColors.font.primary,
  notificationReadText: watfoeColors.font.primary,
  notificationReadContainer: 'transparent',
  notificationUnreadText: watfoeColors.font.primary,
  notificationUnreadContainer: watfoeColors.primary.grey,

  // The color of surfaces such as cards, sheets, menus
  surfaceText: watfoeColors.font.primary,
  surfaceContainer: watfoeColors.white,
  card: watfoeColors.white,

  // A color meant to be used in element outlines
  border: watfoeColors.primary.grey,

  // The scrim background that appears below modals and expanded navigation menus.
  scrimContainer: 'rgba(0,0,0,0.3)',
  scrimText: watfoeColors.white,
};

const dark: Judiye.Theme.Colors = {
  primary: watfoeColors.black,
  background: watfoeColors.white,
  backgroundPrimary: watfoeColors.white,
  backgroundSecondary: watfoeColors.primary.grey,

  text: watfoeColors.white,
  textPrimary: watfoeColors.white,
  textSecondary: watfoeColors.primary.grey,

  linkText: watfoeColors.primary.blue,
  linkContainer: 'transparent',

  errorText: watfoeColors.primary.red,
  errorContainer: 'transparent',

  inputOutline: watfoeColors.primary.blue,
  inputOutlineFocused: watfoeColors.primary.blue,
  inputOutlineErrored: watfoeColors.primary.red,
  inputLabelText: watfoeColors.font.primary,
  inputLabelBackground: 'transparent',
  inputLabelFocused: watfoeColors.white,
  inputLabelErrored: watfoeColors.primary.red,
  inputErrorText: watfoeColors.primary.red,
  inputErrorContainer: watfoeColors.white,
  inputContainer: watfoeColors.black,
  inputValue: watfoeColors.font.primary,
  inputValueErrored: watfoeColors.font.primary,

  buttonPrimaryText: watfoeColors.white,
  buttonPrimaryContainer: watfoeColors.black,
  buttonPrimaryOutline: 'transparent',
  buttonSecondaryText: watfoeColors.font.primary,
  buttonSecondaryContainer: 'transparent',
  buttonSecondaryOutline: watfoeColors.black,

  notification: watfoeColors.white,
  notificationReadText: watfoeColors.white,
  notificationReadContainer: 'transparent',
  notificationUnreadText: watfoeColors.white,
  notificationUnreadContainer: watfoeColors.primary.grey,

  // The color of surfaces such as cards, sheets, menus
  surfaceText: watfoeColors.font.primary,
  surfaceContainer: watfoeColors.white,
  card: watfoeColors.white,

  // A color meant to be used in element outlines
  border: watfoeColors.primary.grey,

  // The scrim background that appears below modals and expanded navigation menus.
  scrimContainer: 'rgba(0,0,0,0.3)',
  scrimText: watfoeColors.white,
};

export default {light, dark};
