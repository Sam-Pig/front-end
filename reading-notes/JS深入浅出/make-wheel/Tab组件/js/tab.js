


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
function Tabs(selector){
	this.elements = $(selector);
	this.elements.each(function(index,element){
		$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
		$(element).children('.tabs-content').children('li').eq(0).addClass('active');
	});
	this.elements.on('click','.tabs-bar > li',function(e){
		var $li = $(e.currentTarget);
		$li.addClass('active').siblings().removeClass('active');
		var index = $li.index();
		var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
		$content.addClass('active').siblings().removeClass('active');
	});
}

var tabs = new Tabs('.wheel');



// 优化代码
// 初始化
Tabs.prototype.init = function(){
	this.elements.each(function(index,element){
		$(element).children('.tabs-bar').children('li').eq(0).addClass('active');
		$(element).children('.tabs-content').children('li').eq(0).addClass('active');
	});
}
// 绑定事件
Tabs.prototype.bindEvents = function(){
	this.elements.on('click','.tabs-bar > li',function(e){
		var $li = $(e.currentTarget);
		$li.addClass('active').siblings().removeClass('active');
		var index = $li.index();
		var $content = $li.closest('.tabs').find('.tabs-content>li').eq(index);
		$content.addClass('active').siblings().removeClass('active');
	});	
}