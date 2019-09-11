;$(function(){
    "use strict";
    // $(".nav-l").children("ul").children("li").mouseenter(function(){
    //     $(".nav-l").children("ul").children("li").children("ul").stop().hide(400);
        
    //     $(this).children("ul").stop().show(400);
    // })



    // $(".nav-l").children("ul").children("li").children("ul").children("li").mouseenter(function(){
    //     $(".nav-l").children("ul").children("li").children("ul").children("li").children("ul").stop().hide(400);
        
    //     $(this).children("ul").stop().show(400);
    // })
    class Morenav{
        constructor(){
            this.oNavleft=document.querySelector(".nav .nav-l");
            this.oUl1=document.querySelector(".nav .nav-l>ul");
            //console.log(this.oUl1);
            this.ospan1=document.querySelector(".nav .nav-l>ul>li>span");
            this.oul2=document.querySelector(".nav .nav-l>ul>li>ul");
            this.ospan2=document.querySelectorAll(".nav .nav-l>ul>li>ul>li>span");
            this.oli2=document.querySelector(".nav .nav-l>ul>li>ul>li");
            console.log(this.ospan2);
            this.show()
        }
        show(){
            this.ospan1.onmouseenter=()=>{
                this.oul2.style.display="block";
                this.change()
                this.moveOut()
            }
        }
        change(){
            //鼠标经过的时候，给每个span标签绑定事件
            var that=this;
            for(var i=0;i<this.ospan2.length;i++)
                // this.ospan2[i].index=i;
                 that.ospan2[i].onmouseover=function(){
                    for(var j=0;j<that.ospan2.length;j++){
                        that.ospan2[j].className="";
                        that.ospan2[j].nextElementSibling.style.display="none";
                        //console.log(that);
                        this.className="active";
                        this.nextElementSibling.style.display="block";  
                    } 
                 }       
        }
        moveOut(){
            this.oNavleft.onmouseleave=()=>{
                
                this.oNavleft.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.style.display="none";
            }
        }            
        }
        

    new Morenav;
})();
// ;(function(){
//     ;
// window.onload = function () {
//     var Ul = new ul();
//     Ul.over();
// }
// function ul(){
//     this.chanObj = document.getElementsByClassName("chan")[0];
//     this.Ou = document.getElementsByClassName("u")[0];
//     this.Ozi = document.getElementsByClassName('zi');
//     // this.Odiv = $(".u>.zi")[0].getElementsByClassName("daox");
//     this.Odiv = this.Ou.getElementsByClassName("daox");
// }
// ul.prototype.over =function () {
//     var This = this;
//     var s = 0;
//     this.chanObj.onclick = function(){
//         if(s == 0){
//             This.Ou.style.display = "none";
//             s = 1;
//         }else{
//             This.Ou.style.display = "block";
//             s = 0;
//         }
//     }
//     for (var i=0;i<this.Ozi.length;i++){
//         this.Ozi[i].index = i;
//         this.Ozi[i].onmouseover = function(){
//             for(var j=0;j<This.Odiv.length;j++){
//                 // console.log(1)
//                 if(this.index == j){
//                     This.Odiv[j].style.display = "block";
//                     this.style.background = "#f14b19";
//                 //     console.log(1)
//                 // console.log(Ozi[i])
//                 }
//             }
//         }
//         this.Ozi[i].onmouseout = function(){
//             This.Odiv[this.index].style.display = "none";
//             this.style.background = "";
//         }
//     }
// };

// })()