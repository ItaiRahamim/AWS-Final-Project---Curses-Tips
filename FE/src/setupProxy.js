const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const target = process.env.REACT_APP_API_URL || `http://localhost:${process.env.API_PORT || 3010}`;

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    })
  );
};


