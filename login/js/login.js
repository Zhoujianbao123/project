;(function(){
    /**
     * 登录效果
     * 1.登录时验证身份
     * 2.成功3秒后跳转到首页
     * 3.失败显示友情提示
     */
    class Login{
        constructor(){
            this.user = document.querySelector("#username");
            this.pass = document.querySelector("#password");
            this.btn = document.querySelector("#login");
            this.msg = document.querySelector("#msg");

            this.addEvent()
        }
        // 绑定事件
        addEvent(){
            this.btn.onclick = ()=>{
                // 点击时先获取localStorage
                this.getUserMsg()
            }
        }
        // 获取localStorage中的用户信息并转换
        getUserMsg(){
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            this.check()
        }
        // 验证
        check(){
            // 所有用户名
            for(let i=0;i<this.usermsg.length;i++){
                // 用户和密码是否匹配
                if(this.usermsg[i].user == this.user.value && this.usermsg[i].pass1 == this.pass.value){
                    // 登录成功的账号状态
                    this.usermsg[i].onoff = 1;
                    localStorage.setItem("usermsg",JSON.stringify(this.usermsg));
                    this.msg.innerHTML = "登录成功，三秒后跳转到首页";
                    // 三秒后跳转
                    setTimeout(() => {
                        location.href = "http://localhost/store/index/index.html";
                        console.log(location.href)
                    }, 3000);
                    // 结束
                    return;
                }
            }
            // 登录失败
            this.msg.innerHTML = "账号密码不符，请重新登录或去注册";
            setTimeout(() => {
                this.msg.style.cssText = "display:none";
            },2000)
        }
    }

    /**
     * 取消默认信息效果
     * 1.点击输入框时，输入框中的默认提示文本消失
     * 2.对应的输入框失去焦点时，默认提示文本显示
     */
    class Cancel{
        constructor(){
            this.minBC = document.querySelector(".center-r-c");
            this.input = document.querySelectorAll(".center-r-c .cancel");
            this.addEvent();
        }
        // 绑定事件
        addEvent(){
            this.minBC.addEventListener("click",function(e){
                if(e.target.className == "cancel"){
                    e.target.value = "";
                }
            });

            for(let i=0;i<this.input.length;i++){
                this.input[i].addEventListener("blur",()=>{
                    if(this.input[i].value == ""){
                        switch(i){
                            case 0:this.input[i].value = "手机号/邮件地址/唯品会账号";break;
                            case 1:this.input[i].value = "密码";break;
                        }
                    }
                })
            }

        }
    }


    new Cancel;
    new Login;


})();