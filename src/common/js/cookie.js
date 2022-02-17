 function get(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        this.loginInfo.username = arr[2]
    } else {
        this.loginInfo.username = ''
        return null;
    }
}
export {get}