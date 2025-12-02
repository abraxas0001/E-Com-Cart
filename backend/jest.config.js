export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'db/**/*.js'
  ],
  maxWorkers: 1 // Run tests sequentially to avoid database conflicts
};
