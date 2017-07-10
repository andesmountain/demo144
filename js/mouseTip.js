/**
 * Created by Administrator on 2017/2/16.
 */
var mouseTip = function () {

    var bindMouseTip = function (jqe, c, option) {
        if(!c||c==undefined||c=='undefined'){
            return
        }
        var timer
        var content = '<div class="mouseTipGroup" id="mouseTipGroup">' +
            '<div class="mouseTipTriangle"></div>' +
            '<div class="mouseTipGroupContent">' +
            c +
            '</div></div>'
        jqe.hover(function () {
            timer = setTimeout(function () {
                $('body').append(content)
                $('body #mouseTipGroup').css('top', jqe.offset().top + jqe.height() - $(document).scrollTop())
                $('body #mouseTipGroup').css('left', jqe.offset().left)
                for (var key in option) {
                    $('body #mouseTipGroup').css(key, option[key])
                }
                $('body #mouseTipGroup').fadeIn(500)
            }, 1000);
        }, function () {
            $('.mouseTipGroup').remove()
            clearTimeout(timer);
        });
    }
    return bindMouseTip
}()
var topMouseTip = function () {
    var bindMouseTip = function (jqe, c, option) {
        if(!c||c==undefined||c=='undefined'){
            return
        }
        var timer
        var content = '<div class="mouseTipGroup" id="mouseTipGroup">' +
            '<div class="mouseTipGroupContent">' +
            c +
            '</div>' +'<div class="topMouseTipTriangle"></div>' +
            '</div>'
        jqe.hover(function () {
            console.log('i am in')
            timer = setTimeout(function () {
                $('body').append(content)
                $('body #mouseTipGroup').css('bottom', $(window).height()-jqe.offset().top+$(document).scrollTop())
                $('body #mouseTipGroup').css('left', jqe.offset().left)
                for (var key in option) {
                    $('body #mouseTipGroup').css(key, option[key])
                }
                $('body #mouseTipGroup').fadeIn(500)
            }, 1000);
        }, function () {
            $('.mouseTipGroup').remove()
            clearTimeout(timer);
        });
    }
    return bindMouseTip;
}()

var clickTip=function () {
        var bindClickTip = function (jqe, c, option) {
            if (!c || c == undefined || c == 'undefined') {
                return
            }
            var content = '<div class="mouseTipGroup" id="mouseTipGroup">' +
                '<div class="mouseTipTriangle"></div>' +
                '<div class="mouseTipGroupContent">' +
                c +
                '</div></div>'
            jqe.click(function () {
                console.log('i am in')
                $('body').append(content)
                console.log(jqe.height())
                $('body #mouseTipGroup').css('top', jqe.offset().top + jqe.height()  - $(document).scrollTop())
                $('body #mouseTipGroup').css('left', jqe.offset().left)
                for (var key in option) {
                    $('body #mouseTipGroup').css(key, option[key])
                }
                $('body #mouseTipGroup').fadeIn(500)
                stopBubble(window.event)
                $(document).one("click",function () {
                    console.log(123)
                    $('body #mouseTipGroup').remove()
                })
            })

        }

    function stopBubble(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation()
        } else {
            window.event.cancelBubble = true
        }
    }
    return bindClickTip;
}();