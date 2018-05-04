// 函数篇
// 目录
	// 1 定义
	// 2 词法作用域
	// 3 call stack
	// 4 this & arguments
	// 5 call/apply
	// 6 bind
	// 7 return
	// 8 柯里化/高阶函数
	// 9 回调
	// 10 构造函数



/*--------------------------------------------------------------------------------------------*/
// 1 定义：函数声明方式
	//1.1 匿名函数---------------------------------------------------
	var fn = function() {//它是匿名函数，但是它和具名函数一样，有name
		return 1
	}
	var fn2 = fn

	fn.name//fn
	fn2.name//fn


	// 1.2 具名函数--------------------------------------------------
	function fn3() {//fn3是个变量，其作用域是其所在作用域
		return 3
	}
	var fn5 = function fn4() {//fn4的作用域只在函数本身
		return 4
	}
	console.log(fn4)//fn4 is not defined
	console.log(fn3)//当做字符串打印fn3

	// 1.3 箭头函数----------------------------------------------------
	var fn6 = e => e + 1
	fn6(7)//8
	var fn7 = (i,j) => i+j
	fn7(10,11)//21
	var fn8 = (i,j) => {console.log(i,j); return i+j}//没有分号，万万不行
	fn8(2,6)//8


/*--------------------------------------------------------------------------------------------*/
// 2 词法作用域(静态作用域)
// 先解析，后执行

	var global1 = 1
	function fn1(param1){
	    var local1 = 'local1'
	    var local2 = 'local2'
	    function fn2(param2){
	        var local2 = 'inner local2'
	        console.log(local1)
	        console.log(local2)
	    }

	    function fn3(){
	        var local2 = 'fn3 local2'
	        fn2(local2)
	    }
	}
	 //浏览器看到以上这段代码不会马上执行，它会先生成抽象语法树；
	 // 从window往下，逐级看声明的变量，整理其上下级关系，生成语法树；
	 // 变量先从调用处所在作用域开始查找，逐级往上，直至全局作用域（如果没有还是没有找到，返回undefined）；
	 // 一个函数能访问哪些变量，在你作词法分析时就已经确定了，与你调用与否无关。


	// 词法分析仅仅是确定变量是哪一个，而绝不能确定变量的值！
	// 如以下代码：
	var a = 1
	function b(){
		console.log(a)//a是变量，没有调用时永远不知道它的值
	}
	a = 2
	b()//2

	// 另外，函数有没有形参很重要！
	function a(c){
		console.log(c)
	}
	function b(){
		console.log(c)
	}
	var c = 123
	a()//undefined
	b()//123



/*--------------------------------------------------------------------------------------------*/
// 3 call stack（调用堆栈）
// stack（栈）先进后出
// call-stack 记录你从哪里离开，设锚点，直至执行结束，取消锚点

	// 3.1 普通调用 1+1+1   -------------------------------------------------
	function a(){
	    console.log('a')
	  return 'a'  
	}

	function b(){
	    console.log('b')
	    return 'b'
	}

	function c(){
	    console.log('c')
	    return 'c'
	}

	a()
	b()
	c()


	// 3.2 嵌套调用 1>2>3   --------------------------------------------------
	// 盗梦空间，层层嵌套
	function a(){
	    console.log('a1')
	    b()
	    console.log('a2')
	  return 'a'  
	}
	function b(){
	    console.log('b1')
	    c()
	    console.log('b2')
	    return 'b'
	}
	function c(){
	    console.log('c')
	    return 'c'
	}
	a()
	console.log('end')


	// 3.3 递归  --------------------------------------------------------------
	// 斐波拉契数列
	function fab(n){
	    console.log('start calc fab '+ n)
	    if(n>=3){
	        return fab(n-1) + fab(n-2)
	    }else{
	        return 1
	    }
	}

	fab(5)

	// 一句话总结，JS是单线程的，进入函数时有可能会忘掉从哪里进入的，所以要记录下进入的锚点；
	// 而之后有可能存在多次进入（相同或者不同的）函数，所以记录下来的锚点有若干个，按顺序放在call-stack里，call-stack里的锚点数据符合先进后出的原则。


