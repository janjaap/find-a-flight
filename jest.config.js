module.exports = {
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
}
