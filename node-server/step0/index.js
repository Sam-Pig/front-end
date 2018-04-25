var http = require("http");
var server = http.createServer(function(req,res){//内部会创建一个服务器
	console.log(req);
	res.setHeader("Content-Type","text/html;charset=utf-8");//权限最高
	res.writeHead(200,"good");
	res.write("<html><head><meta charset='utf-8'/></head><body>");
	res.write("<h1>你好</h1>");
	res.write("</body></html>");
	res.end();
});
server.listen(8080);//启动服务器，使这个服务器监听9000这个端口
