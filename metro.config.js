const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  const withNativeWindConfig = withNativeWind(defaultConfig, {
    input: "./global.css",
  });

  withNativeWindConfig.transformer.babelTransformerPath = require.resolve(
    "react-native-qrcode-svg/textEncodingTransformation",
  );

  return withNativeWindConfig;
})();
