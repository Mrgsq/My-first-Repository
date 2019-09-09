
// let aaa = $('.product-list a img');
// let arr = [];
// for (var i = 0; i < 50; i++) {
//     arr[i] = {
//         img: aaa[i].src,
//     }
// }
/*
 * @Description: 获取cookie
 * @Author: your name
 * @Date: 2019-08-13 20:25:25
 * @LastEditTime: 2019-09-03 10:46:36
 * @LastEditors: Please set LastEditors
 */

function setCookie(key, val, iDay) {
    //key:键名  val:键值 iDay:失效时间
    let now = new Date();
    now.setDate(now.getDate() + iDay);
    document.cookie = key + '=' + val + ';expires=' + now.toUTCString() + ';path=/';//设置一个站点内的文件可以共享此cookie

}


function getCookie(key) {
    let cookies = document.cookie; //name=xxx; pwd=123
    let arr = cookies.split('; ');//['name=xxx','pwd=123']
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');//['name','xxx'] ['pwd','123']
        if (key == arr2[0]) {//'name'
            return arr2[1] //'xxx'
        }
    };
}

function removeCookie(key) {
    setCookie(key, '', -1);
}
/*
 * @Description: ajax()
 * @Author: your name
 * @Date: 2019-08-13 20:25:25
 * @LastEditTime: 2019-08-20 13:52:41
 * @LastEditors: Please set LastEditors
 */
function ajax(opt) {
    //获取类型 路径 要传的数据data 是否异步
    let defaultData = {
        type: 'get',
        url: '',
        istrue: true,//是否异步 默认为true
        data: {
            // name : '',

        },//要传的数据data
        failure: ''//响应失败
    }
    Object.assign(defaultData, opt);
    let xhr = new XMLHttpRequest();
    if (defaultData.type.toLowerCase() == 'get') {
        //如果为get方法
        defaultData.data = objToStr(defaultData.data);
        //将对象转换成字符串
        let url = defaultData.url + '?' + defaultData.data;//拼接url与要传的数据
        xhr.open('get', url, defaultData.istrue);
        xhr.send(null);
    } else if (defaultData.type.toLowerCase() == 'post') {
        //如果为post方法
        xhr.open('post', defaultData.url, defaultData.istrue);
        //传入url
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        //头部发送方法
        xhr.send(objToStr(defaultData.data));//传的数据
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {//请求成功
            if (xhr.status == 200 || xhr.status == 304) {
                //响应成功
                let data = xhr.responseText;
                // if ()
                // console.log(data);
                defaultData.success(data);
            }
            else {//响应失败

                if (defaultData.failure) {//如果有就返回xhr.status
                    defaultData.failure(xhr.status);
                }
            }
        }
    }


}

/*
 * @Description: 运动
 * @Author: your name
 * @Date: 2019-08-09 21:28:24
 * @LastEditTime: 2019-08-13 20:58:59
 * @LastEditors: Please set LastEditors
 */
function startMove(obj, json, fnend) {
    clearInterval(obj.timer);//开启之前先清除
    obj.timer = setInterval(function () {
        var istrue = true;
        for (var key in json) {
            var cur = 0;
            if (key == 'opacity') {//初始值
                cur = css(obj, key) * 100;//透明度
            } else {
                cur = parseInt(css(obj, key));
            }
            var speed = (json[key] - cur) / 6;//出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur != json[key]) {
                istrue = false;
            } else {
                istrue = true;
            }
            //3.运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opcaity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px';//针对普通属性 left top 
            }
        }

        //4.回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }
    }, 30);
}
/*
 * @Description: 冒泡排序
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-08-10 09:13:17
 * @LastEditTime: 2019-08-10 09:12:52
 * @LastEditors: Please set LastEditors
 */
function bubbleSort(arr) {//传入一个数组
    // var num = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;//返回一个从大到小降序的数组
}
/*
 * @Description: 对象转换成参数
 * @Author: your name
 * @Date: 2019-07-31 17:59:44
 * @LastEditTime: 2019-08-02 19:47:10
 * @LastEditors: Please set LastEditors
 */
function objToStr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(0, -1);
}
/*
 * @Description: 参数转化成对象
 * @Author: your name
 * @Date: 2019-07-31 17:59:44
 * @LastEditTime: 2019-07-31 18:44:20
 * @LastEditors: Please set LastEditors
 */
function strToObj(str) {
    var obj = {};
    var arr = str.split('&');//获取截取后的字符串放进数组
    arr.forEach(function (item) {
        var arr2 = item.split('=');
        obj[arr2[0]] = arr2[1];

    });
    return obj;
}
/*
 * @Description: 事件绑定函数
 * @Author: your name
 * @Date: 2019-08-07 11:25:24
 * @LastEditTime: 2019-08-09 21:28:43
 * @LastEditors: Please set LastEditors
 */
function bind(ele, type, fn) {
    if (ele.addEventListener) {//在主流浏览器当中
        ele.addEventListener(type, fn, false);
    } else {//非主流浏览器
        ele.attachEvent('on' + type, fn);
    }
}
/*
 * @Description: 封装设置和封装样式
 * @Author: your name
 * @Date: 2019-08-07 11:25:24
 * @LastEditTime: 2019-08-08 14:32:36
 * @LastEditors: Please set LastEditors
 */
