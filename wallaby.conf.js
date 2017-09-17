module.exports = () => ({
  files: [
    "tsconfig.json",
    "package.json",
    "src/**/*.*",
    "!src/**/*.test.ts",
    "!src/**/*.test.tsx",
  ],
  tests: [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
  ],
  env: {
    type: "node",
  },
  testFramework: "jest",
  debug: true,
  setup(wallaby) {
    var jestConfig = require('./package.json').jest;
    jestConfig.modulePaths[0] = jestConfig.modulePaths[0].replace('<rootDir>', wallaby.projectCacheDir);
    wallaby.testFramework.configure(jestConfig);
  },
});
