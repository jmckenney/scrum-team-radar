const createDefaultConfig = require('@open-wc/testing-karma/default-config.js');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        config.grep ? config.grep : 'test/**/*.test.js',
      ],
    }),
  );
  return config;
};
