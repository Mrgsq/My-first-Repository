/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 11:01:03
 * @LastEditTime: 2019-09-06 11:01:03
 * @LastEditors: your name
 */
(function () {
    $(document).ready(function () {//页面加载空控件内容
        $('#agreebox').attr('checked', 'true');
        $('#username').val('');
        $('#tel').val('');
        $('#phone').val('');
        $('#password').val('');
        $('#repeat').val('');
        $('#yanzhengma').val('');
        $('#phoneNum').val('');
    })
    $('#login_btn').click(() => {
        location.href = 'login.html';
    })
    $('#guanggao').click(function () {
        window.open('https://im.jianke.com/chat.aspx?utype=2&ftype=1&siteid=a1wei&number=1&uname=null&ismember=null&memToken=&eng=0&act=0&refurl=https%3A%2F%2Fwww.jianke.com%2Fuser%2Fregister');
    });
    $('#username').blur(function () {//验证用户名
        let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/;
        let username = $(this).val();
        // console.log(tel);
        if (reg.test(username)) {

            $(this).parent().find('h4').attr('isok', true).html('用户名可用').css('color', '#58bc58');
        } else {
            $(this).parent().find('h4').attr('isok', false).html('用户名不合法').css('color', 'red');
        }
    })
    $("#tel").bind("input propertychange", function () {
        let reg = /^1[3456789]\d{9}$/;
        let tel = $(this).val();
        // console.log(tel);
        if (reg.test(tel)) {
            // setCookie('tel', tel, 1);
            $.ajax({
                type: 'post',
                url: '../api/reg.php',
                data: {
                    tel: tel,
                    name: 'checkusername'
                },
                // dataType: 'json',
                success: str => {
                    // let data = JSON.parse(str);
                    console.log(str);
                    if (str == 'no') {
                        $(this).parent().find('h4').attr('isok', true).html('此手机号可以使用').css('color', 'green');
                    } else {
                        $(this).parent().find('h4').attr('isok', false).html('此手机号已被注册').css('color', 'red');
                    }
                }
            });
            $(this).parent().find('h4').attr('isok', true).html('手机号正确').css('color', '#58bc58');
        } else {
            $(this).parent().find('h4').attr('isok', false).html('请输入正确的手机号').css('color', 'red');
        }
    });
    // $('.yanzheng')

    let arr1 = ['../img/regimgs/reg1.jpg', '../img/regimgs/reg2.jpg', '../img/regimgs/reg3.jpg', '../img/regimgs/reg4.jpg', '../img/regimgs/reg5.jpg', '../img/regimgs/reg6.jpg', '../img/regimgs/reg7.jpg'];
    let arr2 = ['nnwn', 'n6b4', 'nm3n', 'bmn3', '6g4y', 'n4gc', 'bwm3'];
    let i = 0;
    function randomimg() {//更新随机验证
        i = parseInt(Math.random() * 8); //取一个随机数
        console.log(i);
        $('#yanzhengimg').attr('src', arr1[i]);
    }

    randomimg();
    $('#updataimg').click(function () {
        randomimg();
    });
    $('#yanzhengma').change(function () {
        if ($(this).val() == arr2[i]) {
            $(this).parent().find('h4').attr('isok', true).html('验证码输入正确').css('color', '#58bc58');

        } else {
            $(this).parent().find('h4').attr('isok', false).html('验证码输入错误').css('color', 'red');
            $(this).val('');
            randomimg();
        }
    })
    $('#password').blur(function () {
        let password = $(this).val();
        let pswreg = /^[\w_-]{6,16}$/;
        console.log(pswreg.test(password));
        if (password) {
            if (pswreg.test(password)) {
                // console.log(1);
                $('#password').parent().find('h4').attr('isok', true).html('密码格式正确').css('color', 'green');
            } else {
                $('#password').parent().find('h4').attr('isok', false).html('密码格式有误').css('color', 'red');
            }
        } else {
            $(this).parent().find('h4').attr('isok', false).html('请输入密码').css('color', 'red');
        }
    })
    $('#repeat').blur(function () {
        let num1 = $('#password').val();

        if (num1) {
            let num2 = $(this).val();
            if (num2) {
                if (num1 == num2) {
                    $(this).parent().find('h4').attr('isok', true).html('密码一致').css('color', 'green');
                } else {
                    $(this).parent().find('h4').attr('isok', false).html('密码不一致').css('color', 'red');
                }
            } else {
                $(this).parent().find('h4').attr('isok', false).html('请再次密码').css('color', 'red');
            }
        } else {
            $('#password').parent().find('h4').attr('isok', false).html('请输入密码').css('color', 'red');
        }
    })
    let phoneCode = 0;
    //获取短信
    $('#duanxinbtn').click(function () {
        if ($('#tel').val()) {
            // let tel = getCookie('tel');
            $.ajax({
                type: 'post',
                url: '../api/duanxin.php',
                data: {
                    userphone: $('#tel').val()
                },
                success: str => {
                    console.log(str);
                    let data = JSON.parse(str)
                    phoneCode = data['phonecode'];
                }
            });
        } else {
            $('#tel').parent().find('h4').html('请输入手机号码').css('color', 'red');
        }

    })
    $('#phoneNum').blur(function () {
        let num = $(this).val();
        if (num) {

            if (num == phoneCode) {
                $(this).parent().find('h4').attr('isok', true).html('短信验证码正确').css('color', 'green');
            } else {
                $(this).parent().find('h4').attr('isok', false).html('短信验证码不正确').css('color', 'red');
            }
        } else {
            $(this).parent().find('h4').attr('isok', false).html('请输入短信验证码').css('color', 'red');
        }
    })
    $('#agreebox').click(function () {
        console.log($('#agreebox').prop('checked'))
        if ($('#agreebox').prop('checked')) {
            $('#regbtn').attr('disabled', 'true').css('background', '#32a1e8');
        } else {
            $('#regbtn').attr('disabled', 'flase').css('background', '#ccc');
        }
    })
    $('#regbtn').click(function () {
        if ($('#username').val() && $('#tel').val() && $('#password').val() && $('#phoneNum')) {
            // alert('注册成功');
            console.log($('.checkinput h4').attr('isok'));
            if ($('.checkinput h4').attr('isok')) {//所有验证都通过
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: {
                        name: 'reg',
                        username: $('#username').val(),
                        tel: $('#tel').val(),
                        password: $('#password').val()
                    },
                    dataType: 'json',
                    success: str => {
                        console.log(str);
                        if (str == 'yes') {
                            // alert('注册成功');

                        } else {
                            alert('注册失败');
                        }
                    }
                })
                alert('注册成功');
                location.href = 'login.html';
            }



        } else {
            $(this).attr('disable', 'flase').css('background', '#ccc').addClass('active');
            $('#tel').parent().find('h4').html('手机号不能为空').css('color', 'red');
            $('#password').parent().find('h4').html('密码不能为空').css('color', 'red');
            $('#phoneNum').parent().find('h4').html('手机验证码不能为空').css('color', 'red');
        }
    })

})();