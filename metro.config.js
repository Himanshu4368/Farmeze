const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (
        moduleName === 'react-dom' ||
        moduleName === 'react-dom/client'
      ) {
        return {
          type: 'sourceFile',
          filePath: path.join(__dirname, 'config/reactDomNativeShim.js'),
        };
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
