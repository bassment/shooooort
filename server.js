/* eslint strict: 0, no-console: 0 */

'use strict';

const path = require('path');
const express = require('express');
const proxy = require('http-proxy-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 6600 : process.env.PORT;
const app = express();

app.use(express.static('dist'));

app.use('/api', proxy({
  target: 'https://impraise-shorty.herokuapp.com',
  changeOrigin: true,
  pathRewrite: { '^/api/*': '/' },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
