/*
模块化编程----本质就是闭包----安全性提高了----名字都不是固定的

闭包的作用，一个是封装数据，一个是暂存数据
*/
/*
JS要实现的功能，有以下几点:
第一、需要在页面初始化的时候，清除task-list div部分的内容；
第二、从数据库store里get task_list的数据，并且将其render在task-list的div中；
第三、当按钮add-task-submit被click时，触发添加新的task-item的函数；
第四、添加新的task-item，并且将其存储在store里；

*/


var myTodoModule = (function(){
	// 定义模块作用域变量的区域
	var task_list = [];//用来存储task_list里的信息

	var $task_list, 
		$content,
		$addTaskSubmit,
		$detail,
		$task_detail,
		$task_detail_content,
		$descript,
		$datetime,
		$detail_submit,
		$delete;

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
		$task_detail = $('.task-detail');
		$task_detail_content = $('.task-detail-content');
		$descript = $('.descript');
		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
		$delete = $('.delete');
	}

	// 页面初始化时清除task-list内容，并从store里get内容render到div里的方法
	var initTaskListRender = function(){
		$task_list.html('');//清除task-list div部分的内容
		//先要判断store里是否有task_list数组，有的话直接get，没有则要初始化store，把task_list数组set进去
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
		$content.val('');
		detailShowListener();//再次注册详情点击监听函数
		deleteListener();
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

	//点击detail详情编辑框弹出绑定监听函数
	var detailShowListener = function(){
		$('.detail').click(function(){//注意不能用$delete!
			detailIndex = task_list.length - 1 - $(this).parent().parent().index();
			$task_detail.show();
			$task_detail_content.val(task_list[detailIndex].content);
			$descript.val(task_list[detailIndex].descript);
			$datetime.val(task_list[detailIndex].datetime);
		});
	}

	// 点击detail-submit保存编辑框绑定监听函数
	var detailSaveLinstener = function(){
		$detail_submit.click(function(){
			var dataTask = {};
			dataTask.content = $task_detail_content.val();
			dataTask.descript = $descript.val();
			dataTask.datetime = $datetime.val();
			// 修改更新操作--要把修改后的对象和原来的对象合并
			task_list[detailIndex] = $.extend(task_list[detailIndex],dataTask);
			store.set('task_list',task_list);
			$task_detail_content.val('');
			$descript.val('');
			$datetime.val('');
			$task_detail.hide();
			initTaskListRender();//刷新页面
		});
	}

	//点击delete删除操作绑定监听函数
	var deleteListener = function(){
		$('.delete').click(function(){
			deleteIndex = task_list.length - 1 - $(this).parent().parent().index();
			var r = confirm('确认要删除吗？');
			if(r){
				task_list.splice(deleteIndex,1);//第一个参数是开始索引，第二个是个数，此步骤是删除数据
				$(this).parent().parent().remove();//.remove()此步骤是移除元素task-item的所有文本和子节点；该方法不会把匹配的元素从 jQuery 对象中删除，因而可以在将来再使用这些匹配的元素。
				store.set('task_list',task_list);
				$task_detail.hide();
			}
		})
	}


	// 页面初始化就要执行的区域
	var initModule = function(){
		initJqVar();
		$datetime.datetimepicker();//在datetime上调用datetimepicker库
		initTaskListRender();
		addTaskListener();
		detailShowListener();
		detailSaveLinstener();
		deleteListener();
	}

	return {initModule:initModule};

})();
$(function(){
	myTodoModule.initModule();
})




