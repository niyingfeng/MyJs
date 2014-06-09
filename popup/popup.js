// popup 模拟windows弹窗3种状态 以及自定义状态

// 唯一状态栏 窗口中只会唯一显示一个弹窗 

(function( factory ){
	if( typeof define === "function" && define.amd ){
		define( ["jquery"], factory );
	}else{
		factory( jquery );
	}
}(function( $ ){

	var HTMLTmpl = {
			overScreen : "<div class='popup-overScreen'></div>",  // 外层overlay
			container : "<div class='popup-container'>" +	// 内层弹窗主体
								"<div clas='popup-header'>{% header %}</div>" +
								"<div clas='popup-body'>{% body %}</div>" +
								"<div clas='popup-footer'>{% footer %}</div>" +
							"</div>",
			header : "<h3 class='popup-title'>{% title %}</h3><span class='popup-close'>X</span>",
			body : "<p class='popup-content'>{% content %}</p>",
			promptBody : "<p class='popup-content'>{% content %}</p><input type='text' class='popup-publish' />",
			ensureBtnHtml : "<span></span>"
		},
		
		$overScreen = $( overHtml ),
		$body = $("body");

	// 无需转义 简单替换方式即可
	function fomart( template, data ){
		return template.replace( /\{%(?:\s*?(\S\S*?)\s*?)%\}/g, function(match, key){
			return data[key] || "";
		} )
	}
						

	/** 弹窗函数 popup
    *  
    *   @method popup
    *   @param {String} type 必选 现有 "alert", "cofirm", "prompt", "overlay" 四种类型
    *   @param {obj} argsObj 可选 弹窗参数数据，如下
    *	{
	*		title, 
	*		width,
	*		height		
    *	}
    *   
    *
    *   @return {Object} 返回目标对象
    *   
    */
	function popup( type ,argsObj ){

		var popType = type,

			title = argsObj.title || "来自系统的消息",
			width = argsObj.width || 500,
			height = argsObj.height || 300;




	}

	popup.prototype = {
		constructor : popup,

		_appendPopup : function(){},
		_removePopup : function(){},

		_ensurePopup : function(){},
		_canclePopup : function(){},


		// alert : function(){
		// 	$overScreen.html(containerHtml);

		// 	$body.append( $overScreen );

		// },

		// confirm : function(){},

		// prompt : function(){},

		// overlay : function(){}
	}



	var old = $.popup;
	$.popup = popup;

	$.popup.noConflict : function(){
		$.popup = old;
		return popup;
	}

}));