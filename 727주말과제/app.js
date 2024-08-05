const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const exp = require('constants');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'mainpage.html'));
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get('port')}`);
});
