// popup 模拟windows弹窗3种状态 以及自定义状态

// 唯一状态栏 窗口中只会唯一显示一个弹窗 

(function( factory ){
	if( typeof define === "function" && define.amd ){
		define( ["jQuery"], factory );
	}else{
		factory( jQuery );
	}
}(function( $ ){
	'use strict';

	var popOverScreenSelector = '.popup-overScreen',
		popContainerSelector = '.popup-container',



		HTMLTmpl = {
			overScreen : "<div class='popup-overScreen'></div>",  // 外层overlay
			container : "<div class='popup-container'>" +	// 内层弹窗主体
								"<div clas='popup-header'>{% header %}</div>" +
								"<div clas='popup-body'>{% body %}</div>" +
								"<div clas='popup-footer'>{% footer %}</div>" +
							"</div>",
			header : "<h3 class='popup-title'>{% title %}</h3><span class='popup-close'>X</span>",
			body : "<p class='popup-content'>{% content %}</p>",
			promptInput : "<input type='text' class='popup-publish' />",
			ensureBtnHtml : "<span class='popup-ensure'>确定</span>",
			cancelBtnHtml : "<span class='popup-cancel'>取消</span>"
		};

	// 无需转义 简单替换方式即可
	function transform( template, data ){
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
	function PopUp( argsObj ){

		// this.type 
		// this.title 
		// this.width 
		// this.height 

		this.init( argsObj );
	}

	PopUp.prototype = {
		constructor : popup,

		init : function( argsObj ){
			this.type = argsObj.type;
			this.title = argsObj.title || "来自系统的消息";
			this.width = argsObj.width || 500;
			this.height = argsObj.height || 300;

			this.$element = $( HTMLTmpl.overScreen );

			this._rander();
			this._appendPopup();
		},

		_rander : function(){
			var self = this,
				partHtmlObj = {
					header : HTMLTmpl.header,
					body : HTMLTmpl.body,
					footer : HTMLTmpl.ensureBtnHtml
				};

			switch( this.type ){
				case "prompt" : 
					partHtml.body = HTMLTmpl.body + HTMLTmpl.promptInput;

				case "confirm" : 
					partHtml.footer = HTMLTmpl.ensureBtnHtml + HTMLTmpl.cancelBtnHtml;

				case "alert" : 

			}

			this.$element.html( transform( HTMLTmpl.container, partHtmlObj ) );
			this.$element.find( popContainerSelector ).css({
				width : self.width,
				height : self.height
			})

		},

		_appendPopup : function(){

			$("body").append( this.$element );

		},
		_removePopup : function(){},

		_ensurePopup : function(){},
		_canclePopup : function(){},

	}


	function popup( type, obj ){
		obj = obj || {};
		obj.type = type;
		return new PopUp( obj );
	}



	var old = $.popup;
	$.popup = popup;

	$.popup.noConflict = function(){
		$.popup = old;
		return popup;
	}

}));