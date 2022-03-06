module.exports = {
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
          theme: './src/theme',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
