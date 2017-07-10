/**
 * Created by zhangsc on 2017/5/4.
 */
var relationSearch=(function () {
    function setRelationSearch (para) {
        $(para.input).on("propertychange",function () {
            onInputChange(para)
        })
        $(para.input).on("input",function () {
            onInputChange(para)
        })
    }

    function onParaErro() {
        console.error("关联查询的参数要填写完整")
    }

    function onInputChange(para) {
        para.ajax&&para.ajax.abort();//很重要，清楚之前的ajax,在快速输入时只保留最后一次网络请求
        if(!$(para.input).val()){hideUl(para);return;}
        if(para.checkIfAjaxCallBack&&para.checkIfAjaxCallBack(para)==false){return}
        para.ajax=$.ajax({
            url:para.url,
            type:para.type,
            success:function (data) {
                $(para.input).parent().addClass("relation-group")
                var list=para.urlCallBack(data);
                if($(para.input).siblings("ul").length==0){
                    $(para.input).after('<ul></ul>');
                    var top=$(para.input).outerHeight()+$(para.input).position().top+parseInt($(para.input).css("marginTop").replace('px',''));
                    var left=$(para.input).position().left+parseInt($(para.input).css("marginLeft").replace('px',''));
                    var width=$(para.input).outerWidth();
                    $(para.input).siblings("ul").css('top',top).css('left',left).css('min-width',width);
                }else {
                    $(para.input).siblings("ul").empty().show();
                }
                for(var i=0;i<list.length;i++){
                    //这里采用了js的闭包写法，可以动态的绑定参数
                    (function (i) {
                        var content=para.liContentCallBack(list[i])
                    $('<li><nobr>'+content+'</nobr></li>').click(function (event) {
                        para.itemClickCallBack(list[i]);
                        para.lastItem=list[i];
                        hideUl(para);
                    }).appendTo($(para.input).siblings("ul"))
                })(i);
                }
                $(para.input).siblings("ul").click(function (event) {
                    stopBubble(event)
                })
                $(document).one("click",function () {
                    hideUl(para);
                    para.outClickCallBack(para)
                })
            }
        })
    }
    
    function hideUl(para) {
        $(para.input).siblings("ul").empty().hide();
    }

    function inMethod(para) {
        if(!para.url||!para.type||!para.input||!para.itemClickCallBack||!para.urlCallBack||!para.liContentCallBack){
            onParaErro();
            return
        }
        setRelationSearch(para)
    }

    function stopBubble(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation()
        } else {
            window.event.cancelBubble = true
        }
    }
    return inMethod;
})();