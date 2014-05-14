(function(){

    // html转义映射对象
    var escapeMap = {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
            "'" : '&#x27;'
        },

        // html转义正则
        escapeReg = /[&<>"\']/g,

        // 变量以及语句语法正则
        transformMethod = {
            escape : '<%=([\\s\\S]+?)%>',
            unescape : '<%-([\\s\\S]+?)%>',
            normal : '<%([\\s\\S]+?)%>'
        },
        transformReg = new RegExp([
            transformMethod.escape,
            transformMethod.unescape,
            transformMethod.normal].join('|'), 'g');

    // html转义方法
    var esacpeFunc = function( str ){
        return str.replace( escapeReg, function( match ){
            return escapeMap[ match ];
        } );
    };

    // 主要逻辑为根据提供的模板进行生成 new Function 的 字符串函数体
    // 利用 replace 的 function参数形式处理
    // 使用闭包形式使得 new Function出来的function 可以使用当前作用域数据
    function template( tmpl, data ){
        var tmplStr = "_s+='",
            index = 0, len = tmpl.length;

        var c = tmpl.replace( transformReg, 'a');
        tmpl.replace( transformReg, function( match, escape, unescape, normal, offset){

            tmplStr += tmpl.slice(index, offset).replace(/'/g,"\\'");

            if( escape ){
                tmplStr += "';\n_s+=((" + escape + ")==null?'':esacpeFunc(" + escape + "));\n_s+='"
            }else if( unescape ){
                tmplStr += "';\n_s+=((" + unescape + ")==null?'':" + unescape + ");\n_s+='"
            }else if( normal ){
                tmplStr += "';\n" + normal + ";\n_s+='"
            }

            index = offset + match.length;
        } );

        tmplStr += tmpl.slice(index, len) + "'";

        tmplStr = "var _s='';\n with(data){\n "+ tmplStr +"}\n return _s;";

        var tmplFunc = new Function( "data", "esacpeFunc", tmplStr ),

        rander = function( data ){
        	return tmplFunc( data, esacpeFunc );
        }

        // 方便调试
        //rander.tmplFunc = tmplFunc;

        return data ? rander( data ) : rander;
    }

    // 使其适应不同架构形式 还不是很好 需要调整
    if( window.define ){
    	define('template', function(){
    		return template;
    	});
    }else if( window.jQuery && !jQuery.template){
    	jQuery.extend({ template : template });
    }else if( !window.template ){
    	window.template = template;
    }else{
    	throw new Error('template lib no export way');
    }

})();