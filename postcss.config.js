module.exports = {
  use: [
    "postcss-import",
    "postcss-css-variables",
    "postcss-pxtorem",
    "postcss-mixins",
    "autoprefixer",
    "postcss-nested",
    "postcss-normalize",
    "postcss-reporter"
  ],
  input: "src/css/main.css",
  output: "dist/css/huawei.css",
  "postcss-import": {
    "plugins": [require('stylelint')()]
  },
  "postcss-pxtorem": {
    "rootValue": 16,
    "unitPrecision": 5,
    "propWhiteList": [],
    "selectorBlackList": [],
    "replace": false,
    "mediaQuery": true
  },
  "postcss-reporter": {
    "clearMessages": true
  }
};
