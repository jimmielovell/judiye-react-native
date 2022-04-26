module.exports = {
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          hoc: './src/hoc',
          hooks: './src/hooks',
          navigators: './src/navigators',
          screens: './src/screens',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
