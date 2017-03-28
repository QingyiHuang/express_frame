var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
//上面的代码启动一个服务并监听从 
//8080 端口进入的所有连接请求。
//他将对所有 (/) URL 或 路由 
//返回 “Hello World!” 字符串。
//对于其他所有路径全部返回 404 Not Found。