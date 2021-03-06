import path from 'path';
import React from 'react';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import cookieParser from 'cookie-parser';
import { Provider } from 'react-redux';
import reducer from '../reducer';
import routes from '../client/routes';
import webpackClientConfig from '../../webpack.client.config';

// 创建服务器实例
const app = express();
// 创建store
const store = createStore(reducer, {});
// webpack配置文件
const compiler = webpack(webpackClientConfig());

// 设置视图引擎
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV === 'development') {
  // 客户端热加载
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackClientConfig().output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

// 设置静态资源服务器
app.use('/', express.static(path.join(__dirname, '../..', 'public'), { maxAge: '7d' }));

// 设置cookie
app.use(cookieParser());

// 路由设置
app.get('*', (req, res) => {
  const context = {
    cookies: req.cookies,
  };
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
  );

  // 服务端渲染
  res.render('index', {
    title: 'Typee-稳步提高打字速度',
    content,
    preloadState: JSON.stringify(store.getState()),
  });
});

// 监听服务器3000端口
app.listen(3000);
