var access_token = localStorage.getItem("access_token");
var client_auth = '';
var date = new Date(); // 日期初始化
var BaseUrl = ''; // ajax请求基础路径
var that = new Vue();

function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp('('+k+')').test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 *  确认弹框
 header：头部信息默认为“提示”，
 msg：提示信息默认为空，
 confirmButtonText：确认按钮文本，cancelButtonText：取消按钮文本，
 type：弹出框类型默认info，
 center：bool值 弹出框是否居中默认为false
 succFun 确认回调
 errFun  取消回调
 */
function confirmMsg(header,msg,succFun,errFun,confirmButtonText,cancelButtonText,type,center,useHtml) {
  that.$confirm(msg?msg:'', header?header:'提示', {
    confirmButtonText: confirmButtonText?confirmButtonText:'',
    cancelButtonText: cancelButtonText?cancelButtonText:'',
    type: type?type:'warning',
    center: center?center:false,
    dangerouslyUseHTMLString: useHtml == true?true:false,
    callback: function(action,instance) {
      if(action=='confirm'){
        succFun();
      } else{
        errFun();
      }
    },
  })
}
/**
 *    操作消息提示
 header：头部信息默认为“提示”，
 msg：提示信息默认为空，
 confirmButtonText：确认按钮文本，
 type：弹出框类型默认info，
 center：bool值 弹出框是否居中默认为false
 callback 回调
 */
function  alertMsg(header,msg,confirmButtonText,type,center,callback,useHtml) {
  that.$alert(msg?msg:'', header?header:'提示', {
    confirmButtonText: confirmButtonText?confirmButtonText:'确定',
    type: type?type:'info',
    center: center?center:false,
    dangerouslyUseHTMLString: useHtml == true?true:false,
    callback: function action() {
      if(!callback){
        return;
      }
      else{
        callback();
      }

    }
  });
}


/**
 * 请求服务器;
 * module  模块名称必填
 * @param  param 参数
 * @cb 回调函数
 */
function request(module,param,cbSun,cbErr){
  requestProxy({url:param.url, type:param.type, data:param.data,async:param.async,ContentType:param.ContentType,timeout: param.timeout},cbSun,cbErr);
}

/**
 * 请求参数:
 * @param  param { url type data timeout} callback
 */
function requestProxy(param,cbSun,cbErr){
  $.ajax({
    type: param.type || 'post',
    dataType: "json",
    data: param.data,
    url: BaseUrl + param.url,
    headers: {
      'Content-Type' :param.ContentType || 'application/x-www-form-urlencoded;',
      'Authorization': 'bearer '+access_token
    },
    xhrFields: {
      withCredentials: true
    },
    async:typeof param.async === "undefined"?true:param.async,
    crossDomain: true,
    timeout: param.timeout || 30000,
    success:function (res) {
      if(typeof cbSun === "function") cbSun(res)
    },
    error:function (err) {
      if(err.status == '401' && err.responseJSON.clientModel == 'rsServer'){
        client_auth = err.responseJSON.clientAuth;
        var url = window.location.href;
        var serverUrl = err.responseJSON.ssoServerUrl;
        var b = new Base64();
        var baseUrl = b.encode(url);
        window.location.href = '/framework-ui/src/main/resources/static/agcloud/login/login.html?reBackurl='+baseUrl+'&client_auth='+client_auth+'&serverUrl='+serverUrl;
      }else if(typeof cbErr === "function"){
        cbErr(err)
      }else if(err.status == '401') {
        that.$message({
          message: err.message?err.message:''+'未获取到登录信息，请检查登陆状态！',
          type: 'error'
        });
      }
    }
  });
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
function Base64() {

  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
