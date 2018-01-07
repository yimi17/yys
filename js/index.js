/*
*   主页部分
* */

$(function(){
    //nav导航下拉列表
    (function(){
        var $main = $("#main"),
            $nav = $main.find(".nav"),
            $subNav = $nav.find(".subNav"),
            $assist = $nav.find(".assist"),
            $list = $nav.find(".list"),
            $logo = $main.find(".role .logo");

        //logo出场初始化
        $logo.delay(800).animate({"left":"50px"}).css("transition",".5s");

        //显示隐藏导航列表
        $subNav.mouseenter(function(){
            $list.addClass("on");
            $nav.addClass("on");
        });
        $list.mouseleave(function(){
            $list.removeClass("on");
            $nav.removeClass("on");
        });
        $assist.mouseenter(function(){
            $list.removeClass("on");
            $nav.removeClass("on");
        });

        //滚轮事件监听悬浮导航
        $(document).scroll(function(){
            var top = $(this).scrollTop();

            if(top>0){
                $nav.addClass("p-fixed");
                $logo.addClass("on");
            }else{
                $nav.removeClass("p-fixed");
                $logo.removeClass("on");
            }
        })

    })();

    //头部人物切换
    (function(){
        var $area = $("#main").find(".role .r-area"),
            $btn = $area.find(".btn"),
            $span1 = $area.find(".r-one").find("span"),
            $span2 = $area.find(".r-two").find("span"),
            bool = true,        //用于判断哪个显示
            time = 0;       //点击时间间隔

        //人物出场初始化
        $span1.addClass("show");

        $btn.click(function(){
            if(new Date()-time>1000){   //点击间隔大于1000毫秒才执行
                bool?roleShow($span1,$span2):roleShow($span2,$span1);
                bool = !bool;       
                time = new Date();      //更新时间
            }
        });
        function roleShow($s1,$s2){
            $s1.stop();
            $s2.stop();
            $s1.removeClass("show").delay(700).queue(function(){
                $s2.addClass("show");
            });
        }
    })();

    //下载内容展开
    (function(){
        var $area = $("#main").find(".role .r-area .r-download"),
            $div = $area.find("div"),
            $btn = $area.find(".back");

        $btn.click(function(){
            $area.toggleClass("on");
            setTimeout(function(){
                $div.toggle();
            },200)
        })
    })();

    //最新消息-图片轮播
    (function(){
        var $new = $("#main").find(".new .n-con"),
            $banner = $new.find(".n-banner"),
            $ul = $banner.find(".img"),
            $tab = $banner.find(".tab i"),
            imgW = $ul.find("li").width(),
            timer = null,
            length = $tab.length,
            index = 0;

        //图片轮播
        $tab.mouseenter(function(){
            imgChange($(this).index());
        });
        //清除定时器
        $banner.hover(function(){
            clearInterval(timer)
        },function(){
            imgAuto()
        });
        //自动轮播
        imgAuto();
        function imgAuto(){
            timer = setInterval(function(){
                imgChange(++index%length);
            },3000);
        }
        function imgChange(i){
            index = i;
            $ul.stop().animate({left:-i*imgW},500);
            $tab.removeClass("on").eq(i).addClass("on");
        }

    })();

    //最新消息-列表切换
    (function(){
        var $txt = $("#main").find(".new .n-con .n-txt"),
            $tab = $txt.find(".title .title-ul li"),
            $ul = $txt.find(".list .list-ul"),
            $li = $ul.find("li");

        //生成新闻数据
        $li.each(function(i){
            var num = 0;
            var obj = newData;
            var str = "";

            for(var j=0,length=obj.length;j<length;j++){
                var data = obj[j];

                if(data.typeX===i-1 || i===0){
                    str += "<div><a href='javascript:void(0)'>"+data.title+"</a><span>"+data.time+"</span></div>";
                    if(++num===5){break;}
                }
            }
            $(this).html(str);
        });
        $li.eq(0).find("div").eq(0).addClass("first");

        var width = $ul.find("li").width();
        $tab.mouseenter(function(){
            var index = $(this).index();
            $ul.stop().animate({left:-index*width},500);
            $tab.removeClass("on").eq(index).addClass("on");
        })
    })();

    //全部式神
    (function(){
        var $god = $("#main").find(".god"),
        $g_tab = $god.find(".g-tab .show"),
        $g_all = $god.find(".g-all");

        //生成式神数据
        (function(){
            var $list = $g_all.find(".left .con .list1");
            var arr = ['SSR','SR','R','N'];

            $list.each(function(i){
                var $ul = $("<ul></ul>");
                var num = 0;    //计数
                var str = "";   //存储字符串
                var isnew;      //新图片

                for(var j=0,length=shishenData.length;j<length;j++){
                    var obj = shishenData[j];
                    if(obj.level===arr[i-1] || i===0){
                        isnew = obj.isNew?" class='isnew'":"";
                        str+= "<span"+isnew+"><em>"+obj.name+"</em><img src='images/index/shishen/"+obj.id+".png'></span>";
                        if(++num%2===0){    //每生成2组数据，添加到新的li中
                            var $li = $("<li></li>").html(str);
                            $ul.append($li);
                            str = "";       //清空
                        }
                    }
                }
                //如果最后只有一组数据，就不满足上面的条件(模2)，因此需在最后这里进行判断
                if(str){$ul.append($("<li></li>").html(str))}
                $(this).append($ul);
            })
        })();

        //式神和主角切换
        (function(){
            var $part = $g_all.find(".part"),
            index = 0;
            $g_tab.click(function(){
                var i = $(this).index("div.show");
                //如果点击的不是本身，则执行
                if(i!==index){
                    index = i;
                    $g_tab.removeClass("on").eq(index).addClass("on");
                    $part.fadeOut(200).eq(index).fadeIn(200);
                }
            })
        })();

        //式神列表切换
        (function(){
            var $tab = $g_all.find(".left .tab .have"),
                $list = $g_all.find(".left .con .list1"),
                $btn = $g_all.find(".left .con .btn .subBtn"),
                $ul = $list.find("ul"),
                width = $list.parent().width(),  //移动的范围
                arr = [0,0,0,0,0];  //存储每个列表的序号

            //点击切换类型
            $tab.click(function(){
                var n = $(this).index();
                $list.hide().eq(n).show();
                $tab.removeClass("on").eq(n).addClass("on");
                $btn.hide().eq(n).show();

                var $subBtn = $btn.eq(n).find("span"),
                    length = Math.ceil($ul.eq(n).find("li").length/6);

                $ul.eq(n).stop().css({left:0});//还原位置

                arr[n] = 0;    //还原序号，↓↓↓还原点击按钮
                arr[n]===length-1?$subBtn.eq(1).addClass("hide"):$subBtn.eq(1).removeClass("hide");
                arr[n]===0?$subBtn.eq(0).addClass("hide"):$subBtn.eq(0).removeClass("hide");
            });
            //遍历添加事件
            $tab.each(function(){
                //每个类型单独添加点击事件
                var i = $(this).index(),
                    $subBtn = $btn.eq(i).find("span"),
                    length = Math.ceil($ul.eq(i).find("li").length/6);

                $subBtn.click(function(){
                    var n = $(this).index();

                    if(n){
                        if(++arr[i]>=length-1){arr[i]=length-1}
                    }else{
                        if(--arr[i]<=0){arr[i] = 0}
                    }

                    //第1或最后1页时，隐藏点击按钮
                    arr[i]===length-1?$subBtn.eq(1).addClass("hide"):$subBtn.eq(1).removeClass("hide");
                    arr[i]===0?$subBtn.eq(0).addClass("hide"):$subBtn.eq(0).removeClass("hide");

                    $ul.eq(i).stop().animate({left:-arr[i]*width});
                })
            });
            //初始化显示
            $list.hide().eq(0).show();
            $btn.hide().eq(0).show();
        })();

        //主角列表切换
        (function(){
            var $tab = $g_all.find(".right .tab ul li"),
                $list = $g_all.find(".right .con ul li"),
                index = 0;

            $tab.click(function(){
                var n = $(this).index();
                if(n!==index){
                    $tab.eq(index).removeClass("on");
                    $list.eq(index).fadeOut(300);
                    index = n;
                    $tab.eq(index).addClass("on");
                    $list.eq(index).fadeIn(300);
                }
            })
        })();
    })();

    //攻略
    (function(){
        var $question = $("#main").find(".question"),
            $banner = $question.find(".subBanner"),
            $conShow = $question.find(".conShow");

        //图片轮播
        (function(){
            var $btn = $banner.find(".btn i"),
                $img = $banner.find(".img a"),
                width = $banner.find(".img a img").width(),
                timer = null,
                index = 0;

            $btn.hover(function(){
                clearInterval(timer);   //清除定时器
                index = $(this).index();
                change();
            },function(){
                autoplay();     //添加定时器
            });
            //定时器添加和清除
            $img.hover(function(){
                clearInterval(timer);
            },function(){
                autoplay();
            });
            autoplay();
            //自动轮播
            function autoplay(){
                timer = setInterval(function(){
                    if(++index>1){index = 0}
                    change();
                },4000);
            }
            //执行函数
            function change(){
                $btn.removeClass("on").eq(index).addClass("on");
                $img.animate({left:-index*width});
            }
        })();

        //弹窗层
        (function(){
            var $open = $banner.find(".input span"),
                $pop_up = $banner.find(".pop-up"),
                $close = $pop_up.find(".bg .close");

            $open.click(function(){
                $pop_up.fadeIn(500);
            });
            $close.click(function(){
                $pop_up.fadeOut(500);
            })
        })();

        //生成文字内容
        (function(){
            var $li = $conShow.find(".list ul li");
            var arr = ['新手','式神','斗技','玩法','御魂','高阶'];

            $li.each(function(i){
                var count = 0;      //计数
                for(var j=0,length=strateData.length;j<length;j++){
                    var obj = strateData[j];

                    //正则判断，存在即添加
                    if(new RegExp(i-1).test(obj.type) || i===0){
                        var ch = i?arr[i-1]:arr[Math.floor(Math.random()*6)];   //类型
                        var $div = $("<div class='text'><p class='p1'>【"+ch+"】"+obj.title+"</p><p class='p2'>作者："+obj.author+"</p></div>");
                        $li.eq(i).append($div);
                        if(++count===10){break}     //每个类型限10条数据
                    }
                }
            })

        })();

        //文字轮播
        (function(){
            var $btn = $conShow.find(".tab ul li"),
                $Ul = $conShow.find(".list ul"),
                width = $Ul.find("li").width();

            $btn.mouseenter(function(){
                var i = $(this).index();
                $btn.removeClass("on").eq(i).addClass("on");
                $Ul.stop().animate({left:-i*width});
            })
        })();
    })();

    //同人专区
    (function(){
        var $area = $("#main").find(".colleagues"),
            $tab = $area.find(".tab .label ul li"),
            $Ul = $area.find(".img ul"),
            width = $Ul.find("li").width();

        $tab.mouseenter(function(){
            var i = $(this).index();
            $tab.removeClass("on").eq(i).addClass("on");
            $Ul.stop().animate({left:-i*width});
        })
    })();

    //活动专区-返回顶部
    (function(){
        var $main = $("#main"),
            // $nav = $main.find(".nav"),
            // $logo = $main.find(".role .logo"),
            $btn = $main.find(".activity .a-totop");

        $btn.click(function(){
            $("html,body").animate({scrollTop: 0},'normal');
 
            //隐藏悬浮导航及显示logo，前面的滚轮事件监听不了
            // setTimeout(function(){
            //     $nav.removeClass("p-fixed");
            //     $logo.removeClass("on");
            // },300); //延迟，滚动到顶部的同时出效果
        })
    })();

    //体验
    (function(){
        var $foot = $("#main").find(".experience"),
            top = $foot.offset().top-($(window).height()/2);
            //top=foot元素到文档顶部的距离减去窗口可视高的一半

        $(document).on({
            scroll : function(){
                if($(this).scrollTop()>(top-100)){
                    $foot.addClass("on");
                    // $(this).off("scroll");
                } 
            }
        })
    })();
});