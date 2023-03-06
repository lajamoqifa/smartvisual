const antdKeys = require("./bonree-design.js");
module.exports = require("unplugin-auto-import/webpack")({
  imports: [
    "react",
    "ahooks",
    {
      antd: antdKeys,
    },
  ],
  dts: "./types/auto-imports.d.ts",
  eslintrc: {
    enabled: true, // Default `false`
    filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },
});
