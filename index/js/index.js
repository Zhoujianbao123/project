;(function(){
    "use strict";
    // //公共头部请求
    $(".publichead").load("http://localhost/store/publichtml/publichtml.html .publicheader",function(){
        new Index;
        new Top;
        new BannerTop;
        new Menu;
    });
    //公共尾部请求
    $(".publicfoot").load("http://localhost/store/publichtml/publichtml.html .publicfooter");
    /**
     * 顶部效果
     * 1.超链接文本进入离开触发变色效果
     * 2.超链接相应的拓展区域进入离开触发显示/隐藏效果
     */
    class Top{
        constructor(){
            this.showA = document.querySelectorAll("#top .show>li:not(.more) a");  // 顶部所有显示项
            this.hiddenA = document.querySelectorAll("#top .show .more");          // 顶部所有隐藏项
            this.color();
            this.hiddenShow();
        }
        // 顶部超链接划过效果——文本变色
        color(){
            for(let i=0;i<this.showA.length;i++){
                this.showA[i].addEventListener("mouseenter",()=>{
                    this.showA[i].style.color = "#ca151d";
                });
                this.showA[i].addEventListener("mouseleave",()=>{
                    this.showA[i].style.color = "";
                });

            }
        }
        // 顶部超链接划过效果——区域显示隐藏
        hiddenShow(){
            for(let i=0;i<this.hiddenA.length;i++){
                this.hiddenA[i].previousElementSibling.addEventListener("mouseenter",()=>{
                    this.hiddenA[i].style.display = "block";
                });
                this.hiddenA[i].previousElementSibling.addEventListener("mouseleave",()=>{
                    this.hiddenA[i].style.display = "none";
                });
            }
        }
    }

    /**
     * 菜单区轮播图效果
     * 1.左右按钮点击触发切换图片（上/下张图片）效果
     * 2.小圆点列表点击触发切换图片（选定的图片）效果
     * 3.自动播放（模拟右按钮点击效果）
     */
    class BannerTop{
        constructor(){
            this.index_all = document.querySelectorAll(".menu-c img");      // 所有图片
            this.box = document.querySelector(".menu-c");
            this.li = document.querySelectorAll("#menu .list li");                // 小圆点
            this.index = 0;
            this.delayTime = 2000;
            this.moveTime = 300;

            this.addEvent();
            this.autoAction();
        }

        // 绑定事件
        addEvent(){
            // 小圆点的点击事件
            let that = this;
            for(let i=0;i<this.li.length;i++){
                this.li[i].addEventListener("click",function(){
                    if($(this).index() > that.index){
                        that.listMove(1,$(this).index())
                    }
                    if($(this).index() < that.index){
                        that.listMove(-1,$(this).index())
                    }

                    // 点击之后，点击的就变成了当前
                    that.index = $(this).index();
                    // 设置list的li当前项，取消所有，给点击的设置
                    for(let i=0;i<that.li.length;i++){
                        that.li[i].style.backgroundColor = "";
                        that.li[i].style.color = "";
                    }

                    that.li[i].style.backgroundColor = "red";
                    that.li[i].style.color = "#fff";
                })
            }

            // 左右按钮点击事件
            let $right = $("#menu").find(".right");
            let $left = $("#menu").find(".left");

            $left.on("click",function(){
                let $img = $(".menu-c").find("img");
                // 计算索引
                if(that.index == 0){
                    that.index = $img.length-1;
                    that.iPrev = 0;
                }else{
                    that.index--;
                    that.iPrev = that.index+1;
                }
                that.btnMove(-1);
            });
            $right.on("click",function(){
                let $img = $(".menu-c").find("img");
                // 计算索引
                if(that.index == $img.length-1){
                    that.index = 0;
                    that.iPrev = $img.length-1;
                }else{
                    that.index++;
                    that.iPrev = that.index - 1;
                }
                that.btnMove(1);
            })
        }

        // 圆点点击的图片切换效果
        listMove(type,iNow){
            // 谁走：this.index
            // 谁进来：iNow
            let $img = $(".menu-c").find("img");
            $img.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-$img.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:$img.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
        }

        // 圆点点击的图片切换效果
        btnMove(type){
            let $img = $(".menu-c").find("img");
            // 要走的：this.iPrev
            // 要进来：this.index
            $img.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:-$img.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:$img.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime);

            // 设置list的li当前项，取消所有，给点击的设置
            for(let i=0;i<this.li.length;i++){
                this.li[i].style.backgroundColor = "";
                this.li[i].style.color = "";
            }
            this.li[this.index].style.backgroundColor = "red";
            this.li[this.index].style.color = "#fff";
        }

        // 自动播放效果
        autoAction(){
            let that = this;
            // 通过计时器执行右按钮的事件，实现自动轮播
            this.t = setInterval(() => {
                this.rightClick()
            }, this.delayTime);

            // A2.给大框添加鼠标进入和离开事件，做停止和继续
            this.box.addEventListener("mouseenter",function(){
                clearInterval(that.t);
            });
            this.box.addEventListener("mouseleave",function(){
                that.t = setInterval(() => {
                    that.rightClick()
                }, that.delayTime);
            })
        }
        // 自动播放实现的右按钮效果
        rightClick(){
            let $img = $(".menu-c").find("img");
            // B2-2.计算索引
            if(this.index == $img.length-1){
                this.index = 0;
                this.iPrev = $img.length-1;
            }else{
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(1);
        }
    }

    /**
     * 菜单效果
     * 1.鼠标进入/离开触发每个菜单项的显示/隐藏效果
     */
    class Menu{
        constructor(){
            this.amenuLi = document.querySelectorAll(".menu-l ul li");
            this.adiv = document.querySelectorAll(".menu-l-hidden div");
            this.addEvent();
        }

        // 绑定事件
        addEvent(){
            for(let i=0;i<this.amenuLi.length;i++){
                this.amenuLi[i].index = i;
                this.amenuLi[i].addEventListener("mouseenter",()=>{
                    for(let j=0;j<this.amenuLi.length;j++){
                       this.amenuLi[j].style.backgroundColor = "#fdfcfb";
                       this.adiv[j].style.display = "none";
                    }
                    this.amenuLi[i].style.backgroundColor = "#fff";
                    this.adiv[this.amenuLi[i].index].style.display = "block";
                });

                this.amenuLi[i].addEventListener("mouseleave",()=>{
                    for(let j=0;j<this.amenuLi.length;j++){
                        this.amenuLi[j].style.backgroundColor = "#fdfcfb";
                        this.adiv[j].style.display = "none";
                    }
                })
            }
        }
    }
    /**
     * 头部登录
     * 1.未登录状态取消购物车入口和注销入口
     * 2.登录状态新增注销入口、用名名显示和购物车入口，取消登录入口
     */
    class Index{
        constructor(){
            this.notLogin = document.querySelector(".not-login")
            this.loginS = document.querySelector(".login-success")
            
            this.user = document.querySelector(".login-success span")
            this.notLogin1 = document.querySelector(".not-login1");

            this.logout = document.querySelector(".logout");

            // 获取所有的用户信息
            this.init();
            // 添加注销事件
            this.addEvent();
        }
        addEvent(){
            // 点击注销时
            this.logout.onclick = ()=>{
                for(var i=0;i<this.usermsg.length;i++){
                    // console.log(this.usermsg.length)
                    // 找到要注销的账号
                    if(this.name == this.usermsg[i].user){
                        // 修改当前账号的登录状态为0
                        this.usermsg[i].onoff = 0;
                        // 隐藏登录成功的信息
                        this.notLogin.style.display = "block";
                        this.loginS.style.display = "none";
                        console.log(this.notLogin1);
                        this.notLogin1.style.display = "none";
                        // 再将用户的信息设置回去，实现真正的注销
                        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                        // 结束
                        return ;
                    }
                }
            }
        }
        init(){
            // 获取所有的用户信息直接转换，方便使用
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            // 开始验证
            this.check()
        }
        check(){
            // 拿到所有的信息
            for(var i=0;i<this.usermsg.length;i++){
                // 判断哪个用户的状态为已登录
                if(this.usermsg[i].onoff == 1){
                    // 显示登录成功的信息
                    console.log(this.notLogin);
                    this.notLogin.style.display = "none";
                   
                    this.loginS.style.display = "block";
                    this.notLogin1.style.display = "block";
                    //设置当前用户名
                    this.user.innerHTML = this.usermsg[i].user;
                    // 保存当前用户名，用作注销
                    this.name = this.usermsg[i].user;

                    return;
                }
            }
        }
    }

            
                

    

    
    
    // new Floor;

})();