/*--------------------------------------------------------------------------------------------*/
// 4 this & arguments
// call stack时，即进入一个函数的时候，除了要记录这个函数的地址，还要记录一个东西，那就是这个函数的参数。


	// 4.1 重要：this就是call的第一个参数，call的其他参数统称为arguments ------------
	function f(){
	    console.log(this)
	    console.log(arguments)
  	}
  	// call === 调用。call一个函数，要准备两样东西，一样是叫做this的对象，一样是一个叫做arguments的伪数组。
	f.call() //window,[] 
	// 如果传参，this就是 window，arguments就是[]
	f.call({name:'sam'}) // {name: 'sam'}, []
	f.call({name:'sam'},1) // {name: 'sam'}, [1]
	f.call({name:'sam'},[1,2]) // {name: 'sam'}, [[1,2]]
	f.call(null,1,2,3,4,"this",true,false,null,undefined)//window,[1,2,3,4,"this",true,false,null,undefined]

	// f()是阉割版的f.call()，当你用前者时，参数直接被包装进了arguments里了，而this永远无法指定，只能靠浏览器去猜！
  	f()//window,[] 
  	f(1,2,3)//window,[1,2,3]


	// 4.2 this是隐藏的第一个参数，且必须是对象 ------------------------------------

	f.call(10,1)//Number {10},[1]
	// 数字10被new Number(10)了。
	//this必须是一个对象，如果call的第一个实参传的不是对象，那么，它将被转化成对象。



	// 4.3 this为什么必须是对象？ ------------------------------------------------
	// 因为this就是函数与对象之间的羁绊。
	// 假设JS世界里面没有this:
	var person = {
		name: 'sam',
		sayHi: function(person){
			console.log('Hi, I am' + person.name)
		},
		sayBye: function(person){
			console.log('Bye, I am' + person.name)
		},
		say: function(person, word){
			console.log(word + ', I am' + person.name)
		}
	}
	// 那么必须这么调用函数
	person.sayHi(person)
	person.sayBye(person)
	person.say(person, 'How are you')

	// 很low！能不能变成
	person.sayHi()
	person.sayBye()
	person.say('How are you')

	// JS之父出于人性化的考虑，决定设计一个方案，解决这个问题,这个方案就是this。
	// this是一颗语法糖。
	var person = {
		name: 'sam',
		sayHi: function(){
			console.log('Hi, I am' + this.name)
		},
		sayBye: function(){
			console.log('Bye, I am' + this.name)
		},
		say: function(word){
			console.log(word + ', I am' + this.name)
		}
	}

	// 用call的角度来理解
	person.sayHi() === person.sayHi.call(person)
	person.sayBye() === person.sayBye.call(person)
	person.say('How are you') === person.say.call(person, 'How are you')

	person.sayHi.call({name:jack})//'Hi, I am jack'
	// 这说明函数sayHi是独立存在的，即便它被包装在对象person里面，但实质上与对象person并无一毛钱关系。
	// 如果硬是要说他们之间有关系，那就是因为this的存在。
	// this存在的意义，就是让函数有一个可以依托的对象（实际上是没有的）。
	// 如果我们都用call写法，而不是阉割的太监写法，那么JS世界会更美好！


	



/*--------------------------------------------------------------------------------------------*/
// 5 call/apply
//当不确定参数个数，或者参数过长，或参数为一个数组时，用apply

	function sum(x,y){
		return x+y
	}
	sum.call(null,1,2)//3
	sum.call(1,2)//NaN
	sum.call()//NaN

	// 如果形参个数不确定呢？
	function sum(){
		var n = 0
		for(var i = 0; i < arguments.length; i++){
			n += arguments[i]
		}
		return n
	}
	sum(null,1,11,111,1111)//1234
	sum(null,[1,11,111,1111])//"01,11,111,1111"，因为0 + [1,11,111,1111] == "01,11,111,1111"
	var arr = [1,11,111,1111,11111,111111]
	sum.apply(null,arr)//123456