function css() {
    if (arguments.length == 2) {//两个参数 标签，要获取的属性
        if (getComputedStyle(arguments[0], false)) {//高级浏览器获取样式值
            return getComputedStyle(arguments[0], false)[arguments[1]];
        } else {
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {//三个参数 节点.属性 = 属性值
        arguments[0].style[arguments[1]] = arguments[2];
    }
}

/*
 * @Description: 正则验证的方法
 * @Author: your name
 * @Date: 2019-08-07 11:25:24
 * @LastEditTime: 2019-08-08 13:47:54
 * @LastEditors: Please set LastEditors
 */
var checkReg = {
    username: function (str) {//验证用户名
        var reg = /^[a-z][\w\-]{5,19}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    telphonenum: function (str) {//验证电话号码
        var reg = /^1[3-9]\d{9}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    password: function (str) {//验证密码
        var reg = /^[a-zA-Z_]\w{5,19}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }

    },
    birthday: function (str) {//验证字符串
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    idcardnum: function (str) {//验证身份证
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    chinese: function (str) {//验证中文字
        var reg = /^[\u2E80-\u9FFF]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    email: function (str) {
        var reg = /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    // pwdrepeat: function (str1, str2) {
    //     if (str1 == str2) {
    //         return true
    //     } else {
    //         return false;
    //     }
    // }
}
//  var istrue={};
function checkInput(ele, reg, inf, meg) {
    // 参数一:ele 要正则验证的表单
    //参数二:reg 正则不同
    //参数三：inf 提示信息节点不同
    //参数四：meg 提示信息不同，对象

    ele.onblur = function () {

        var val = ele.value.trim();
        var index = this.dataset.index;//用自定义属性的属性值
        //1.非空验证
        if (val) {
            var res = checkReg[reg](val);//验证控件的值

            if (res) {
                //验证位true
                inf.innerHTML = meg.success;//提示信息的文本值为meg对象里的success
                ele.istrue = true;//如果验证成功向数组里添加一个真
            } else {
                inf.innerHTML = meg.failure;//验证失败提示meg对象里的failure;
                ele.istrue = false;//如果验证失败项数组里添加一个false;
            }
        }
        else {
            inf.innerHTML = meg.null;//如果控件未填写就显示meg对象里的null值
            ele.istrue = false;//未填写也为false如果istrue[index]之前有值则将覆盖
            //防止出现验证成功后清空重填的误操作
        }
    }
}
// function checkpwsrepeat(ele)
/*
 * @Description: 过滤敏感词
 * @Author: your name
 * @Date: 2019-07-27 11:55:15
 * @LastEditTime: 2019-08-07 11:27:21
 * @LastEditors: Please set LastEditors
 */

function filterWord(str) {
    var arr = ['fuck', '我丢', '垃圾', '菜鸡', '卧槽', '日', '操'];

    for (var i = 0; i < arr.length; i++) {

        var reg = new RegExp(arr[i], 'ig');
        str = str.replace(reg, "**");

    } return str;

}

/* 
 * @Description: 数组排序
 * @Author: your name
 * @Date: 2019-07-25 20:43:34
 * @LastEditTime: 2019-07-27 11:58:06
 * @LastEditors: Please set LastEditors
 */

function ArraySort(arr) {
    for (var i = 1; i < arr.length; i++) {//根据数组长度进行循环，i为数组的下标
        for (var j = i; j > 0; j--) {//循环排序

            //如果前一个值大于后一个值，则将两个值对调
            if (arr[j] < arr[j - 1]) {
                var temp = arr[j];//将小的数据赋值给一个临时变量temp
                arr[j] = arr[j - 1]//将比较出来的大的数据赋值给小的
                arr[j - 1] = temp;//将temp里面的值赋给第一个数据
                //这样三者之间就完成转换，第一个值与第二个值换了位置
            }
        }
    }
    return arr;
}
/*
 * @Description: 数组去重
 * @Author: your name
 * @Date: 2019-07-25 20:43:34
 * @LastEditTime: 2019-07-26 19:28:39
 * @LastEditors: Please set LastEditors
 */

function norepeat(arr) {
    var newArr = [];//用于接受去重后返回新的数组
    //首先遍历数组
    arr.forEach(function (item) {
        if (newArr.indexOf(item) == -1) {//如果新数组中不存在元素组中的值，就把这个值添加进新数组
            newArr.push(item);
        }
    });
    return newArr;//返回新的数组到入口
}

/*
 * @Description: 任意范围随机数
 * @Author: your name
 * @Date: 2019-07-23 19:22:06
 * @LastEditTime: 2019-07-26 17:09:10
 * @LastEditors: Please set LastEditors
 */
function random(min, max) {
    if (max > min) {//最小范围在前
        var num = parseInt(Math.random() * (max - min + 1) + min);
    }
    else {//最小范围在后
        var num = parseInt(Math.random() * (min - max + 1) + max);

    } return num;
}


/*
 * @Description: 随机四位验证码
 * @Author: your name
 * @Date: 2019-07-23 19:22:06
 * @LastEditTime: 2019-07-23 21:59:18
 * @LastEditors: Please set LastEditors
 */
function randomCode() {
    var html = "1abcdklmHIJ678KLpqr23EFNOPWXG590stuvwx4yzQRSTUVABefghijCMYZ";
    var code = "";
    for (var i = 1; i <= 4; i++) {
        var num = parseInt(Math.random() * html.length);
        code += html[num];
        // console.log(i);
    } return code;
}




/*
 * @Description: 随机颜色
 * @Author: your name
 * @Date: 2019-07-23 19:22:06
 * @LastEditTime: 2019-07-23 19:38:08
 * @LastEditors: Please set LastEditors
 */
function randomColor() {
    var html = "123456789abcdef";
    var num = ""
    num += "#";
    for (var i = 0; i < 6; i++) {
        var n = parseInt(Math.random() * html.length);//在html的16位中4取随机六位
        num += html[n];
    } return num;
}

function toDb(num) {
    if (num < 10) {
        return '0' + num;
    }else{
        return ''+num;
    }
}


