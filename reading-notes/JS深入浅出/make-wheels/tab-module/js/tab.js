// 这个组件的缺陷：CSS依赖了JS规定的class名称，JS依赖了了HTML的标签。
// 解决方法，只有在组件使用文档里写清楚。


// 基本实现逻辑
// $('.tabs').each(function(index,element){
// 	$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
// 	$(element).children('.tabs-content').children('li').eq(0).addClass('active');
// });

// $('.tabs').on('click','.tabs-bar > li',function(e){
// 	var $li = $(e.currentTarget);
// 	$li.addClass('active').siblings().removeClass('active');
// 	var index = $li.index();
// 	var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
// 	$content.addClass('active').siblings().removeClass('active');
// });



// 将上面的代码封装成一份构造函数
// function Tabs(selector){
// 	this.elements = $(selector);
// 	this.elements.each(function(index,element){
// 		$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
// 		$(element).children('.tabs-content').children('li').eq(0).addClass('active');
// 	});
// 	this.elements.on('click','.tabs-bar > li',function(e){
// 		var $li = $(e.currentTarget);
// 		$li.addClass('active').siblings().removeClass('active');
// 		var index = $li.index();
// 		var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
// 		$content.addClass('active').siblings().removeClass('active');
// 	});
// }

// var tabs = new Tabs('.wheel');



// 优化代码--OOP--new
// function Tabs(selector){
// 	// this.__proto === Tabs.prototype // true
// 	this.elements = $(selector);
// 	this.init();
// 	this.bindEvents();
// }

// // 初始化
// Tabs.prototype.init = function(){
// 	this.elements.each(function(index,element){
// 		$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
// 		$(element).children('.tabs-content').children('li').eq(0).addClass('active');
// 	});
// }
// // 绑定事件
// Tabs.prototype.bindEvents = function(){
// 	this.elements.on('click','.tabs-bar > li',function(e){
// 		var $li = $(e.currentTarget);
// 		$li.addClass('active').siblings().removeClass('active');
// 		var index = $li.index();
// 		var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
// 		$content.addClass('active').siblings().removeClass('active');
// 	});	
// }

// var tabs = new Tabs('.wheel');



// 用ES6 class来实现
class Tabs{
	constructor(selector){
	this.elements = $(selector);
	this.init();
	this.bindEvents();		
	}
	init(){
		this.elements.each(function(index,element){
			$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
			$(element).children('.tabs-content').children('li').eq(0).addClass('active');
		});	
	}
	bindEvents(){
		this.elements.on('click','.tabs-bar > li',function(e){
			var $li = $(e.currentTarget);
			$li.addClass('active').siblings().removeClass('active');
			var index = $li.index();
			var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
			$content.addClass('active').siblings().removeClass('active');
		});		
	}
}
var tabs = new Tabs('.wheel');


















