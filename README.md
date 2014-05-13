MyJs
====
我的JS代码工具库：


template.js  js模板引擎

var tmplHTML = '<P><%- title %></P>\
                <% if(content){ %>\
                <P><%= content %></P>\
                <% } %>',
                
    tmplFunc = template( tmplHTML ),
    
    html = tmplFunc({ title:'abc<de', content:'dkk>>>skw' });
