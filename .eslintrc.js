module.exports = {
  globals: {
    process: true,
    module: true,
    require: true,
    DEFAULT_LSF_INIT: true,
    __FEATURE_FLAGS__: true,
    __dirname: true,
  },
  extends: ['plugin:@heartexlabs/frontend/recommended'],
};
