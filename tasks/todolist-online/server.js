var http = require('http')
var path = require('path')//path模块自行处理不同系统下的路径类型
var fs = require('fs')//fs模块负责读写文件
var url = require('url')//url模块解析URL，得到一些数据，就不必自己用正则进行提取了


function staticRoot(staticPath, req, res){
  console.log(staticPath)
  
  console.log(req.url)
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)
  
  
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'index.html'
  }
  

  

  var filePath = path.join(staticPath, pathObj.pathname)
  
  // var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent, 'binary')
  // res.end()
  
  
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()      
    }
  })
  

}

console.log(path.join(__dirname, 'static'))

var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'static'), req, res)//__dirname是nodejs里的一个自带变量，代表当前的这个文件
})

server.listen(8080)
console.log('visit http://localhost:8080' )



