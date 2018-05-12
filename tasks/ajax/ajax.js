
// XMLHttpRequest对象用来在浏览器与服务器之间传送数据。
var ajax = new XMLHttpRequest();
// 向指定的服务器网址，发出GET请求。
ajax.open("GET","http://www.baidu.com/page.php",true);
// 然后，AJAX指定回调函数，监听通信状态（readyState属性）的变化。
ajax.onreadystatechange = handleStateChange;


// 下面是XMLHttpRequest对象的典型用法
var xhr = new XMLHttpRequest();
// 指定通信过程中状态改变的回调函数
xhr.onreadystatechange = function() {
// readyState是一个只读属性，状态值为4，表示服务器数据已经完全接收，或者本次接收已经失败了
	if(xhr.readyState === 4){
		if(xhr.status === 200){//status为只读属性，表示本次请求所得到的http状态码，是一个整数，一般来说，如果成功，这个状态码为200
			console.log(xhr.responseText);//respnseText属性返回从服务器接收到的字符串，该属性只读
		}else{
			console.log(xhr.statusText);//ststusText属性只读，返回一个字符串，表示服务器发送的状态提示。不同于status，该属性包含整个状态信息，比如”200 OK“
		}
	}
};
xhr.onerror = function(e) {
	console.log(xhr.statusText);
};
//open方式用于制定http动词、请求的网址、是否异步
xhr.open("GET","/endpoint",true);
//发送http请求
xhr.send(null);



//写一个AJAX
var xhr2 = new XMLHttpRequest();
xhr2.open("GET","http://www.example.com/a.php",true);
xhr2.onreadystatechange = function() {
	if(xhr2.redyState ===4){
		if((xhr.status >= 200 && xhr.status <300) || xhr.status ==304){
			//成功了
			console.log(xhr2.responseText);
		}else{
			console.log("服务器异常");
		}
	}
};
xhr2.onerror = function() {
	console.log("服务器异常")
};
xhr2.send();



// 换种写法
var xhr3 = new XMLHttpRequest();
xhr3.open("GET","http://www.example.com/a.php",true);
xhr3.onload = function() {
	if((xhr3.status >= 200 && xhr3.status <300) || xhr3.status == 304){
		console.log(xhr3.responseText);
	}else{
		console.log("服务器异常");
	}
};
xhr3.onerror = function() {
	console.log("服务器异常");
};
xhr3.send();


//post的使用
var xhr4 = new XMLHttpRequest();
xhr4.timeout = 3000;//设置请求的超时时间
xhr4.open("POST","/regsiter",true);
xhr4.onload = function() {
	if((xhr4.status >= 200 && xhr4.status < 300) || xhr4.status == 304){
		console.log(xhr4.responseText);
	}else{
		console.log("服务器异常");
	}
};
xhr4.ontimeout = function() {
	console.log("请求超时");
};
xhr4.onerror = function() {
	console.log("连接失败");
};




// 封装一个AJAX
function ajax(opts) {
	var url = opts.url;
	var type = opts.type || "GET";
	var dataType = opts.dataType || "json";
	var onsuccess = opts.onsuccess || function() {};
	var onerror = opts.onerror || function() {};
	var data = opts.data || {};

	var dataStr = [];
	for(var key in data){
		dataStr.push(key = "=" + data[key]);
	}
	dataStr = dataStr.join("&");
	if(type === "GET"){
		url += "?" + dataStr;
	}
	var xhr = new XMLHttpRequest();
	xhr.open(type,url,true);
	xhr.onload = function() {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
			if(dataType === "json"){
				onsuccess(JSON.parse(xhr.responseText));
			}else{
				onsuccess(xhr.responseText);
			}
		}else{
			onerror();
		}
	};
	xhr.onerror = onerror;
	if(type === "POST"){
		xhr.send(dataStr);
	}else{
		xhr.send();
	}
}

ajax({
	url:"http://api.jirengu.com/weather.php",
	data: {
		city: "北京"
	},
	onsucess: function(ret) {
		console.log(ret)
	},
	onerror: function() {
		console.log("服务器异常")
	}
})



// mock方法：
// 使用 http://easy-mock.com/
// 使用 http://rapapi.org/org/index.do
// 使用 server-mock