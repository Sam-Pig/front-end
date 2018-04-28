/*
模块化编程----本质就是闭包----安全性提高了----名字都不是固定的
*/

var myTodoModule = (function(){
	/*
	定义变量
	*/
	var task_list = [];
	var $content, $task-list;
	/*
	初始化jQuery对象
	*/
	var initJqVar = function(){
		$content = $('.content');//初始化jq对象只执行了一次
		$task-list = $('.task-list');
		$add-task-submit = $('.add-task-submit');
	}
	/*
	添加task-item的方法---------要和按钮的点击事件绑定
	*/
	var addTask = function(){
		var new_task = {};
		new_task.content = $content.val();//讲input框的值赋值给新的对象的content
		task_list.push(new_task);
		store.set('task_list',task_list);//保存task_list
		render_task_list();
	}	
	/*
	向页面渲染task_list的方法
	*/
	var render_task_list(){
		$task-list.html('');//清空task-list div
		task_list = store.get('task_list');//取出task_list，并赋值给task_list
		var taskListHtmlStr = '';
		for(var i = 0; i <  task_list.length; i++){
			var oneItem = '<div class="task-item" data-index="'+i+'>'+
				'<span>'+
					'<input type="checkbox" name="">'+
				'</span>'+
				
				'<span class="item-content">'+task_list[i].content+
					
				'</span>'+
				
				'<span class="fr">'+
					'<span class="action detail">'+
						'详情'+
					'</span>'+
					'<span class="action delete">'+
						'删除'+
					'</span>'+		
				'</span>'+
			'</div>';
			taskListHtmlStr += oneItem;
		}
		$task-list.appendTo($task-list);//给大的task_list填充item
	}



	/*
	页面初始化就要执行的方法放在initmodule里
	*/
	var initModule = function(){
		initJqVar();
	}
	return {
		initModule:initModule
	}
})();
$(function(){
	myTodoModule.initModule();
})