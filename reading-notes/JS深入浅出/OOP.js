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
	

	// 1.1 封装 ----------------------------------------------------------------------------------
	// 封装----隐藏细节----优雅的API----便于合作和传播（对别人）、缓解思维负担（对自己）
	// 但是这些函数也可以做到，这不是OOP教的专利。


	// 1.2 继承 -----------------------------------------------------------------------------------
	// 继承----复用----同上----DialogWindow extend Window----Window有的我都有（但这不是JS能做到的）



	// 1.3 多态 ------------------------------------------------------------------------------------
	// 多态----灵活----同时是不同的东西----div.childNodes----div.children
	// 函数也可以----animate({},'fast',2000)


// 但面向对象解决的问题，并不是这三面红旗，而是：写代码的套路问题（定势思维）。*********************
// 你要做的，就是不要思考，有什么问题就往上靠就行了，这是宗教信仰问题，是立场问题。




/*--------------------------------------------------------------------------------------------------------------*/
// 2 对象与对象的关系
// 先看看JS世界里有什么？再来看看JS是如何实现面向对象的。


	// 2.1 JS世界里有什么？ --------------------------------------------------------------------------------

	// 最简单的，JS世界里有7种数据类型：
	// number、string、boolean、undefined、null、symbol（6种基本数据类型----存值）
	// object（1种复杂类型----引用类型----存地址----当然本质也是存值）

	// object可以分为 普通对象、数组（下标固定）、函数 3种。



	// 2.2 当我们声明一个object的时候，我们到底在做什么？ -------------------------------------------------------

	// 答：在栈内存（stack）里存了一个地址，地址所指向的地方，存储着对象内容键值对。

	// 但是toSting方法和valueOf方法是怎么出来的？ ********************************
	// 声明一个对象后，对象指向的地方保存的键值对中，会自动添加一个键值对__proto__:××××，这是一个对象的地址。

		// JS世界，之所以要发明原型链的原因很简单，因为要节省内存！

	// 可以在__proto__上自定义属性和方法，当调用对象时，如果找不到自定义的这些属性和方法，那么，对象就会沿着__proto__去找。

	// __proto__是天生就存在与JS世界的内存当中的，不因为声明了对象与否而转移，它的地址，被文档规定必须存在于一个对象：Object(同时也是一个函数）里。 ****************
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

	// 3.1 函数是什么？

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



























