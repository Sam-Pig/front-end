// １、定义
// ２、词法作用域
// ３、call stack
// ４、this & arguments
// ５、call/apply
// ６、bind
// ７、retrun
// ８、柯里化/高阶函数
// ９、回调
// １０、构造函数




// １、定义：函数申明方式
// 匿名函数-----------------------------
var fn = function() {//它是匿名函数，但是它有name
	return 1
}
var fn2 = fn

fn.name//fn
fn2.name//fn


// 具名函数-----------------------------
function fn3() {//fn3是个变量，其作用域是其所在作用域
	return 3
}
var fn5 = function fn4() {//fn4的作用域只在函数本身
	return 4
}
console.log(fn4)//fn4 is not defined
console.log(fn3)//当做字符串打印fn3

// 箭头函数------------------------------
var fn6 = e => e + 1
fn6(7)//8
var fn7 = (i,j) => i+j
fn7(10,11)//21
var fn8 = (i,j) => {console.log(i,j); return i+j}
fn8(2,6)//8



// ２、词法作用域