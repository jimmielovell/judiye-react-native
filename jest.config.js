const {defaults: tsjPreset} = require('ts-jest/presets');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(jestPreset, {
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.json',
      // diagnostics: false,
    },
  },
  setupFiles: [
    ...jestPreset.setupFiles,
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/node_modules/appcenter/test/AppCenterMock.js',
    '<rootDir>/node_modules/appcenter-analytics/test/AppCenterAnalyticsMock.js',
    '<rootDir>/node_modules/appcenter-crashes/test/AppCenterCrashesMock.js',
    // '<rootDir>/node_modules/appcenter-push/test/AppCenterPushMock.js',
  ],
  moduleNameMapper: {
    '^mobx$': '<rootDir>/node_modules/mobx/dist',
    '^mobx-react-lite$': '<rootDir>/node_modules/mobx-react-lite/lib',
    '^react-native-reanimated$':
      '<rootDir>/node_modules/react-native-reanimated/lib',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
});
