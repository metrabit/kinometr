const path = require('path')

module.exports = {
  pluginOptions: {
    'resolve-alias': {
      alias: {
        '@global': path.resolve(__dirname, './src/global'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@icons': path.resolve(__dirname, './src/global/icons/'),
        '@components': path.resolve(__dirname, './src/global/components/'),
      }
    }
  }
}