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
		$addTaskSubmit,
		$detail;
	var detailIndex,//记录点击详情和删除时候的索引
		deleteIndex;
	function isArray(obj) { 
  		return Object.prototype.toString.call(obj) === '[object Array]'; 
	}

	// 初始化jQuery的区域
	var initJqVar = function(){
		$task_list = $('.task-list');
		$content = $('.content');
		$addTaskSubmit = $('.add-task-submit');
		$detail = $('.detail');
	}

	// 页面初始化时清除task-list内容，并从store里get内容render到div里的方法
	var initTaskListRender = function(){
		$task_list.html('');//清除task-list div部分的内容
		//先要判断store里有task_list数组，没有要初始化store，有则直接get
		if(isArray(store.get('task_list'))){
			task_list = store.get('task_list');//从数据库store里get task_list的数据，存储在数组task_list里
			var  taskListHtmlStr = '';
			for(var i = task_list.length - 1; i >= 0; i--){
				var oneItem = '<div class="task-item" data-index="'+i+'">'+
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
		}else{
			store.set('task_list',task_list);
			task_list = store.get('task_list');//从数据库store里get task_list的数据，存储在数组task_list里
			var  taskListHtmlStr = '';
			for (var i = task_list.length - 1; i >= 0; i--){
				var oneItem = '<div class="task-item" data-index="'+i+'">'+
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

	//点击button绑定事件函数
	var addTaskListener = function(){
		$addTaskSubmit.click(function(){
			addNewTaskItem();
		});
	}

	var detailListener = function(){
		$('.detail').click(function(){
			console.log($(this).parent().parent().index());
		})
	}

	// 页面初始化就要执行的区域
	var initModule = function(){
		initJqVar();
		initTaskListRender();
		addTaskListener();
		detailListener();
	}

	return {initModule:initModule};

})();
$(function(){
	myTodoModule.initModule();
})




