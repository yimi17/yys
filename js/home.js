/*
* home首页部分
* */

$(function(){
    //主体--右侧视频弹窗
    (function(){
        var $main = $("#main"),
            $video = $main.find(".top .right .video .v-play"),
            $open = $main.find(".top .right .video .v-bg"),
            $close = $video.find(".play .close");

        $open.click(function(){$video.show()});
        $close.click(function(){$video.hide()});
    })();

    //主体--右侧前后篇切换
    (function(){
        var $main = $("#main"),
            //后篇弹窗，已取消
            // $alert = $main.find(".top .right .alert"),
            // $close = $alert.find("span"),
            $content = $main.find(".content"),
            $future = $main.find(".future"),
            $btn = $main.find(".top .right p");
            
        //前篇
        $btn.eq(0).click(function(){
            $main.css({
                "background":"url('images/home/bg.jpg')",
                "height":3768
            });
            $future.css({"top":2700});
            $content.css({"top":1720});
            $btn.removeClass("on").eq(0).addClass("on");
        });
        //后篇
        $btn.eq(1).click(function(){
            // $alert.show()
            $main.css({
                "background":"url('images/home/bg2.jpg')",
                "height":3226
            });
            $future.css({"top":1145});
            $content.css({"top":2121});
            $btn.removeClass("on").eq(1).addClass("on");
        });
        // $close.click(function(){$alert.hide()});
    })();

    //主体--人物角色弹窗
    (function(){
        //弹出窗口
        var $main = $("#main"),
            $oBtn = $main.find(".content .show .part .li-btn"),
            $oBtn_v = $main.find(".content .show .part .li-video"),
            $more = $main.find(".content .show .s-more"),
            $m_video = $main.find(".content .show .s-more .m-video"),
            $m_btn = $main.find(".content .show .s-more .m-btn"),
            $close = $main.find(".content .show .s-more .close"),
            $tab = $m_btn.find(".btn span"),
            $txt = $m_btn.find(".txt"),
            $oUl = $m_btn.find("ul"),
            $oLi = $oUl.find("li"),
            width = $oLi.width(),
            height = $txt.height(), 
            index = 0,
            length = $oLi.length;

        //视频弹窗
        $oBtn_v.click(function(){
            $more.show();
            $m_video.show();
        });

        //角色弹窗
        $oBtn.click(function(){
            var i = $(this).index();
            $more.show();
            $m_btn.show();
            $oUl.css({left : -width * (i-1)});
            index = i-1;
        });

        //关闭弹窗
        $close.click(function(){
            $more.hide();
            $m_video.hide();
            $m_btn.hide();
        });

        //角色切换
        $tab.click(function(){
            if($(this).index()){
                if(++index>=length){index = length-1}
            }else{
                if(--index<0){index = 0}
            }
            //改变按钮样式
            $tab.css({opacity:1,cursor:"pointer"});
            if(index===0 || index===length-1){
                $(this).css({opacity:.5,cursor:"default"})
            }
            $oUl.stop().animate({left : -width * index});
        });

        //自定义滚动条
        $txt.each(function(){
            var $text = $(this).find(".text"),
                $scroll = $(this).find(".scroll"),
                $bar = $(this).find(".scroll .bar"),        
                mainH = $text.height(),
                prop = height/$text.height(),   //滚动高的比例
                bar_height = height*prop,       //滚动条的高
                max_top = height - bar_height;  //最大滚动top值
            $bar.css({height : bar_height});

            //滚动条滑动
            $bar.mousedown(function(e){
                var s_y = e.clientY,
                    s_top = $bar.position().top;
                $(document).mousemove(function(e){
                    var y = e.clientY,
                        top = y - s_y + s_top;
                    top = Math.max(top,0);
                    top = Math.min(top,max_top);

                    $bar.css({top:top});
                    $text.css({top:-top/height*mainH});
                }).mouseup(function(){
                    $(this).off("mousemove").off("mouseup");
                });
                return false;
            });

            //鼠标滚轮事件
            $text.mousewheel(function(e,d){

                var top = $bar.position().top;
                top += (d>0?-10:10);
                top = Math.max(top,0);
                top = Math.min(top,max_top);

                $bar.css({top:top}); 
                $text.css({top:-top/height*$text.height()});
                return false;
            });


            //点击滚动条
            $scroll.click(function(e){
                if(e.target === this){
                    var top = e.clientY - ($(this).offset().top - $(document).scrollTop()),
                        y = $bar.position().top;
                    top = y + (top>y?100:-100);
                    top = Math.max(top,0);
                    top = Math.min(top,max_top);

                    $bar.animate({top:top}); 
                    $text.animate({top:-top/height*$text.height()});
                }
            });

        });

        //获取元素属性后隐藏
        $more.css({
            display : "none",
            opacity : 1
        });
        $m_btn.css({
            display : "none",
            opacity : 1
        });
    })();

    //未来计划放送
    (function(){
        var $future = $("#main").find(".future"),
            $oUl = $future.find(".con .txt"),
            $btn = $future.find(".con .btn span"),
            $tab = $future.find(".con .tab ul li"),
            $img = $oUl.find(".li-4 .img .img1"),
            $oP = $oUl.find(".li-4 .text p"),
            width = $oUl.find("li").width(),
            index = 0,
            num = 0,
            length = $tab.length;

        //左右切换
        $btn.click(function(){
            if($(this).index()){
                if(++index>=length){index = length-1}
            }else{
                if(--index<0){index = 0}
            }
            $oUl.animate({left : -index * width},300);
            $tab.removeClass("on").eq(index).addClass("on");

            //左右按钮样式
            if(index===0 || index===length-1){
                $(this).addClass("on");
            }else{
                $btn.removeClass("on");
            }
        });

        //tab切换
        $tab.click(function(){
            index = $(this).index();
            $oUl.animate({left : -index * width},300);
            $tab.removeClass("on").eq(index).addClass("on");

            //左右按钮样式
            $btn.removeClass("on");
            if(index===0){
                $btn.eq(0).addClass("on");
            }else if(index===length-1){
                $btn.eq(1).addClass("on");
            }
        });  

        //第1部分文字滚动条
        (function(){
            var $oUl = $future.find(".con .txt"),
                $text = $oUl.find(".li-1 .text"),
                $area = $text.find(".scroll-area"),
                $scroll = $text.find(".scroll"),
                $bar = $scroll.find(".bar"),
                height = $text.height(),
                maxH = $area.height(),
                prop = height/maxH,
                barH = prop*height,
                max_top = height-barH;
            //初始化滚动条高度
            $bar.height(barH);
            //滚动条拖动
            $bar.mousedown(function(e){
                var sY = e.clientY ,
                    sTop = $(this).position().top;
                $(document).mousemove(function(e){
                    var nY = e.clientY,
                        top = sTop + nY - sY;
                    top = Math.max(top,0);
                    top = Math.min(top,max_top);
                    $bar.css({top:top});
                    $area.css({top:-top/height*maxH});
                    return false;
                }).mouseup(function(){
                    $(this).off("mousemove").off("mouseup");
                });
                return false;
            });
            //滚动条点击
            $scroll.click(function(e){
                if(e.target === this){
                    var nY = e.clientY - ($(this).offset().top - $(document).scrollTop()),
                        top = $bar.position().top;
                    if(nY>top){
                        top += 100;
                    }else{
                        top -= 100;
                    }
                    top = Math.max(top,0);
                    top = Math.min(top,max_top);
                    $bar.animate({top:top});
                    $area.animate({top:-top/height*maxH});
                }
            });
            //滚轮滚动
            $text.mousewheel(function(e,d){
                var top = $bar.position().top;
                top += d>0?-15:15;
                top = Math.max(top,0);
                top = Math.min(top,max_top);
                $bar.css({top:top});
                $area.css({top:-top/height*maxH});
                return false;
            })

        })();
        

        //最后部分文字切换
        $img.mouseenter(function(){
            $img.removeClass("on");
            $oP.eq(num).removeClass("on");
            num = $(this).index();
            $(this).addClass("on");
            $oP.eq(num).addClass("on");
        });
    })();

    //锚点滚动
    (function(){
        var $main = $("#main"),
            $link = $main.find(".top .left .link .link-2"),
            $target = $main.find(".content,.future");

        $link.click(function(){
            var index = $(this).index(),    //当前点击的序号
            now = $(document).scrollTop(),  //当前top值
            top = $target.eq(index===1?0:1).offset().top;//目标值
            move();
            function move(){
                if(now<top){    //小于目标值时
                    now +=170;  //每次加170
                    requestAnimationFrame(move);
                }else{
                    now = top -30;//让目标值少30像素
                }
                $(document).scrollTop(now);
            }
        }); 
    })();
});