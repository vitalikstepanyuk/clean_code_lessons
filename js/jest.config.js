/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    'jssm(.*)$': '<rootDir>/node_modules/jssm/$1'
  }
};

module.exports = config;
