module.exports = {
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
