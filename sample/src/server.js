var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

function GetMime(req){
  var ext = path.extname((url.parse(req.url)).path);
  console.log(ext);
  if (ext === ".html"){
    return 'text/html';
  }
  if (ext === ".js"){
    return 'text/javascript';
  }
  return 'text/plain';
}

http.createServer(function (req, res) {
  var filePath = "." + url.parse(req.url).path;
  var mime = GetMime(req);
  console.log(filePath + " mime:" + mime);
  fs.readFile(filePath, function (err, data) {
    if (err){
      console.log("err:" + filePath);
      res.writeHead(404, { 'Content-Type': 'text/plain'});
      res.end("non file");
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });

}).listen(8080, '127.0.0.1');
