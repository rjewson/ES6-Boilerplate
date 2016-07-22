module.exports = {
  use: [
    "postcss-import",
    "autoprefixer",
    "postcss-nested",
    "postcss-style-guide"
  ],
  input: "src/css/main.css",
  "postcss-style-guide": {
    "project": "Huawei Styleguide",
    "dest": "./dist/styleguide/index.html"
  }
};
