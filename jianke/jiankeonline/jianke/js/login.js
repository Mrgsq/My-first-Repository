/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:59:09
 * @LastEditTime: 2019-09-06 11:13:53
 * @LastEditors: Please set LastEditors
 */
(function () {
    $(document).ready(function () {
        $('#tel').val('');
        $('#imgCode').val('');
        $('#phoneCode').val('');
    })
    $('.tab_login .tab_login_item').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.login_main_cont').eq($(this).index()).css('display', 'block').siblings().css('display', 'none').parent().find('.tab_login').css('display', 'block');
    })

    let imgCodeArr = ['reg1', 'reg2', 'reg3', 'reg4', 'reg5', 'reg6', 'reg7', 'reg8'];
    let Codearr = ['nnwn', 'n6b4', 'nm3n', 'bmn3', '6g4y', 'n4gc', 'bwm3', 'n5m6'];
    $('#regbtn').click(function () {

        location.href = 'register.html';
    })




    $('#tel').blur(function () {
        let telephone = $(this).val();
        let phoneReg = /^1[3456789]\d{9}$/;
        if (telephone) {
            if (phoneReg.test(telephone)) {
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: {
                        name: 'checkusername',
                        tel: telephone
                    },
                    success: str => {
                        console.log(str);
                        if (str == 'yes') {
                            $(this).next().css(
                                // 'display', 'block'
                                { 'display': 'inline-block', 'color': 'green' }
                            ).attr('isok', true).html('手机号码验证通过');
                        } else {
                            $(this).next().css(
                                // 'display', 'block'
                                { 'display': 'inline-block', 'color': 'red' }
                            ).attr('isok', false).html('手机号码未注册');
                        }
                    }
                })

            } else {
                $(this).next().css(
                    // 'display', 'block'
                    { 'display': 'inline-block', 'color': 'red' }
                ).attr('isok', false).html('手机号码不符合');
            }
        }
        else {
            $(this).next().css(
                { 'display': 'inline-block', 'color': 'red' }
            ).attr('isok', false);

        }
    })
    $("#tel").bind("input propertychange", function () {
        if ($(this).val()) {
            $('.loginbtn').css('background', '#ccc');
        }
    })

    let num = 0;
    $('.imgCode_box').click(function () {
        let num = parseInt(Math.random() * 8);
        $(this).children().attr('src', `../img/loginimgs/${imgCodeArr[num]}.jpg`);
    })
    $('#imgCode').blur(function () {

        let CodeNum = $(this).val();
        if (CodeNum) {
            console.log(CodeNum);
            if (CodeNum == Codearr[num]) {
                $(this).parent().parent().next().css(
                    // 'display', 'block'
                    { 'display': 'inline-block', 'color': 'green' }
                ).attr('isok', true).html('验证码通过');
            }
        } else {
            $(this).parent().parent().next().css(
                // 'display', 'block'
                { 'display': 'inline-block', 'color': 'red' }
            ).attr('isok', false);
        }
    })
    let phoneCode = null;
    $('.phoneCodebtn').click(function () {

        if ($('#tel').val()) {
            let num = 60;
            let timer = setInterval(() => {
                num--;
                if (num < 1) {
                    $('.phoneCodebtn').val('获取验证码')
                    clearInterval(timer);
                    $('.phoneCodebtn').attr('disabled', 'false');
                }
                else {
                    $('.phoneCodebtn').val(num + 's后重新获取')
                    $('.phoneCodebtn').attr('disabled', 'true');
                }

            }, 1000);
            getPhoneCode();
            function getPhoneCode() {
                $.ajax({
                    type: 'post',
                    url: '../api/duanxin.php',
                    data: {
                        userphone: $('#tel').val()
                    },
                    success: str => {
                        let data = JSON.parse(str);
                        console.log(data);
                        console.log(data['phonecode']);
                        phoneCode = data['phonecode'];
                    }
                })
            }

        } else {
            $('#tel').next().css({ 'display': 'block', 'color': 'red' });
        }
    })
    $('#phoneCode').blur(function () {
        let nowCode = $(this).val();
        if (phoneCode) {
            if (nowCode == phoneCode) {
                $('#phoneCode').parent().next().css({
                    'display': 'inline-block', 'color': 'green'
                }).attr('isok', true).html('短信验证码正确');
            } else {
                $('#phoneCode').parent().next().css({
                    'display': 'inline-block', 'color': 'red'
                }).attr('isok', false).html('短信验证码错误');
            }
        } else {
            $('#phoneCode').parent().next().css({
                'display': 'inline-block', 'color': 'red'
            }).attr('isok', false).html('点击发送验证码');
        }

    })

    $('.loginbtn').click(function () {
        let url = getCookie('url');//获取上一页Cookie地址
        // console.log($('.form_item .form_messge').attr('isok'));
        if ($('#tel').val() && $('#phoneCode').val() && $('#imgCode').val()) {
            if ($('.form_item .form_messge').attr('isok')) {//所有控件验证为真才允许跳转

                $.ajax({
                    type: 'get',
                    url: '../api/reg.php',
                    data: {
                        name: 'getUsername',
                        tel: $('#tel').val()
                    },
                    dataType: 'json',
                    success: str => {
                        console.log(str);
                        let username = str[0].username;
                        setCookie('username', username, 1);//获取上一个网页的网址
                        if (url) {
                            location.href = url;//跳转到上一个网页
                        } else {
                            location.href = 'index.html';
                        }
                    }
                })


            }
        } else {
            if ($('#tel').val()) {
                if ($('#phoneCode').val()) {
                    $('#imgCode').parent().parent().next().css({
                        'display': 'inline-block',
                        'color': 'red'
                    })
                } else {
                    $('#phoneCode').parent().next().css({
                        'display': 'inline-block',
                        'color': 'red'
                    })
                }

            } else {
                $('#tel').next().css({
                    'display': 'inline-block',
                    'color': 'red'
                });
            }


            $(this).css('backgroud', '#ccc');
        }
    })
    // console.log($(this));

})();