/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:52:45
 * @LastEditTime: 2019-09-06 10:53:08
 * @LastEditors: Please set LastEditors
 */
(function () {
    pswcheck();
    function pswcheck() {
        $('#password').blur(function () {

            let pswreg = /^[a-zA-Z]\w{5,17}$/;
            let psw = $(this).val();
            if (psw) {
                if (pswreg.test(psw)) {
                    $('.res').eq(0).html('密码验证通过').css('color', '#58bc58');
                } else {
                    $('.res').eq(0).html('密码不符合').css('color', 'red');
                }
            } else {
                $('.res').eq(0).html('请填写密码').css('color', 'red');
            }

        });
        $('#password1').blur(function () {
            let pswreg = /^[a-zA-Z]\w{5,17}$/;
            let psw = $(this).val();
            if (psw) {
                if (pswreg.test(psw)) {
                    $('.res').eq(1).html('密码验证通过').css('color', '#58bc58');
                } else {
                    $('.res').eq(1).html('密码不符合').css('color', 'red');
                }
            } else {
                $('.res').eq(1).html('请填写密码').css('color', 'red');
            }

        })
    }

    $('#save').click(() => {
        console.log(1);
        let username = getCookie('username');

        pswcheck();
        let password = $('#password').val();
        let password2 = $('#password1').val();
        if (confirm('你确定要修改密码？')) {
            $.ajax({
                type: 'post',
                url: '../api/checklogin.php',
                data: {
                    username: username,
                    password: password,
                    // pswrepeat: password2,
                    check: 'updatapsw'
                },
                success: str => {
                    if (str == 'yes') {
                        alert('修改成功');
                    } else {
                        alert('修改失败');
                    }
                }
            })
        }

    })
})();