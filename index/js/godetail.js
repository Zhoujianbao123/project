;(function(){
    "use strict";
    class Godetail{
        constructor(){
            console.log(111)
            this.oHot=document.querySelectorAll(".margin .hot ul li");
            console.log(this.oHot)
            this.url="http://localhost/store/detail/detail.html"
            this.addEvent()
        }
        addEvent(){
            var that=this;
            for(var i=0;i<this.oHot.length;i++){
                this.oHot[i].addEventListener("click",function(){

                   // console.log(this.firstElementChild)
                  that.src=this.firstElementChild.firstElementChild.src;
                 // console.log(that.src);
                 that.setData()
                })
            }
        }
        setData(){
            console.log(this.src);
        localStorage.setItem("src",JSON.stringify(this.src));
        setTimeout(()=>{
            location.href = this.url;
        },2000);

        }
    } 

    new Godetail;
})();
