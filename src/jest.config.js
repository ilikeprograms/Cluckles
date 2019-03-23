// const esModules = ['[thir-party-lib]'].join('|');

module.exports = {
  globals: {
    "ts-jest": {
      "allowSyntheticDefaultImports": true
    }
  },
  // transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],

  "transform": {
    "^.+\\.js$": "babel-jest"
  }
};
