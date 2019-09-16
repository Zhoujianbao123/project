;(function(){
    "use strict";
    // //公共头部请求
    $(".publichead").load("http://localhost/store/publichtml/publichtml.html .publicheader",function(){
        new Index;
        new Top;
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

})();
