module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: ["plugin:vue/recommended", "@vue/prettier"],
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-undef": "off",
    "prettier/prettier": "off"
  }
};
