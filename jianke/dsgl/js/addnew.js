/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:53:40
 * @LastEditTime: 2019-09-06 10:53:40
 * @LastEditors: your name
 */
(function () {
    clear();
    allcheck();
    function allcheck() {
        $('#name').blur(function () {
            let usereg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/;
            let name = $(this).val();
            if (name) {
                if (usereg.test(name)) {
                    $.ajax({
                        type: 'post',
                        url: '../api/userinf.php',
                        data: {
                            sqlname: 'checkUsername',//检验用户名是否存在
                            username: name
                        },
                        success: str => {
                            if (str == 'yes') {
                                $('.res:first').html('用户名已存在').attr('isok', false).css('color', 'red');
                            } else {
                                $('.res:first').html('用户名可以使用').attr('isok', true).css('color', '#58bc58');
                            }
                        }
                    })
                } else {
                    $('.res:first').html('用户名不符合').attr('isok', false).css('color', 'red');
                }
            } else {
                $('.res:first').html('请填写用户名').attr('isok', false).css('color', 'red');
            }

        })
        $('#password').blur(function () {
            let pswreg = /^[a-zA-Z]\w{5,17}$/;
            let psw = $(this).val();
            if (psw) {
                if (pswreg.test(psw)) {
                    $('.res').eq(1).html('密码验证通过').attr('isok', true).css('color', '#58bc58');
                } else {
                    $('.res').eq(1).html('密码不符合').attr('isok', false).css('color', 'red');
                }
            } else {
                $('.res').eq(1).html('请填写密码').attr('isok', false).css('color', 'red');
            }

        })
        $('#phonenum').blur(function () {
            let phonereg = /^1(3|4|5|7|8)\d{9}$/;
            let phonenum = $(this).val();
            if (phonenum) {
                if (phonereg.test(phonenum)) {

                    $.ajax({
                        type: 'post',
                        url: '../api/userinf.php',
                        data: {
                            sqlname: 'checkPhone',
                            phonenum: phonenum
                        },
                        success: str => {
                            if (str == 'yes') {
                                $('.res').eq(2).html('此电话号码存在').attr('isok', true).css('color', 'red');
                            } else {
                                $('.res').eq(2).html('电话号码可以使用').attr('isok', false).css('color', '#58bc58');
                            }
                        }
                    })
                } else {
                    $('.res').eq(2).html('电话号码不符合').attr('isok', false).css('color', 'red');
                }
            } else {
                $('.res').eq(2).html('请填写电话号码').attr('isok', false).css('color', 'red');
            }

        })
    }

    $('#addbtn').click(function () {
        console.log($('#name').val(), $('#password').val(), $('#email').val());
        allcheck();
        if ($('.res').attr('isok')) {
            $.ajax({
                type: 'post',
                url: '../api/userinf.php',
                data: {
                    username: $('#name').val(),
                    password: $('#password').val(),
                    phonenum: $('#phonenum').val(),
                    sqlname: 'insertUser'
                },
                success: str => {
                    if (str == 'yes') {
                        alert('添加成功');
                        clear();
                    } else {
                        alert('添加失败');
                    }
                }
            })
        }

    });
    function clear() {
        $('#name').val('');
        $('#password').val('');
        $('#phonenum').val('');
    }
})();