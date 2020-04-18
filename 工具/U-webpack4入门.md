---
title: webpack4入门
date: 2018-06-19 17:50:33
tags: [webpack4入门]
categories: 技工蓝翔
toc: true
---
webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个包。

<!-- more -->
# 安装
```bash
npm install --save-dev webpack@<version>
```
如果使用webpack4 需要安装CLI
```bash
npm install --save-dev webpack-cli/webpack-command
```
* 推荐使用本地安装而不用全局安装。
  - 本地安装能更轻松的进行项目升级；而全局安装将webpack锁定在一个版本上，不利于不同项目的使用
  - 在npm v5.2.0之后，引入了一个命令：`npx`，它的作用：从 npm 的可执行包(node_modules/.bin)执行命令
  - [zkat/npx](https://github.com/zkat/npx)
  - [npx是什么](https://www.jianshu.com/p/cee806439865)

# 概念
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // production, development, none
  mode: 'production',  // cli: webpack --mode=production
  /**
   * 应用程序执行入口
   * webpack 开始打包
   * @type {string, array, object, function}
   */
  entry: './path/to/my/entry/file.js',
  /**
   * 入口上下文：应用程序执行入口时的基础目录
   * @type {[type]}
   */
  context: path.resolve(''),
  /**
   * webpack 如何输出结果的配置
   */
  output: {
    /**
     * 所有输出文件的目标路径，必须是绝对路径（使用Node的path）
     * @type {string}
     */
    path: path.resolve(__dirname, 'dist'),
    /**
     * 输出文件的文件名，可使用占位符,[name], [hash], [chunkhash]...
     * @type {String}
     */
    filename: 'my-first-webpack.bundle.js',
    /**
     * 用来指定HTML文件中引入的静态资源的路径，如图片src，页面js src，href 等
     * 在这些资源位于服务端时，即可设置为'https://....'
     * @type {String}
     */
    publicPath: '/assets/',   // src="/assets/image.png"
    ...
  },
  // 模块配置
  module: {
    rules: [ // 配置 loader、解析器等
      { // 告诉webpack，当碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。
        test: /\.txt$/,  // 匹配条件
        use: [
          'raw-loader',
          // 应用多个loader
          {
            loader: 'html-loader',
            options: {}
          }
        ],
      },
      {
        test: /.html$/
        /**
         * test, include, exclude, resource 是对resource的条件
         * test: 匹配条件，正则或正则数组
         * @type {Array}
         */
        include: [ // 匹配条件，字符串或字符串数组
          path.resolve(__dirname, 'app')
        ],
        exclude: [ // 排除条件
          path.resolve(__dirname, 'app/demo-files')
        ],
        loader: 'babel-loader',
        options: { // loader的可选项
          presets: ['es2015']
        }
      },
      ...
    ]
  },
  // 优化
  optimization: {
    minimize: true, // use uglifyjswebpackplugin
    minimizer: [
      new UglifyJsPlugin({/*config*/})
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(), // 已移除
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  watch: true, // 监听模式
  watchOptions: {
    aggregateTimeout: 1000, // 监听到更改前的延迟
    ignored: /node_modules/, // 忽略文件
    poll: true|1000, // 监听间隔
  },
  /**
   * 开发使用，选择source-map来增强调试过程,将编译后的代码映射回原始源代码
   * @type {String}
   */
  devtool: 'source-map',
  /**
   * 需安装webpack-dev-server,启动一个服务
   * @type {Object}
   */
  devServer: {
    contentBase: '', // 告诉服务器在哪里查找文件
    clientLogLevel: 'info' // none, error, warning 或者 info（默认值）。
  },
  target: 'web', // node, node-webkit, web ,webworder... 为构建的目标指定一个环境
  externals: ['react'], // 外部扩展，不用打包到dist，而是在运行时从环境中获取
  stats: 'errors-only', // minimal, none, normal, verbose 错误信息输出等级
  resolve: { // 配置 模块如何解析
    alias: {} // 创建 import 或 require 的别名，来替换一些文件夹写法
  }
  ...
}
```
[webpack Configuration](https://webpack.docschina.org/configuration/)

## mode
* development
  - process.env.NODE_ENV = development
  - 启用NamedChunksPlugin 、NamedModulesPlugin
* production
  - process.env.NODE_ENV = production
  - 启用FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorsPlugin、 OccurrenceOrderPlugin、SideEffectsFlagPlugin 和 UglifyJsPlugin.

## entry
webpack 通过entry 来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是entry(直接或间接)依赖的。默认值为 `./src/index.js`

### 用法
1. `entry: string` <==> `entry:{main: string}`
2. `entry: [string]` 多个依赖文件一起注入，并将它们引入到一个chunk
3. `entry: {key: string|[string]}`
  key: 可用做ouput中的占位符
  1. 分离应用程序和第三方库的入口，常见于只有一个入口起点（不包括vendor）的SPA
    ```javascript
    entry: {
      app: '.src/app.js',
      vendors: './src/vendors.js'
    }
    ```
  2. 多页面应用程序
    ```javascript
    entry: {
      pageOne: './src/pageOne/index.js',
      ...
    }
    ```
    每个HTML只使用一个入口起点
4. `entry: function: () => string|[string]|object`  动态加载，不属于入口起点

### 上下文
用于从配置中解析入口起点和loader。默认使用当前目录(即webpack运行所在的目录:process.cwd())，推荐在配置中传递一个值。

```javascript
{
  context: path.resolve('./src'), // 应配置为绝对路径
  entry: './main.js'
}
```

## output
output 告诉webpack 在哪里输出它所创建的bundles，以及如何命名这些文件，默认值为`./dist/main.js`。只能指定一个输出配置
* 多个入口起点
  - 使用占位符来确保每个输出文件的唯一名称。[name], [id], [hash:len], [chunkhash:len], [query]

## loader
webpack 自身只理解javascript，loader让webpack能够去处理非javascript文件。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块。<br>
loader 允许直接在 JavaScript 模块中 import CSS文件！（全局引入） `import './index.css'`
* 使用配置，在配置文件中指定loader
  ```javascript
  module.rules: [
    {
      test: /\.css$/, // 用于标识出应该被对应的loader进行转换的某个或某些文件
      use: [ // 表示进行转换时，应该使用哪个loader
        {loader: 'style-loader'},
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]
    }
  ]
  ```
* 内联
  - 在任何“import”方式中指定loader
  - 使用 ! 将资源中的loader分开
  - options为传递查询参数，如`?key=value`或`?{key:value}`
  ```javascript
  import Styles from 'style-loader!css-loader?modules!./styles.css'
  ```
* CLI
  ```bash
  webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
  ```
  对.jade文件使用jade-loader，对.css文件使用 style-loader 和 css-loader
*****
* 支持链式传递。链式loader按照相反的顺序执行。在执行中loader返回值传递给下一个loader
* [webpack loader](https://webpack.docschina.org/loaders/)
*****
* 样式处理
  - css-loader  预处理css文件
  - style-loader  将css插入到style标签中
  - less-loader
  - sass-loader
  - postcss-loader
* 图片等资源处理
  - file-loader   处理在模块中引入的文件（图片，字体等）
  - url-loader  将文件处理为base64编码，可以设置一个限制，当文件大于限制，则默认使用文件加载器。
  - [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) 提供图片压缩功能
* 数据处理(内置json处理)
  - csv-loader
  - xml-loader
* 将样式，图片等资源与模块放在一起，无需依赖于全局资源的/assets目录，使得代码更具备可移植性
*****

  - babel-loader
  - ts-loader
  - html-loader
  - vue-loader
  - 加载数据
* 其他loader

## plugins
插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。<br>
想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。
* [webpack plugins](https://webpack.docschina.org/plugins/)
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
  该插件生成一个HTML5文件，其中包含使用script引入的所有output输出的包
* [html-webpack-template](https://github.com/jaketrent/html-webpack-template)
  为html-webpack-plugin提供template
* [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
  在构建前清除文件
* [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)
  生成manifest.json文件，源文件与输出文件对应的键值对
* [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
  webpack4之前提取css文件
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
  webpack4提取css文件
* [DefinePlugin](http://www.css88.com/doc/webpack/plugins/define-plugin/)
  允许创建一个在编译时可以配置的全局变量

## resolve

* alias 给某一段路径配置一个别名，使得在import 或 require 时更加方便。

# 开发工具
* 监听
  - `webpack --watch`
  - {watch: true}
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  - 提供一个简单的web服务器，并且能够实时重新加载
  - {devServer: { contentBase: './dist' }}
  - webpack-dev-server --open
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
  - 把webpack处理后的文件传递给一个服务器。webpack-dev-server 在内部使用了它。
  - 可配合express server 使用。

# 热更新HMR
  不适用于生产环境，页面不用刷新，直接更改
* 启用HMR
  - {devServer:{hot: true}}
  - {plugins: [new webpack.NamedModulesPlugin(),new webpack.HotModuleReplacementPlugin()]}
  ```javascript
    if (module.hot) {
      module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
      })
    }
  ```

# 生产环境构建
一般在开发环境中会需要webpack-dev-server,devtool等开发工具，而生产环境更注重资源的优化等。为了区分开发环境和生产环境构建的差异，将配置划分为dev.js,prod.js和公共配置。
使用`webpack-merge`将配置合并
```bash
npm install --save-dev webpack-merge
```
webpack.common.js
```javascript
module.exports = {
  entry: '', // 入口
  output: {}, // 输出
  module: { // 公共loader
    rules: []
  },
  plugins: [] // 公共插件 clean,html...
}
```
webpack.dev.js
```javascript
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
})
```
webpack.prod.js
```javascript
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
  mode: 'production'
})
```
package.json
```javascript
script: {
  start: 'webpack-dev-serve --open --config webpack.dev.js',
  build: 'webpack --config webpack.prod.js'
}
```
## 指定环境
某些library与process.env.NODE_ENV环境变量相关联来觉得不同环境引入哪些资源。使用webpack内置的DefinePlugin为依赖定义这个变量。
```javascript
plugins:[
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]
```

# 参考资料
* [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack)
* [webpack doc](https://webpack.docschina.org/concepts/)
* [node package.json](https://docs.npmjs.com/files/package.json)
* [webpack 中文文档](http://www.css88.com/doc/webpack/)
