/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 15:22:13
 * @LastEditTime: 2019-09-06 11:20:13
 * @LastEditors: Please set LastEditors
 */
(function () {
    let username = getCookie('admin');
    $('.welcome').html(`
    <a href="###">
                    <i>
                        <img src="../img/touxiang.png" alt="">
                    </i>
                    欢迎你，${username}
                    <i>
                        <img src="../img/xiajiantou.png" alt="" style="margin-left: 5px;">
                    </i></a>
    `);

    $('.menu li').mouseover(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.menu li').mouseleave(function () {
            $(this).removeClass('active');
        });
    });
    $('.menu li').eq(0).click(function () {
        // console.log($this);
        $('#contpage iframe').attr('src', '../../moban/index2.html');
    });
    let isok = true;
    let count = 0;
    console.log($('.submenu a').eq(1));
    $('.submenu a').click(function () {
        $(this).next().slideToggle(500);

    });
    $('.submenu ul').children().mousemove(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.submenu ul').children().mouseleave(function () {
        $(this).removeClass('active');
    });

    $('#tbody tr').on('click', $(this).children(), function () {
        $(this).attr('contenteditable', true);
    });
    $('.menu .addnew').click(function () {
        $('#contpage iframe').attr('src', '../html/addnew.html');

    })
    $('.content_header span').click(function () {
        $('#contpage iframe').attr('src', '../html/user.html');
    })
    $('.menu .updatapsw').click(function () {
        $('#contpage iframe').attr('src', '../html/updatapsw.html');
    })
    $('.menu .userinf').click(function () {
        $('#contpage iframe').attr('src', '../html/user.html');
    })
    $('.menu .pro_list').click(function () {
        $('#contpage iframe').attr('src', '../html/pro_list.html');
    })
    $('.menu .user_shoplist').click(function () {
        console.log($(this));
        $('#contpage iframe').attr('src', '../html/goodmanage.html');
    })
})();