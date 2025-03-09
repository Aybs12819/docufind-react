module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^axios$': '<rootDir>/node_modules/axios/dist/axios.js'
  },
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
};