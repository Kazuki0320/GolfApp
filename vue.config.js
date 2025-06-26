const { defineConfig } = require('@vue/cli-service')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const os = require('os')

module.exports = defineConfig({
  // ビルド時にソースマップを生成しない
  productionSourceMap: false,

  // 並列ビルドを有効化（CPUコア数が2以上の場合）
  parallel: os.cpus().length > 1,

  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        match (originalTag, { kebabTag, camelTag }) {
          if (kebabTag.startsWith('v-')) {
            return [camelTag, `import ${camelTag} from 'vuetify/lib/components/${camelTag}'`]
          }
        }
      })
    ]
  },

  // Webpackキャッシュと並列処理の最適化
  chainWebpack: config => {
    // キャッシュの設定
    config.cache({
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    })

    // thread-loaderの導入でローダーを並列化
    config.module
      .rule('js')
      .use('thread-loader')
      .loader('thread-loader')
      .options({
        workers: Math.max(os.cpus().length - 1, 1) // 最低1ワーカーを確保
      })
      .before('babel-loader')
  }
})
