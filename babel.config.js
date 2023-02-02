module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          domains: './src/domains',
          hoc: './src/hoc',
          hooks: './src/hooks',
          navigators: './src/navigators',
          screens: './src/screens',
          theme: './src/theme',
          utils: './src/utils',
          store: './src/store',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
