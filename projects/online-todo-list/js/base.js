/*
模块化编程----本质就是闭包----安全性提高了----名字都不是固定的
*/
/*
JS要实现的功能，有以下几点:
第一、需要在页面初始化的时候，清除task-list div部分的内容；
第二、从数据库store里get task_list的数据，并且将其render在task-list的div中；
第三、当按钮add-task-submit被click时，触发添加新的task-item的函数；
第四、添加新的task-item，并且将其存储在store里；

*/


var myTodoModule = (function(){
	// 定义变量的区域
	var task_list = [];//用来存储task_list里的信息
	var $task_list, 
		$content,
		$addNewTaskItem;

	// 初始化jQuery的区域
	var initJqVar = function(){
		$task_list = $('.task-list');
		$content = $('.content');
		$addNewTaskItem = $('.add-task-submit');
	}


	// 页面初始化时清除task-list内容，并从store里get内容render到div里的方法
	var initTaskListRender = function(){
		$task_list.html('');//清除task-list div部分的内容
		task_list = store.get('task_list');//从数据库store里get task_list的数据，存储在数组task_list里
		var  taskListHtmlStr = '';
		for(var i = task_list.length - 1; i >= 0; i --){
			var oneItem = '<div class="task-item" data-index="'+i+'>'+
				'<span>'+
					'<input type="checkbox" name="">'+
				'</span>'+
				'<span class="item-content">'+
				task_list[i].content+
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
		$(taskListHtmlStr).appendTo('.task-list');//向task-list节点后面添加task_list数组里的内容		
	}

	// 添加new task-item到数据库store并调用数据库刷新页面的办法
	var addNewTaskItem = function(){
		var new_task_item = {};//将每个new task-item都视为一个对象
		new_task_item.content = $content.val();//定义new task-item的content属性为输入框content的value值
		task_list.push(new_task_item);
		store.set('task_list',task_list);
		initTaskListRender();
	}


	// 页面初始化就要执行的区域
	var initModule = function(){
		initJqVar();
		initTaskListRender();
		$addNewTaskItem.click(function(){
			addNewTaskItem();
		});
	}

	return {initModule:initModule};

})();
$(function(){
	myTodoModule.initModule();
})




// var myTodoModule = (function(){
// 	/*
// 	定义变量
// 	*/
// 	var task_list = [];
// 	var $content, $task_list, $addTaskSubmit;
// 	/*
// 	初始化jQuery对象
// 	*/
// 	var initJqVar = function(){
// 		$content = $('.content');//初始化jq对象只执行了一次
// 		$task_list = $('.task-list');
// 		$addTaskSubmit = $('.add-task-submit');

// 	}
// 	/*
// 	页面初始化时，从store里取出task_list并渲染的方法
// 	*/
// 	var initRenderIndex = function(){
// 		$task_list.html('');
// 		task_list = store.get('task_list');
// 		var taskListHtmlStr = '';
// 		for (var i = task_list.length - 1; i >= 0; i--) {
// 			var oneItem = '<div class="task-item" data-index="'+i+'>'+
// 				'<span>'+
// 					'<input type="checkbox" name="">'+
// 				'</span>'+
				
// 				'<span class="item-content">'+task_list[i].content+
					
// 				'</span>'+
				
// 				'<span class="fr">'+
// 					'<span class="action detail">'+
// 						'详情'+
// 					'</span>'+
// 					'<span class="action delete">'+
// 						'删除'+
// 					'</span>'+		
// 				'</span>'+
// 			'</div>';
// 			taskListHtmlStr += oneItem;	
// 		}
// 		$(taskListHtmlStr).appendTo($task-list);
// 	}

	
// 	添加task-item的方法---------要和按钮的点击事件绑定
	
// 	var addTask = function(){
// 		var new_task = {};
// 		new_task.content = $content.val();//讲input框的值赋值给新的对象的content
// 		task_list.push(new_task);
// 		store.set('task_list',task_list);//保存task_list
// 		renderOneItem();
// 	}	
// 	/*
// 	向html列表中新添加一条记录的方法
// 	*/
// 	var renderOneItem = function(new_task){
// 		var oneItem = '<div class="task-item" data-index="'+i+'>'+
// 			'<span>'+
// 				'<input type="checkbox" name="">'+
// 			'</span>'+
			
// 			'<span class="item-content">'+new_task.content+
				
// 			'</span>'+
			
// 			'<span class="fr">'+
// 				'<span class="action detail">'+
// 					'详情'+
// 				'</span>'+
// 				'<span class="action delete">'+
// 					'删除'+
// 				'</span>'+		
// 			'</span>'+
// 		'</div>';
// 		$(oneItem).prependTo($task-list);//在task_list顶端填充新的item
// 	}

// 	/*
// 	页面初始化就要执行的方法放在initmodule里
// 	*/
// 	var initModule = function(){
// 		initJqVar();
// 		initRenderIndex();
// 		$addTaskSubmit.click(function(){
// 			addTask();
// 		});
// 	}
// 	return {
// 		initModule:initModule
// 	}
// })();
// $(function(){
// 	myTodoModule.initModule();
// })