module.exports = {
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: ["(test/.*.mock).(jsx?|tsx?)$"],
  modulePaths: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/_helpers/"]
}
