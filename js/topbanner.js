/**
 * Created by Zhang on 2017/10/14.
 * 网易广告部分
 */
$(function(){
    //头部--网易游戏全目录
    (function(){
        var $header = $("#header"),
            $list = $header.find(".list"),
            $more = $list.find(".more"),
            $move = $list.find(".list1 .move1"),
            $move2 = $list.find(".list2"),
            $oBtn = $header.find(".con .right .on"),
            $oLi = $header.find(".con .right .leave"),
            onoff1 = true,  //右边开关
            onoff2 = true;  //左边开关

        //显示目录
        $oBtn.mouseenter(function(){
            $list.stop().animate({height : 475});
        });
        //隐藏目录
        $list.mouseleave(function(){
            $list.stop().animate({height : 0});
        });
        $oLi.mouseenter(function(){
            $list.stop().animate({height : 0});
        });

        //更多按钮点击事件
        $more.click(function(){
            if($(this).index(".more")){
                //右边点击，根据开关设置相关的值
                var height = onoff2?25:100,
                    top = onoff2?240:190,
                    left = onoff2?-100:0,
                    right = onoff2?-100:0,
                    str = onoff2?"&lt;&lt;":"更<br>多<br>热<br>门<br>手<br>游";
                $(this).css({
                    height : height,
                    top : top
                }).html(str).animate({right : right},300);
                $move2.animate({left : left},300);
                onoff2 = !onoff2;
            }else{
                //左边点击
                    height = onoff1?25:100;
                    top = onoff1?200:150;
                    right = onoff1?-140:-1;
                    zIndex = onoff1?16:10;
                    str = onoff1?"&lt;&lt;":"更<br>多<br>热<br>门<br>端<br>游";
                $(this).css({
                    height : height,
                    top : top
                }).html(str);
                $move.css({zIndex:16}).animate({//这里要先改变层级，以便显示
                    right : right
                },300,function(){               //回调，动画结束后再降低层级
                    if(onoff1){$move.css({zIndex : zIndex})}
                });
                onoff1 = !onoff1;
            }
        })
    })();

    //头部--文字轮播
    (function(){
        var $msg = $("#header").find(".right .msg"),
            $a = $msg.find("a"),
            index = 0;
        $a.eq(1).css({top:-40});    //初始化

        setInterval(function(){
            $a.eq(index%2).animate({top:-40});  //当前
            $a.eq(++index%2).css({top:40}).animate({top:0});//下一张
        },3000)
    })();
});