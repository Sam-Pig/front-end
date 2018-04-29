/*
模块化编程----本质就是闭包----安全性提高了----名字都不是固定的
*/

var myTodoModule = (function(){
	/*
	定义变量
	*/
	var task_list = [];
	var $content, $task_list, $addTaskSubmit;
	/*
	初始化jQuery对象
	*/
	var initJqVar = function(){
		$content = $('.content');//初始化jq对象只执行了一次
		$task_list = $('.task-list');
		$addTaskSubmit = $('.add-task-submit');
	}
	/*
	页面初始化时，从store里取出task_list并渲染的方法
	*/
	var initRenderIndex = function(){
		$task_list.html('');
		task_list = store.get('task_list');
		var taskListHtmlStr = '';
		for (var i = task_list.length - 1; i >= 0; i--) {
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
		$(taskListHtmlStr).appendTo($task-list);
	}

	/*
	添加task-item的方法---------要和按钮的点击事件绑定
	*/
	var addTask = function(){
		var new_task = {};
		new_task.content = $content.val();//讲input框的值赋值给新的对象的content
		task_list.push(new_task);
		store.set('task_list',task_list);//保存task_list
		renderOneItem();
	}	
	/*
	向html列表中新添加一条记录的方法
	*/
	var renderOneItem = function(new_task){
		var oneItem = '<div class="task-item" data-index="'+i+'>'+
			'<span>'+
				'<input type="checkbox" name="">'+
			'</span>'+
			
			'<span class="item-content">'+new_task.content+
				
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
		$(oneItem).prependTo($task-list);//在task_list顶端填充新的item
	}

	/*
	页面初始化就要执行的方法放在initmodule里
	*/
	var initModule = function(){
		initJqVar();
		initRenderIndex();
		$addTaskSubmit.click(function(){
			addTask();
		});
	}
	return {
		initModule:initModule
	}
})();
$(function(){
	myTodoModule.initModule();
})