/*--------------------------------------------------------------------------------------------*/
// 6 bind
// call和apply都是调用函数同时制定this和arguments，而bind是返回一个新的函数（并没有调用原来的函数）；
// 
	var view = {
		element: $('#div1'),
		bindEvent: function(){
			this.element.onclick = function(){//这行的this，只能说按照人们的使用习俗（view.bindEvent())，大概率是指view对象,实际上只由call时确定。
				this.onClick()//而这个this，按照文档，应该是触发这个事件的元素，也就是div1。当然，实际上，只是call这个匿名函数时传入的第一个参数。反正，大概率不是view对象！
			}
		}
		onClick: function(){
			...
		}
	}
	// 有人为达目的，就强行固定this：
	var view = {
		element: $('#div1'),
		bindEvent: function(){
			var _this = this//强行固定
			this.element.onclick = function(){
				_this.onClick()
			}
		},
		onClick: function(){
			...
		}
	}
	// stupid!
	// 还不如这样
	var view = {
		element: $('#div1'),
		bindEvent: function(){
			this.element.onclick = function(){
				view.onClick()
			}
		},
		onClick: function(){
			...
		}
	}
	//JS之父看不下去了，就又发明了一颗语法糖：bind，来实现上述的功能。
	var view = {
		element: $(#'div1')
		bindEvent: function(){
			this.element.onclick = this.onClick.bind(this)//bind会造出一个函数，这个函数会包住前面的语句this.onClick，并且用this来call这个函数。
		}
		onClick: function(){
			...
		}
	}



/*--------------------------------------------------------------------------------------------*/
// 7 柯里化/高阶函数
// 
	// 7.1 柯里化，就是把一个多元函数的某一变量固定下来，进而得到了一个偏函数。--------------
	function sum(x,y){
		return x + y
	}
	function addOne(x){
		return sum(x,1)
	}

	var Handlerbar = function(template, data){
		return template.replace('{{name}}',data.name)
	}
	Handlerbar('<h1>Hi I am {{name}}</h1>',{name:'sam'})//"<h1>Hi I am sam</h1>"
	// 声明变量来简化
	var template = '<h1>Hi I am {{name}}</h1>'
	Handlerbar(template,{name:'jack'})//"<h1>Hi I am jack</h1>"

	//函数式编程不会频繁地去声明变量，可以考虑直接分两步走。先确定template，定下来一个函数，再确定data，得到结果。
	function HandlerbarCurrying(template){
		return function(data){
			return template.replace('{{name}}',data.name)
		}
	}
	var t = HandlerbarCurrying(template)//这一步其实什么也没做，只是返回了一个函数。
	t({name:'rose'})//"<h1>Hi I am rose</h1>"
	// 这样叫做:惰性求值。


	// 7.2 高阶函数，是指接受（一个或多个）函数输入，或者输出函数，或者二者兼具的函数。---------

		// 7.2.1 接受一个或多个函数作为输入：forEach sort map filter reduce
			array.sort(function(a,b){a-b})
			array.forEach(function(a){})
			array.map(function(){})
			array.filter(function(){})
			array.reduce(function(){})

		// 7.2.2 输出一个函数：lodash.curry

		// 7.2.3 同时满足两个条件：Function.prototype.bind
			fn.bind.call(fn,{},1,2,3)//bind()也是辟邪剑谱的写法，这是全经的写法。call()里的函数fn,代表bind要包装的父函数fnFather的里面内容，{}表示要fnFather.call({})。



		// 高阶函数的一个重要的作用：可以将函数任意的组合！************************************

		var array = [1,2,3,4,5,6,7,8,9,10]
		// 试求array里所有偶数的和
		// 常规解法：
		var sum = 0
		for(var i = 0; i < array.length; i++){
			if(array[i] % 2 = 0){
				sum += array[i]
			}
		}
		console.log(sum)//30

		// 其他解法

		// 面向对象的写法：
		array.filter(function(n){return n % 2 === 0}).reduce(function(p,n){return p + n}, 0)

		// 函数式的写法：
		
		Array.prototype.reduce.call(Array.prototype.filter.call(array, function(n){return n % 2 === 0}), function(p,n){return p + n}, 0)// 为什么总是显示reduce是undefined呢？难道非要加上Array.prototype？

		// 高阶函数语法流畅，观感很优美，而且函数式编程可以方便实现组件之间的转换，因为每个组件基本上都可以用一个高阶函数来表达。
		// 函数编程就是只使用纯函数与不可改变的值来撰写软体应用的一种方式。
		// 所有的React组件必须运作得就像相对于它们props(属性)的纯函数。




/*--------------------------------------------------------------------------------------------*/
// 8 回调函数(callback function)
// 名词形式：被当做参数的函数就是回调函数；
// 动词形式：调用这个回调参数（函数）；
// 回调和异步没有任何关系。

setTimeout(fn.bind(obj),1000,1,2)//异步回调




/*--------------------------------------------------------------------------------------------*/
// 9 构造函数
// 返回对象的函数就是构造函数。
// 一般首字母大写。
 
new Number(1)
String(2)




// 自己写一个构造函数
function Empty(){
	this.name = 'empty'
	return this
}
var empty = Empty.call({})

// 等同于
function Empty(){}
var empty = new Empty()



/*--------------------------------------------------------------------------------------------*/
// 10 箭头函数

function fn(x,y){
	return x+y
}
// 等同于
var fn = (x,y) => {return x+y}

// 箭头函数最大的区别，是它没有this！
setTimeout(function(){console.log(this)}.bind({name:'sam'}),1000)//{name: "sam"}
setTimeout(function(){console.log(this);setTimeout(function(){console.log(this)},1000)}.bind({name:'sam'}),1000)//{name: "sam"},window
setTimeout(function(){console.log(this);setTimeout(function(){console.log(this)}.bind(this),1000)}.bind({name:'sam'}),1000)//{name: "sam"},{name: "sam"}
// 以上是旧的方式。
// 当用了箭头函数以后
setTimeout(function(){
	console.log(this)
	setTimeout(() => console.log(this),1000)
}.bind({name:'sam'}),1000)//{name: "sam"},{name: "sam"}
// 对于箭头函数来说，this就是一个词法变量，它自身是不含有隐含参数this的，它只会按照作用域链法则去分析这个this。
// 但是还是有arguments的。

// 当然，call语法也失效了。
var fn = () => {console.log(this)}
fn.call({name:"sam"})//window
fn.call(null,1,2,3)//window




// 关于return:   ********************************************************
// 每个函数都有return，若未明文指定return什么，则函数会自行return undefined。





/*----------------------------------------------------------------------------------------------------------------------------*/
// 思考题：
// 请写出一个柯里化其他函数的函数 curry，这个函数能够将接受多个参数的函数，变成多个接受一个参数的函数，具体见示例（这是 lodash.curry 的文档示例）：

function curry(???){
    ???
    return ???
}
var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]
