;(function(){

    $(".publichead").load("http://localhost/store/publichtml/publichtml.html .publicheader",
    function(res){
        this.imgObj1=document.querySelector("#header .left a img");
        this.imgObj1.src="../index/images/logo.png";
    });
    //公共尾部请求
    $(".publicfoot").load("http://localhost/store/publichtml/publichtml.html .publicfooter",function(){
        this.imgObj2=document.querySelector(".about a img");
        this.imgObj2.src="../index/images/footerweixin.png";
        this.imgObj3=document.querySelector("#footer .margin .footer-l img");
        this.imgObj3.src="../index/images/logo.png";
    });
    class Fangda{
        constructor(){
            this.sBox = document.querySelector(".detail-l-s");
            this.sImg = this.sBox.children[0];
            this.bBox = document.querySelector(".detail-l-b");
            this.bImg = this.bBox.children[0];

            this.addEvent()
        }
        addEvent(){
            //获取主页面保留的图片地址，实现同步效果；
            this.src= localStorage.getItem('src')?JSON.parse(localStorage.getItem("src")):[];
            this.sImg.src=this.src;
            this.bImg.src=this.src;
            let that = this;
            this.sBox.onmouseenter = function(){
                that.show()
            };
            this.sBox.onmouseleave = function(){
                that.hide()
            };
            this.sBox.onmousemove = function(e) {
                that.move(e);
            }
         }
        show(){
            this.bBox.style.display = "block";

            if(!this.span){
                this.span = document.createElement("span");
                let w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
                let h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;
                this.span.style.cssText = `width:${w}px;height:${h}px;background:url(${this.src});background-size:430px 450px;position:absolute;left:0;top:0;margin-top:0px;`;
                this.sBox.appendChild(this.span);
            }

            this.span.style.display = "block";
            this.sImg.style.opacity = "0.6"
            }

        // 隐藏效果
        hide(){
            this.span.style.display = "none";
            this.bBox.style.display = "none";

            this.sImg.style.opacity = "1"
        }
        // 移动和显示的比例计算
        move(e){
            let l = e.clientX - this.sBox.offsetLeft - this.span.offsetWidth/2-120;
            let t = e.clientY - this.sBox.offsetTop - this.span.offsetHeight/2;
            if(l < 0) l=0;
            if(t < 0) t=0;
            if(l > this.sBox.offsetWidth - this.span.offsetWidth){
                l = this.sBox.offsetWidth - this.span.offsetWidth
            }
            if(t > this.sBox.offsetHeight - this.span.offsetHeight){
                t = this.sBox.offsetHeight - this.span.offsetHeight;
            }
            //	方框的位置
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";

            //	方框移动的比例
            let x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
            let y = t / (this.sBox.offsetHeight - this.span.offsetHeight);

            //	大图移动的距离
            this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
            this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";

            this.span.style.backgroundPosition = -l + "px " + -t +"px";
        }
    }


    new Fangda;

})();