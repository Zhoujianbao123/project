;(function(){
    /**
     * 商品列表效果
     * 1.ajax请求json数据并渲染页面
     * 2.无数据时，显示暂无商品出售友情提示
     * 3.点击添加购物车按钮可以添加对应的商品信息到Cookie中
     */
    $(".publichead").load("http://localhost/store/publichtml/publichtml.html .publicheader",
    function(res){
        console.log(res);
        this.imgObj1=document.querySelector("#header .left a img");
        this.imgObj1.src="../index/images/logo.png";
        
            new Index;
    });
    //公共尾部请求
    $(".publicfoot").load("http://localhost/store/publichtml/publichtml.html .publicfooter",function(){
        
        this.imgObj2=document.querySelector(".about a img");
        this.imgObj2.src="../index/images/footerweixin.png";
        this.imgObj3=document.querySelector("#footer .margin .footer-l img");
        this.imgObj3.src="../index/images/logo.png";
    });

    class shopList{
        constructor(){
            this.box = document.querySelector("#box");          // 最外框
            this.url = "http://localhost/store/shop-list/data/shoplist.json";      // 商品数据接口
            this.row = document.querySelector(".row");
            this.row_children = this.row.children;
            this.load();
            this.addEvent();
        }

        // 无商品时的信息
        none(){
            // 无商品时的展示信息
            this.em = document.createElement("em");
            this.em.className = "goods_show";
            this.em.innerText = "目前暂无商品出售！";
            box.appendChild(this.em);
        }

        //绑定事件
        addEvent(){
            // 加入购物车按钮
            // 因为页面上初始没有按钮元素，所以利用委托给将来出现的按钮绑定事件
            this.row = document.querySelector(".row");
            this.row.addEventListener("click",(eve)=>{
                if(eve.target.nodeName == "BUTTON"){
                    this.id = eve.target.parentNode.getAttribute("sc");
                    this.setCookie();
                }
            })

            for(let i=0;i<this.row_children.length;i++){
                this.row_children[i].addEventListener("click",()=>{
                    this.setCookie();
                })
            }
        }

        // 设置Cookie
        setCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            if(this.goods.length == 0){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                let i = 0;
                let onoff = this.goods.some((val,index)=>{
                    i = index;
                    return val.id == this.id;
                });

                if(onoff){
                    // 老商品:
                    // 修改对应对象的num属性
                    this.goods[i].num++
                }else{
                    // 新商品:
                    // 增加对象
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            // 再设置
            setCookie("goods",JSON.stringify(this.goods),{
                path:"/store"
            });
        }

        // 加载商品信息
        load(){
            ajaxGet(this.url,(res)=>{
                this.res = JSON.parse(res);
                this.display();

            })
        }

        // 渲染数据
        display(){
            let str = "";
            for(let i=0;i<this.res.length;i++){
                str += `<div class="col-3 text-center" sc="${this.res[i].goodsId}">
                            <img src="${this.res[i].url}" class="w-75"/>
                            <h6>${this.res[i].name}</h6>
                            <span class="btn-block">${this.res[i].price}</span>
                            <button type="button" class="btn btn-lg btn-info addcar">添加购物车</button>
                        </div>`
            }
            this.row.innerHTML = str;
        }
    }

    /**
     * 头部登录
     * 1.登录状态取消购物车入口和登录入口
     * 2.登录状态新增注销入口、用名名显示和购物车入口
     */
    class Index{
        constructor(){
            this.notLogin = document.querySelector(".not-login")
            this.loginS = document.querySelector(".login-success")
            this.user = document.querySelector(".login-success span")
            this.notLogin1 = document.querySelector(".not-login1");

            this.addcar = document.querySelectorAll(".addcar");

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
                        // for(let i=0;i<this.addcar.length;i++){
                        //     console.log(this.addcar[i]);
                        //     this.addcar[i].style.display = "none";
                        // }
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

    // new Index;
    new shopList;


})();