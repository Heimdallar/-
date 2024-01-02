module.exports = {
  extends: ['@du/eslint-config-poizon-design-pro'],
  rules: {
    'max-lines-per-function': ['error', { max: 600 }],
    'import/no-unused-modules': 1,
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
