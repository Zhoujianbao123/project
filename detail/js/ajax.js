// Ajax GET
function ajaxGet(url,success,data){
    data = data || {};

    let str = "";
    for(let i in data){
        str += `${i}=${data[i]}&`;
    }

    let d = new Date();
    url += `?${str}__sc=${d.getTime()}`;

    let ajax = new XMLHttpRequest();
    ajax.open("get",url,true);
    ajax.onreadystatechange = function(){
        if(ajax.status==200 && ajax.readyState==4){
            success(ajax.responseText);
        }
    };
    ajax.send();
}

//Ajax POST
function ajaxPost(url,success,data){
    data = data || {};
    let str = "";
    for(i in data){
        str += `${i}=${data[i]}&`;
    }
    str = str.slice(0,str.length-1);
    let ajax = new XMLHttpRequest();
    ajax.open("post",url,true);
    ajax.onreadystatechange = function(){
        if(ajax.status==200 && ajax.readyState==4){
            success(ajax.responseText);
        }
    };
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send(str);
}

//Jsonp
function jsonp(url,success,data){
    data = data || {};
    let str = "";
    for(i in data){
        str += `${i}=${data[i]}&`
    }

    let d = new Date();
    url += `?${str}__sc=${d.getTime()}`;

    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    window[data[data.columnName]] = function(res){
        success(res);
    }
}