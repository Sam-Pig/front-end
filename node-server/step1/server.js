var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var server = http.createServer(function(req, res){
	staticRoot(path.join(__dirname, 'static'), req, res)
})
server.listen(8080)


function staticRoot(staticPath, req, res) {
	var pathObj = url.parse(req.url ,true)

	if(pathObj.pathname === '/'){
		pathObj.pathname += 'index.html'
	}

	var filePath = path.join(staticPath, pathObj.pathname)
	












}