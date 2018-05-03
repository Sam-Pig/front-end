// OOP篇
// 目录
	// 1 面向对象解决的问题
	// 2 对象与对象的关系
	// 3 对象与函数的关系
	// 4 new
	// 5 继承


// 绪论
	// 在面向对象的领域里面，是没有函数的。
	// 程序员的世界里有两大宗教，一个叫“面向对象教”，一个叫“函数式教”。
	// 函数式教，教义里是存在对象的，但是面向对象教里是没有函数的。
	// 面向对象教里的核心，是“类”。
	// 如果一个东西返回了一个对象，那么这个东西就叫做类。
	// 如果一个函数返回了一个对象，那么这个函数就叫做构造函数。
	// 所以，其实，类和构造函数，二者是一个东西。



/*--------------------------------------------------------------------------------------------------------------*/
// 1 面向对象解决的问题
// 面向对象有三面红旗：封装、继承和多态。
	
	// 1.1 封装 ------------------------------------------------------------------------------
	// 封装----隐藏细节----优雅的API----便于合作和传播（对别人）、缓解思维负担（对自己）
	// 但是这些函数也可以做到，这不是OOP教的专利。


	// 1.2 继承 ------------------------------------------------------------------------------
	// 继承----复用----同上----DialogWindow extend Window----Window有的我都有（但这不是JS能做到的）



	// 1.3 多态 -------------------------------------------------------------------------------
	// 多态----灵活----同时是不同的东西----div.childNodes----div.children
	// 函数也可以----animate({},'fast',2000)


// 但面向对象解决的问题，并不是这三面红旗，而是：写代码的套路问题（定势思维）。
// 你要做的，就是不要思考，有什么问题就往上靠就行了，这是宗教信仰问题，是立场问题。




/*--------------------------------------------------------------------------------------------------------------*/
// 2 对象与对象的关系
// 先看看JS世界里有什么？再来看看JS是如何实现面向对象的。


	// 2.1 JS世界里有什么？ ----------------------------------------------------------------------

	// 最简单的，JS世界里有7种数据类型：
	// number、string、boolean、undefined、null、symbol（6种基本数据类型----存值）
	// object（1种复杂类型----引用类型----存地址----当然本质也是存值）

	// object可以分为 普通对象、数组（下标固定）、函数 3种。



	// 2.2 当我们声明一个object的时候，我们到底在做什么？ ---------------------------------------------

	// 答：在栈内存（stack）里存了一个地址，地址所指向的地方，存储着对象内容键值对。

	// 但是toSting方法和valueOf方法是怎么出来的？ 
	// 声明一个对象后，对象指向的地方保存的键值对中，会自动添加一个键值对__proto__:××××，这是一个对象的地址。

		// JS世界，之所以要发明原型链的原因很简单，因为要节省内存！

	// 可以在__proto__上自定义属性和方法，当调用对象时，如果找不到自定义的这些属性和方法，那么，对象就会沿着__proto__去找。

	// __proto__是天生就存在与JS世界的内存当中的，不因为声明了对象与否而转移，它的地址，被文档规定必须存在于一个对象：Object(同时也是一个函数）里。 
	// window.Object.prototype就可以访问__proto__。改变__prpto__，那么对于其他对象都会产生影响。
	
	// 这是继承也是实例化，当然，JS没有类，所以其实不用分得那么清除。

		// 实际工程中，不要随意访问__proto__，会降低性能。



	// 2.3 原型链可以实现多层次吗？

	// 当然可以。
	// 详细参见prototype.png
	// JS的数据结构，是 树。
		// 推荐一本书《大话数据结构》





