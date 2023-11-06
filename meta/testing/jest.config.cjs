module.exports = {
  collectCoverageFrom: ["src/**/*.(ts|tsx?)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  modulePaths: ["<rootDir>/src/"],
  rootDir: "../../",
  setupFilesAfterEnv: ["<rootDir>/meta/testing/jest.setup.cjs"],
  testRegex: "(/__tests__/.*\\.spec)\\.(ts|tsx?)?$",
  testTimeout: 10000,
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  verbose: false,
  testEnvironment: 'jsdom',
};
