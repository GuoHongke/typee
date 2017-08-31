// 本配置文件为webpack客户端代码配置文件
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 导出客户端配置
module.exports = {
  // 调试工具
  devtool: 'eval-source-map',
  // 入口文件
  entry: ['./src/client/index.jsx', './src/client/style.less'],
  // 打包类型
  target: 'web',
  // 输出配置
  output: {
    // 输出路径
    path: path.resolve(__dirname, 'public'),
    // 输出文件名
    filename: 'bundle.client.js',
  },
  // 配置解析模块请求
  resolve: {
    // 使用到的扩展名
    extensions: ['.js', '.json', '.jsx', '.css', '.less'],
  },
  // 配置相关模块
  module: {
    // 模块规则
    rules: [{
      // 要匹配的文件类型
      test: /\.jsx?$/,
      // 要使用的加载器
      loader: 'babel-loader',
      // 加载选项
      options: {
        presets: ['es2015', 'react'],
      },
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'less-loader'],
      })
    }],
  },
  // 插件配置
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