/*--------------------------------------------------------------------------------------------------------------*/
// 3 对象与函数的关系
// JS的重中之重是函数，函数怎么讲都是不为过的。

	// 3.1 函数是什么？ ---------------------------------------------------------------------------

	// 答：函数是一种可执行代码组成的对象。
 	
 	var obj = {
 		name: 'f',
 		length: 2,
 		params: ['x','y'],
 		functionBody: 'console.log("helo world")'
 	}
 	objGong = {
    	call: function(x){
        	eval(x.functionBody)
	    }
	}
	obj.__proto__ = objGong
	obj.call(obj)//"hello world"
	// 所以，所谓函数，其实就是一段可以eval的字符串。
	// 所谓call（执行）函数，其实就是把这段字符串给eval一下。
	// 所以，为什么要推荐用call方法而不是用阉割版的括号，现在可以明白了。


	// 3.2 函数是如何一步步堕落的？ ------------------------------------------------------------------

	// 此时，函数很单纯，他是一等公民。
	function sayName(x){
		console.log('I am ' + x)
	}
	sayName('Sam')//I am Sam


	// 现在，对象非要把函数拉进直接的体系里，但是，他们之间仍然是没有什么苟合。
	// 对象里只是保存了函数sayName的地址罢了。
	var obj = {
		name: 'Sam',
		sayName: function(x){
			console.log('I am ' + x)
		}
	}
	obj.sayName(obj.name)//I am Sam


	// 函数做出了让步，二者似乎有些关联了（但其实仍然没有实质关联）。
	// 这一切，都是因为JS的函数，原本很纯，纯到只接受括号里的参数，只返回一个值，而不接受其他任何东西。
	// 函数没有办法获取.之前的东西，因为，它就是那么单纯，那么美好。
	var obj = {
		name: 'Sam',
		sayName: function(x){
			console.log('I am ' + x.name)
		}
	}
	obj.sayName(obj)//I am Sam
	obj.sayName()//Uncaught TypeError: Cannot read property 'name' of undefined



	//受迫讨喜于Java程序员，JS之父发明this，函数不再单纯了。
	var obj = {
		name: 'Sam',
		sayName: function(){
			console.log('I am ' + this.name)
		}
	}
	// 一般写法：
	// 隐式传入obj，玩家视角，讨好Java程序员，前端小白
	obj.sayName()//I am Sam

	// 智障写法：
	obj.sayName(obj)//I am Sam

	// 推荐写法--使用没有魔法的纯函数：
	// 显示传入obj，上帝视角，JS之父的真爱，中级前端
	obj.sayName.call(obj)//I am Sam




	// 3.3 爸爸去哪了？--函数的迷思 ----------------------------------------------------------

	var father = {
		name: 'Mayun',
		child: {
			name: 'Sicong',
			sayName: function(){
				console.log(this.name)
			}
		}
	}
	father.child.sayName()//Sicong
	father.child.sayName.call()//空
	father.child.sayName.call(undefined)//空
	// 如果什么都不传，this在浏览器环境下是window。


	// 当然，在严格模式下，则会报错。
	var father = {
		name: 'Mayun',
		child: {
			name: 'Sicong',
			sayName: function(){
				'use strict'
				console.log(this.name)
			}
		}
	}
	father.child.sayName()//Sicong
	father.child.sayName.call()// Uncaught TypeError: Cannot read property 'name' of undefined

	// 寻找真爸爸
	father.child.sayName.call({name:'Wangjianlin'})//Wangjianlin


