// 异步篇
// 目录

	// 1 同步与异步
	// 2 前端经常遇到的异步
	// 3 面试题中的异步
	// 4 AJAX中的异步
	// 5 异步的形式
	// 6 回调的形式
	// 7 如何处理异常？
	// 8 自己返回Promise
	// 9 async/await




/*------------------------------------------------------------------------------------------------------------*/
// 1 同步与异步
// 简单来讲，就是一个等待结果，一个不等待结果。

	// 同步的sleep
	function sleep(seconds){
		var start = new Date()//记录下当前时间
		while(new Date() - start < seconds *1000){//判断是否过了seconds秒。JS脚本会高频做这件事，不存在说它会停下来等这件事。

		}
		return
	}
	console.log(1)
	sleep(3)//等3秒，之前，后面的语句不会执行，因为单线程的JS已被sleep函数占用了。
	console.log('wake up')
	console.log(2)

	// 异步的sleep
	function sleep(seconds,fn){
		setTimeout(fn, seconds * 1000)//让浏览器来负责计时，到时间浏览器会来调用函数，这一过程没有JS引擎什么事，这与同步大为迥异。
	}
	console.log(1)
	sleep(3, () => console.log('wake up'))//交给浏览器托管了。
	console.log(2)//不会等上面一句，直接执行。

	// 时序图。
	// 有两个并行的进程，一个是JS脚本，一个是浏览器。异步就是把部分事情委托给浏览器，接下来的JS代码继续不等待执行。



/*------------------------------------------------------------------------------------------------------------*/
// 2 前端经常遇到的异步


	document.getElementsByTagName('img')[0].width//第一次执行宽度为0
	console.log('done')

	// 解决办法，就是考虑到浏览器获取到img后，会触发事件load，这样将事件绑定函数来执行，就可以实现异步操作
	var img = document.getElementsByTagName('img')[0]
	img.onload = function(){
		var w = img.width
		console.log(w)
	}
	console.log('done')
	// 本质上，类似于之前的绑定闹钟，这里也是绑定一个可以判定事件结束与否的“闹钟”。
	// 这也叫做“回调”。



/*------------------------------------------------------------------------------------------------------------*/
// 3 面试题中的异步

	var liList = document.querySelectorAll('li')
	for(var i = 0; i < liList.length; i++){//var i 会变量提升，这个i是贯穿始终的一个i。
		liList[i].onclick = function(){//循环不会等这个监听函数的，这是一个异步过程，大约3ms，直到循环判定结束，i是多少就是多少，与onclick无关了。
			console.log(liList[i])		
		}
	}

	// 解决方案：用let
	// let在每次循环时都会产生一个“影分身”，也就是绑定事件函数的i，其实不是全局作用域下的那个i（let封闭了自己的作用域），而是各自的i。
	var liList = document.querySelectorAll('li');
	for(let i = 0; i < liList.length; i++){
		liList[i].onclick = function(){
			console.log(i);
		};
	}



/*------------------------------------------------------------------------------------------------------------*/
// 4 AJAX中异步
	
	// 同步AJAX
	let request = $.ajax({
		url: '.',
		async: false//同步AJAX，在等待AJAX响应过程中，页面不能进行任何操作，很垃圾的写法
	})
	console.log(request.responseText)

	// 异步AJAX
	$.ajax({
		url: '.',
		async: true,
		success: function(e){
			console.log(e)
		}
	})
	console.log('请求发送完毕！')//不会等待AJAX响应完成，直接执行此句



/*------------------------------------------------------------------------------------------------------------*/
// 5 异步的形式
// 如何拿到异步代码的结果？
// 一般有两种方式：
// 1、傻逼方法：轮询；
// 2、正规方法：回调。

	// 5.1 轮询 ---------------------------------------------------------------------------------
	function buyFruit(){
		setTimeout(() => {
			window.fruit = '买到了水果'
		}, Math.random() * 10 * 1000)
	}
	buyFruit.call()

		// window.fruit
		// window.fruit
		// window.fruit
		// ...//手动不断轮询...很智障

 	// 用函数自动化轮询
	var intervalId = setInterval(() => {
		if(window.fruit){
			console.log(window.fruit)
			window.clearInterval(intervalId)
		}else{
			console.log('桌面上没有水果')
		}
	}, 1000)
	// 但是这样仍然很蠢！


	// 5.2 回调 -----------------------------------------------------------------------------------

	function buyFruit(fn){
		setTimeout(() => {
			fn.call(null,'买到了水果')
		}, Math.random() * 10 * 1000)
	}
	buyFruit(function(){
		console.log(arguments[0])
	})
	// 在前端人员知道回调之后，基本上就不会去用轮询了，因为后者很傻逼。

	function getYears(fn){
		setTimeout(function(){
			fn.call(undefined,1994,09)
		}, Math.random() * 10 * 1000)
	}
	getYears(function(){
		console.log('出生年月：' + arguments[0] + ',' + arguments[1])
	})//'出生年月：1994,9'




/*------------------------------------------------------------------------------------------------------------*/
// 6 回调的形式

	//在异步程序里安置一个随机器，既可能返回成功，也可能返回失败
	function buyFruit(fn){
		setTimeout(function(){
			if(Math.random() > 0.5){
				fn.call(undefined, true)
			}else{
				fn.call(undefined, new Error())
			}
		}, Math.random() * 10 * 1000)
	}
	buyFruit(function(e){
		if(e instanceof Error){
			console.log('fail')
		}else{
			console.log('success')
		}
	})


	// 6.1 node.js的error-first形式 -----------------------------------------------------------------


	// 6.2 jQuery的success/error形式 ---------------------------------------------------------------







	// 6.3 jQuery的done/fail/always形式 ------------------------------------------------------------








	// 6.4 Prosmise的then形式 ----------------------------------------------------------------------














