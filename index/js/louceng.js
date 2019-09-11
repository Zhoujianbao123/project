;(function(){
    class Louceng{
        constructor(){
            this.lou=document.querySelectorAll(".margin");
            //console.log(this.lou[0].offsetTop);
            this.floor=document.getElementById("floor");
            this.ceng=document.querySelectorAll("#floor ul li");
            this.rxdp=document.getElementById("rxdp");
            console.log(this.rxdp);
            this.display();
            this.floorMove();
            // this.floor
        }
        display(){
            for(var i=0;i<this.ceng.length;i++){
                this.ceng[i].index=i;
                var that=this;
                this.ceng[i].onclick=function(){
                    console.log(that.ceng);
                    for(var j=0;j<that.ceng.length;j++){
                        that.ceng[j].className="";
                    }
                    this.className="action";
                    
                    document.documentElement.scrollTop=that.lou[this.index].offsetTop;
                }
            }
        }
        
        floorMove(){
            
            onscroll=()=>{
                if(document.documentElement.scrollTop>this.rxdp.offsetTop){
                    this.floor.style.top=parseInt(document.documentElement.scrollTop)+50+"px";
                } 
        }

    }
}
    new Louceng;
})();