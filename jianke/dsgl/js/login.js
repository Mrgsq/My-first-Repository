/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:46:46
 * @LastEditTime: 2019-09-06 11:19:58
 * @LastEditors: Please set LastEditors
 */
(function () {
    $('#loginbtn').click(() => {
        let _user = $('#username').val();
        let _pwd = $('#password').val();
        // console.log(_user, _pwd);
        if (_user && _pwd) {
            let p1 = new Promise(function (resolve, reject) {//创建一个promise对象
                $.ajax({
                    type: 'get',
                    url: '../api/checklogin.php',
                    data: {
                        username: _user,
                        password: _pwd,
                        check: 'checkuser'
                    },
                    success: str => {
                        resolve(str);
                    }
                });
            });
            p1.then(function (str) {
                // console.log(str);
                if (str == 'yes') {
                    location.href = '../html/guanli.html';
                    setCookie('admin', _user, 1);
                } else {
                    alert('你的账号密码有误');
                }
            });
        } else {
            alert('账号或密码不能为空');
        }
    });
})();