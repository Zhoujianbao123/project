;(function(){
    /**
     *购物车效果
     * 1.读取Cookie值来获取加入购物车的商品及其信息并将其渲染到页面上
     * 2.无商品信息时，显示购物车为空，并提供商品列表入口
     * 3.可以手动修改添加到购物车的各商品的数量
     * 4.可以手动删除添加到购物车的商品
     * 
     */
    $(".publichead").load("http://localhost/store/publichtml/publichtml.html .publicheader",
    function(res){
        console.log(res);
        this.imgObj1=document.querySelector("#header .left a img");
        
        
    
        this.imgObj1.src="../index/images/logo.png";
        
            new Index;
            new Top;
    });
    //公共尾部请求
    $(".publicfoot").load("http://localhost/store/publichtml/publichtml.html .publicfooter",function(){
        
        this.imgObj2=document.querySelector(".about a img");
        this.imgObj2.src="../index/images/footerweixin.png";
        this.imgObj3=document.querySelector("#footer .margin .footer-l img");
        this.imgObj3.src="../index/images/logo.png";
    });

    class Car{
        constructor(){
            this.tbody = document.querySelector("tbody");
            this.zhan = document.getElementById("zhanwei");
            this.url = "http://localhost/store/car/data/shopList.json";
            this.gouwuche = document.getElementById("gouwuche");
            this.guang = document.getElementById("guang");
            this.load();
            this.addEvent()
        }
        // 添加事件
        addEvent(){
            let that = this;
            this.tbody.addEventListener("click",function(eve){
                if(eve.target.className == "del"){

                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1);

                    });

                }
            });
            this.tbody.addEventListener("input",function(eve){
                if(eve.target.className == "num"){
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = eve.target.value;
                    });
                }
            })
        }
        // 改变Cookie
        changeCookie(callback){
            let i = 0;
            this.goods.some((val,index)=>{
                i = index;
                return val.id == this.id;
            })
            callback(i);
            setCookie("goods",JSON.stringify(this.goods),{path:"/store"});
        }
        // 请求商品数据
        load(){
            let that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.carGetCookie()
            })

        }
        // 获取Cookie中存在的商品信息
        carGetCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            this.display();
        }
        // 渲染页面
        display(){
            let str = "";
            if(this.goods != [] && this.goods != "" && this.goods != null){
                this.zhan.style.display = "none";
            }
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsId == goodsVal.id){
                        str += `<tr index="${resVal.goodsId}">
                                    <td class="w-25"><img src="${resVal.url}" class="w-50"></td>
                                    <td><h4>${resVal.name}</h4></td>
                                    <td><span>${resVal.price*goodsVal.num}</span></td>
                                    <td><input class="num" type="number" value="${goodsVal.num}" min=1></td>
                                    <td class="del"><input type="button">删除</input></td>
                                </tr>`;
                    }
                })
            });
            this.tbody.innerHTML = str;
        }
    }

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
        // 字体颜色
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
        // 显示隐藏
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
     * 头部登录
     * 1.登录状态取消购物车入口和登录入口
     * 2.登录状态新增注销入口、用名名显示和购物车入口
     */
    class Index{
        constructor(){
            this.notLogin = document.querySelector(".not-login");
            this.loginS = document.querySelector(".login-success");
            this.user = document.querySelector(".login-success span");

            this.btn = document.querySelector("#kong a");

            this.logout = document.querySelector(".logout");

            // 获取所有的用户信息
            this.init();
            // 添加注销事件
            this.addEvent();
        }
        // 添加事件
        addEvent(){
            // 点击注销时
            this.logout.onclick = ()=>{
                for(var i=0;i<this.usermsg.length;i++){
                    // console.log(this.usermsg.length)
                    // 找到要注销的账号
                    console.log(this.user)
                    console.log(this.name == this.usermsg[i].user)
                    if(this.name == this.usermsg[i].user){
                        // 修改当前账号的登录状态为0
                        this.usermsg[i].onoff = 0;
                        this.btn.href = "../login/login.html";
                        this.btn.innerText = "去登录";
                        // 隐藏登录成功的信息
                        this.notLogin.style.display = "block";
                        this.loginS.style.display = "none";
                        // 再将用户的信息设置回去，实现真正的注销
                        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                        // 结束
                        return ;
                    }
                }
            }
        }
        // 获取localStorage中的用户信息
        init(){
            // 获取所有的用户信息直接转换，方便使用
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            // 开始验证
            this.check()
        }
        // 判断登录状态
        check(){
            // 拿到所有的信息
            for(var i=0;i<this.usermsg.length;i++){
                // 判断哪个用户的状态为已登录
                if(this.usermsg[i].onoff == 1){
                    // 显示登录成功的信息
                    this.notLogin.style.display = "none";
                    this.loginS.style.display = "block";
                    //设置当前用户名
                    this.user.innerHTML = this.usermsg[i].user;

                    // 保存当前用户名，用作注销
                    this.name = this.usermsg[i].user;

                    return;
                }
            }
        }
    }

    //new Index;
    // new Top;
    new Car;
})();