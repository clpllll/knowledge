const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const path = require('path');
// app.use('/static', express.static(path.join(__dirname, '../dist/static')));
app.use('/js', express.static(path.join(__dirname, '../dist/js')));
app.use('/css', express.static(path.join(__dirname, '../dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '../dist/fonts')));
const indexPath = path.join(__dirname, '../dist/index.html');
app.use('/api', proxy({ target: "http://127.0.0.1:3006", pathRewrite: { '/api': "" }, changeOrigin: true }));
app.get('/*', function (_, res) { res.sendFile(indexPath) });
const server = app.listen(8080, function () {
  const host = server.address().host;
  const port = server.address().port;
  console.log('listen at http:%s:%s',host,port)
})