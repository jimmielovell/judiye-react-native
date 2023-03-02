import {Platform} from 'react-native';

// @ts-ignore
const fonts: Watfoe.Theme.Fonts = {
  ...Platform.select({
    ios: {
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
  family: 'System',
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