/*--------------------------------------重要结论--------------------------------------------------*/
			// 经典三段论：
				// 1、参数的值只有在传参的时候才能确定；
				// 2、this是函数的第一个参数；
				// 结论：this的值只有在传参的时候才能确定！


			// 面试题
			// 指出以下情况下this的值

			function a(){
				console.log(this)
			}
			// 不确定


			function a(){
				console.log(this)
			}
			a()//window||global



			function a(){
				'use strict'//别乱搞
				console.log(this)
			}
			a()//undefined



			function a(){
				'use strict'
				console.log(this)
			}
			var obj = {
				sayThis: a
			}
			obj.sayThis()//这个对象本身
			obj.sayThis.call()//undefined（因为在严格模式下）
			obj.sayThis,call(1)//1


		/*--------------------------------------以下都是错的----------------------------------------------*/

			button.onclick =function(){
				console.log(this)
			}
			//按照MDN文档，this值一定是触发事件的元素，否则就是bug。


			$('#button').on('click',function(){
				console.log(this)
			})
			// 按照jQuery文档，对于直接事件而言，this代表绑定的元素。
			// 只有两种方式可以确定this
			// 一个是看官方文档，一个是控制台
				// 附：前端开发中文文档导航 cndevdocs.com


			$('ul').on('click','li',function(){
				console.log(this)
			}// 按照jQuery文档，对于事件代理而言，this代表与selector相匹配的元素（即li）。



			new Vue({
				data: function(){
					console.log(this)
				}
			})
			// Vue文档：this指new出来的对象

		/*--------------------------------------以上都是错的-----------------------------------------------*/




	// 3.4 拨乱反正 ---------------------------------------------------------------------------

	// this的最大特性，就是不确定性。
	// 在ES6，JS痛改前非、拨乱反正，利用箭头函数彻底抹杀了this的特殊地位，这说明JS走出了自己的一条路，已不是当年依附在Java羽翼下的小脚本语言了。
	var f = () => {console.log(this,arguments[0])}//this和arguments都被废了，只能显示地传入参数
	f()//window
	f.call(1,2,3)// Uncaught ReferenceError: arguments is not defined
	// call()的第一个参数已经被禁用了



	// 关于bind --------------------------------------------------------------------------------

	var foo = function(){
		console.log(this)
		console.log(arguments[0])
	}
	foo.bind(1,2).call()//Number {1}, 2
	foo.call()//window, undefined

	// 可见，bind是创建了一个新函数，而不改变原始函数的。





/*--------------------------------------------------------------------------------------------------------------*/
// 4 new
// new 是基于一个很简单的需求----批量创建对象 而出现的。

	// 从建造一个兵营说起
	var soldiers = []
	var soldier
	var soldier_common = {
		兵种: '美国大兵',
		攻击力: '15',
		行走: function(){},
		奔跑: function(){},
		死亡: function(){},
		攻击: function(){},
		防御: function(){}
	}
	for(var i = 0; i < 100; i ++){
		soldier = {
			ID: i,
			生命值: 45
		}
		soldier.__proto__ = soldier_common
		soldiers.push(soldier)
	}
	soldiers//100个对象
	soldiers[3]//{ID: 3, 生命值: 45}

	// 目前从内存层次上讲已经很完美了，但是组织上很松散，典型的意大利面条代码。
	// 下面进行第一次重构----封装（OOP）

	// 构造函数
	function createOneSoldier(){
		var soldier = {
				ID: i,
				生命值: 45
		}
		soldier.__proto__ = soldier_common
		return soldier
	}
	soldier_common = {
		兵种: '美国大兵',
		攻击力: '15',
		行走: function(){},
		奔跑: function(){},
		死亡: function(){},
		攻击: function(){},
		防御: function(){}
	}


	var soldiers = []
	for(var i = 0; i < 100; i++){
		soldiers.push(createOneSoldier())
	}

	// 但还是有些分散，createSoldier和soldier_common的关联性怎么保证呢？容易误删代码。
	// 再次重构----采用一种机制，把soldier_common写成createOneSoldier的一个属性（函数也是对象）。

	function createOneSoldier(){
		var soldier = {
				ID: i,
				生命值: 45
		}
		soldier.__proto__ = createOneSoldier.common
		return soldier
	}
	createOneSoldier.common = {
		兵种: '美国大兵',
		攻击力: '15',
		行走: function(){},
		奔跑: function(){},
		死亡: function(){},
		攻击: function(){},
		防御: function(){}
	}


	var soldiers = []
	for(var i = 0; i < 100; i++){
		soldiers.push(createOneSoldier())
	}






























