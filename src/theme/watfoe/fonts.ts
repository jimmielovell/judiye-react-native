import {Platform} from 'react-native';

// @ts-ignore
const fonts: Watfoe.Theme.Fonts = {
  ...Platform.select({
    ios: {
      family: {
        light: 'Helvetica Neue',
        regular: 'Helvetica Neue',
        medium: 'Helvetica Neue',
        bold: 'Helvetica Neue',
      },
      size: {
        title: 18,
        subtitle: 16,
        body: 15,
        description: 14,
        label: 14,
        chip: 12,
      },
    },

    android: {
      family: {
        light: 'Roboto',
        regular: 'Roboto',
        medium: 'Roboto',
        bold: 'Roboto',
      },
      size: {
        title: 21,
        subtitle: 18,
        body: 16,
        description: 14,
        label: 14,
        chip: 12,
      },
    },
  }),
  weight: {
    title: '700',
    subtitle: '600',
    body: '400',
    description: '400',
    label: '400',
    chip: '400',
  },
  letterSpacing: 0.5,
  lineHeight: 1.5,
};

export default fonts;
