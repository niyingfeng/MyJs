window["_BFD"] = window["_BFD"] || {};

_BFD.del_same = (function(){// 去除对象中特定属性值相同的商品对象

	var iname = {};//闭包数据

	return function(arr_obj,prop,num){//对象数组  属性名称  返回数组长度

		var i=0,j,len_prop,flog,s_value,s_v,p_obj,results=[],len = arr_obj.length,toString = Object.prototype.toString; 

		prop_obj = iname[prop] = iname[prop]||{};
		s_v = arr_obj[i][prop];
		
		if(typeof s_v === "string" ||typeof s_v === "number"){
			for(;i<len;i++){
				s_value = arr_obj[i][prop];
				if(typeof prop_obj[s_value] === "undefined"){
					results.push(arr_obj[i]);
					prop_obj[s_value] = true;
				}
				if(num && results.length >= num) break;  //控制数组长度
			}
		}else if(toString.call(s_v) === "[object Array]"){
			for(;i<len;i++){
				flog = true; 
				len_prop = arr_obj[i][prop].length;
				for(j=0;j<len_prop;j++){
					s_value = arr_obj[i][prop][j];
					if(prop_obj[s_value] === true) { flog = false; };			
				}
				if(flog){
					for(j=0;j<len_prop;j++){
						s_value = arr_obj[i][prop][j];
						prop_obj[s_value] = true;
					}
					results.push(arr_obj[i]);
				}
				if(num && results.length >= num) break;  //控制数组长度
			}
		}else{
			console.log("BFD item info or arguments error!");
			return;
		}
		
		return results;
	}

})();


/*
_BFD.del_same(arr_obj,prop, *num*)   商品对象信息数组（必须）  去重的商品对象属性（必须） 所需的数量（可选）
 
var a = [{iid:"111",name:"it is a1",g_id:["1","4"]},{iid:"112",name:"it is a2",g_id:["2"]},{iid:"113",name:"it is a3",g_id:["3"]}];
var b = [{iid:"111",name:"it is b1",g_id:["6"]},{iid:"114",name:"it is b2",g_id:["4"]},{iid:"115",name:"it is a3",g_id:["1"]}]; 

var c = _BFD.del_same(a,"iid",2); //[{iid:"111",name:"it is a1",g_id:["1","4"]},{iid:"112",name:"it is a2",g_id:["2"]}]
var d = _BFD.del_same(b,"iid"); //[{iid:"114",name:"it is b2",g_id:["4"]},{iid:"115",name:"it is a3",g_id:["1"]}]

var e = _BFD.del_same(a,"name"); // [{iid:"111",name:"it is a1",g_id:["1","4"]},{iid:"112",name:"it is a2",g_id:["2"]},{iid:"113",name:"it is a3",g_id:["3"]}]
var f = _BFD.del_same(b,"name"); // [{iid:"111",name:"it is a1",g_id:["1","4"]},{iid:"112",name:"it is a2",g_id:["2"]}]

var g = _BFD.del_same(a,"g_id"); // [{iid:"111",name:"it is a1",g_id:["1","4"]},{iid:"112",name:"it is a2",g_id:["2"]},{iid:"113",name:"it is a3",g_id:["3"]}]
var h = _BFD.del_same(b,"g_id"); // [{iid:"111",name:"it is b1",g_id:["6"]}];

*/




_BFD.try_turn = function(str,arr_id,req_id,banner_id){//执行该方法需要有 可以获取节点的方法 $ 方法
	
	if($(str).length > 0){
		var arr_dom = $(str);
		_BFD.hand_bfd_event(arr_dom,arr_id,req_id,banner_id);
	}else{
		//arguments.callee(str,fn,arr_id,req_id,banner_id);
		setTimeout(function(){_BFD.try_turn(str,arr_id,req_id,banner_id);},100);
	}

}

_BFD.hand_bfd_event = function(arr,arr_id,req_id,banner_id){// 商品节点对象数组  对于节点商品id req_id banner_id
	var i=0,j,len = arr.length,_a,_a_len,bfd_tools = BCore.tools.Tools;
	for(;i<len;i++){
		_a = (arr[i]).getElementsByTagName("a");
		_a_len = _a.length;
		for(j = 0;j<_a_len;j++){
			bfd_tools.bind(_a[j],"click",(function(x,iid){
				return function (){
					var _this = new BCore();
					var fb = new BCore.inputs.FeedBack(req_id);
					fb.p_on = x + 1;
					fb.p_bid = banner_id;
					fb.iid = iid;
					_this.send(fb);
					
				}
			})(i, arr_id[i]));
		}
	}
}

