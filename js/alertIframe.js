/**
 * Created by zhangsc on 2017/5/5.
 */
var alertIframe=function () {

    function show(url,option) {
        if ($('.alertIframeModel').length >= 1) {
            return;
        }
        $('body').append("<div class='alertIframeModel'>" +
            "<div class='shelter'></div>" +
            "<div class='operationBack'></div>" +
            "</div>")
        $(".operationBack").append("<div class='operation'><div class='frameGroup'><iframe src="+url+"></iframe></div><div class='footer'></div></div>");
        option&&option.width&&$(".alertIframeModel > .operationBack > .operation").css("width",option.width);
        option&&option.height&&($(".alertIframeModel > .operationBack > .operation").css("height",option.height),$(".alertIframeModel > .operationBack > .operation").css("margin-top",($(window).height()-option.height.substr(0,option.height.indexOf("px")))/2+"px"));
        var cancelBtn = '<button class="myButton">关闭窗口&nbsp;<i class="icon-plus"></i></button>';
        $(cancelBtn).appendTo($('.alertIframeModel>.operationBack>.operation>.footer')).click(function (event) {
            hide();
        })
    }

    function hide() {
        $(".alertIframeModel").remove()
    }

    return show;
}()
