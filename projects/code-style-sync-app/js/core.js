var code = `
body {
	background: red;
}
p {
	color: green;
}
`
var n = 0;
setInterval(function(){
	content.innerHTML = code.substring(0,n);
	style.innerHTML = code.substring(0,n);
	n += 1;
},100);