const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'node'
  ],
  silent: true,
  verbose: true,
  testURL:'http://locallhost/',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^js/(.*)$': '<rootDir>/src/js/$1',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/_mocks_/fileMock.js",
    '^components/(.*)$': '<rootDir>/src/components/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.(css)$': "<rootDir>/node_modules/jest-css-modules"
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ["jest-localstorage-mock", "<rootDir>/test/unit/setup.js", "jest-canvas-mock"],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  moduleDirectories: ["node_modules"],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!src/index.js',
    '!src/js/KLineMobileOption.js',
    '!src/js/KLineOption.js',
    '!src/js/TimeSharingOption.js',
    '!src/js/DepthOption.js',
    '!src/main.js',
    '!**/node_modules/**'
  ]
}
