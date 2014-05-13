MyJs
====
我的JS代码工具库：


template.js  js模板引擎

var tmplHTML = '&lt;P&gt;<%- title %>&lt;/P&gt;<% if(content){ %>&lt;P&gt;<%= content %>&lt;/P&gt;<% } %>',
                
    tmplFunc = template( tmplHTML ),
    
    html = tmplFunc({ title:'abc<de', content:'dkk>>>skw' });
