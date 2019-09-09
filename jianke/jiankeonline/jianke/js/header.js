/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 11:03:55
 * @LastEditTime: 2019-09-06 11:04:18
 * @LastEditors: Please set LastEditors
 */
loginAndreg();
function loginAndreg() {
    $('#header_login').click(function () {
        let url = location.href;
        setCookie('url', url);
        console.log(url)
        location.href = 'login.html';

    })
    $('#header_reg').click(function () {
        location.href = 'register.html';
    })
    $('.car').click(function () {
        location.href = 'shoppingCar.html';
    })
}

function init() {
    let str = `
    <p>欢迎来到健客网网上药店!</p>
        <a href="###" id="header_login">登陆</a>
        <a href="###" id="header_reg">免费注册</a>
    `
    $('.header_nav_left').html(str);
    loginAndreg();
}
getUsername();
function getUsername() {
    let username = getCookie('username');
    if (username) {
        let newstr = `
        <p>你好：${username}，欢迎来到健客网网上药店!</p>
        <a href="###" id="quit" style="margin-left:10px;text-decoration:underline;">安全退出</a>
        `;
        $('.header_nav_left').html(newstr);
        $('#quit').click(function () {
            removeCookie('username');
            init();
            location.reload();
        })
    } else {
        init();
    }
}