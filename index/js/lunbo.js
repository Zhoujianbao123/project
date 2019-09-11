;(function(){
    class Lunbo{
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
    new Lunbo;
})();