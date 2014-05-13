(function(){
    var escapeMap = {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
            "'" : '&#x27;'
        },

        escapeReg = /[&<>"\']/g,

        transformMethod = {
            escape : '<%=([\\s\\S]+?)%>',
            unescape : '<%-([\\s\\S]+?)%>',
            normal : '<%([\\s\\S]+?)%>'
        },
        transformReg = new RegExp([
            transformMethod.escape,
            transformMethod.unescape,
            transformMethod.normal].join('|'), 'g');

    var esacpeFunc = function( str ){
        return str.replace( escapeReg, function( match ){
            return escapeMap[ match ];
        } );
    };


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

    if( window.define ){
    	define('template', function(){
    		return template;
    	});
    }else if( window.jQuery && !jQuery.template){
    	jQuery.extend({ template : template });
    }else if( !window.template ){
    	window.template = template;
    }else{
    	throw new Error('template lib has error');
    }

})();