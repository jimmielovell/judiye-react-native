const {defaults: tsjPreset} = require('ts-jest/presets');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = Object.assign(jestPreset, {
  ...tsjPreset,
  preset: 'react-native',
  transform: {
    ...tsjPreset.transform,
    '\\.(ts|tsx)$': 'ts-jest',
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  setupFiles: [
    ...jestPreset.setupFiles,
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/node_modules/appcenter/test/AppCenterMock.js',
    '<rootDir>/node_modules/appcenter-analytics/test/AppCenterAnalyticsMock.js',
    '<rootDir>/node_modules/appcenter-crashes/test/AppCenterCrashesMock.js',
    // '<rootDir>/node_modules/appcenter-push/test/AppCenterPushMock.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  cacheDirectory: '.jest/cache',
  moduleNameMapper: {
    '^mobx$': '<rootDir>/node_modules/mobx/dist',
    '^mobx-react-lite$': '<rootDir>/node_modules/mobx-react-lite/lib',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
});
