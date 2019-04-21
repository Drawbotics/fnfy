module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ],
};
