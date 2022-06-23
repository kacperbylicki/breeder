module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["eslint-plugin-html", "react", "sort-imports-es6-autofix", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": 0,
    "no-throw-literal": 0,
    "prefer-const": 0,
    "no-console": 0,
    "no-prototype-builtins": 0,
    "security/detect-object-injection": 0,
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "no-var": 2,
    "no-undef": 2,
    "no-param-reassign": 2,
    "sort-imports-es6-autofix/sort-imports-es6": [
      "error",
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "single", "all", "multiple"],
      },
    ],
  },
};
