module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@': './src',
            '@app': './src/app',
            '@features': './src/features',
            '@shared': './src/shared',
            '@graphql': './src/graphql',
            '@store': './src/store',
            '@ui': './src/ui',
            '@assets': './src/assets'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};