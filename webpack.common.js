const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@util': path.resolve(__dirname, 'src/utils'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
}
