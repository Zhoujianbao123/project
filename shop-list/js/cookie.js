// 设置Cookie
function setCookie(key,value,options){
    options = options || {};

    let date = "";
    if(options.expires){
        let d = new Date;
        d.setDate = (d.getDate()+options.expires);
        date = `;expires=${d}`;
    }

    let path = options.path ? `;path=${options.path}` : "";
    document.cookie = `${key}=${value}${date}${path}`;
}

// 删除Cookie
function removeCookie(key,options){
    options = options || {};
    options.expires = -1;
    setCookie(key,null,options);
}

// 获取Cookie
function getCookie(key){
    let str = document.cookie;
    let arr = str.split("; ");
    for(let i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] == key){
            return arr[i].split("=")[1];
        }
    }
    return "";
}