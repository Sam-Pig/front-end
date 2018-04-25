var ajax = new XMLHttpRequest();
ajax.open("GET","URL",true);
ajax.onreadystatechange = function() {
	if(ajax.readyState === 4){
		if((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304){
			console.log(ajax.responseText);
		}else{
			console.log("server error")
		}
	}
};
ajax.onerror = function() {
	console.log("server error")
};
ajax.send();


function ajax(opts) {
	var url = opts.url,
		type = opts.type || "GET",
		dataType = opts.dataType || "json",
		onsuccess = opts.onsuccess || function(e){console.log(e)},
		onerror = opts.onerror || function(){console.log("server error!")},
		data = opts.data || {},
		dataStr = [];
	for(var key in data){
		dataStr.push(key += "=" + data[key]);
	}
	dataStr = dataStr.join("&");
	if(type === "GET"){
		url += "?" + dataStr;
	}
	var xhr = new XMLHttpRequest();
	xhr.open(type,url,true);
	xhr.onload = function() {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			if(dataType === "json"){
				onsuccess(JSON.parse(xhr.responseText));
			}else{
				onsuccess(xhr.responseText);
			}
		}else
	};
}