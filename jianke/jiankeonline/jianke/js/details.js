/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 11:06:35
 * @LastEditTime: 2019-09-06 11:06:35
 * @LastEditors: your name
 */
$(function () {
    $('#contain .header').load('header.html');
    $('#contain .search_nav').load('search_nav.html');
    $('#contain #footer').load('footer.html');
    // carshow();
    $('#submit_btn').click(function () {
        location.href = 'shoppingCar.html';
    })
    let num = 0;
    let timer_new = null;
    timer_new = setInterval(() => {

        num++;
        if (num >= 10) {
            num = 0;
        }
        if (num % 2 == 0) {
            $('.nav_list_news').animate({ 'top': '-8px' }, 100);
        } else {
            $('.nav_list_news').animate({ 'top': '-5px' }, 100);
        }

    }, 200);
    $('.nav_left_list').hover(function () {
        $('.mc').css('display', 'block');

    }, function () {
        $('.mc').css('display', 'none');
    })

    $('.item').hover(function () {
        $(this).css('background', '#fff');
        // console.log($('.list-cont'));

        if ($(this).index() > 5) {
            $('.list-cont').eq($(this).index()).css({ 'display': 'block', 'top': '28px' });
        } else {
            $('.list-cont').eq($(this).index()).css('display', 'block');
        }
    }, function () {
        $(this).css('background', 'rgba(0, 0, 0, 0.692)');
        $('.list-cont').eq($(this).index()).css('display', 'none');
    })

    imgshift();
    function imgshift(name) {
        let n = 0;
        $('.nav_right_tel img').css('top', '-40px');
        $('.nav_right_tel img').eq(n).css('top', '0');
        let timer = null;
        timer = setInterval(() => {
            $('.nav_right_tel img').eq(n).animate({ 'top': '40px' }, 500);
            $('.nav_right_tel img').css('top', '-40px');
            n++;
            if (n > 2) {
                n = 0;
            }
            $('.nav_right_tel img').eq(n).animate({ 'top': '0px' }, 500);
            // console.log(1)
        }, 2000);
    }
    imgshift1();
    function imgshift1(name) {
        let n = 0;
        $('.jk_zx_img img').css('top', '-68px');
        $('.jk_zx_img img').eq(n).css('top', '25px');
        let timer = null;

        timer = setInterval(() => {
            $('.jk_zx_img img').eq(n).animate({ 'top': '68px' }, 500);
            $('.jk_zx_img img').css('top', '-68px');
            n++;
            if (n > 2) {
                n = 0;
            }
            $('.jk_zx_img img').eq(n).animate({ 'top': '25px' }, 500);
            // console.log(1)
        }, 2000);
    }
    $(window).scroll(function () {
        // console.log(1);
        if (scrollY >= 570) {
            $('.xiding_box').css('display', 'block');
            $('.to_top').css('display', 'block');
        } else {
            $('.xiding_box').css('display', 'none');
            $('.to_top').css('display', 'none');
        }

    })
    $('.to_top').mouseenter(function () {
        $(this).css('background', '#000 url(../img/detailsimgs/topreturn.png) 18px 21px no-repeat;')
    }).click(function () {
        $('body,html').stop().animate({ scrollTop: 0 }, 600);
        return false;
    })
    datashow();


    function datashow() {
        //数据渲染
        console.log(1);
        let url = location.href;
        let arr = url.split('?');
        console.log(arr[1]);
        let arr2 = arr[1].split('_');
        let pro_id = arr2[2];

        let listdata = new Promise(resolve => {
            $.ajax({
                type: 'post',
                url: '../api/pro_data.php',
                dataType: 'json',
                data: {
                    id: pro_id
                },
                success: str => {

                    // console.log(str);
                    resolve(str);

                }

            });
        });

        listdata.then(data => {
            let id = data[0].pro_id;
            console.log(id);
            let str = data[0].sort;
            let str1 = data[0].pro_bimgs;
            let bimgarr = str1.split(',');
            tabimg(str)
            let html1 = '';//拼接数据
            let html2 = '';//拼接数据
            data.map(function (item, index) {
                let str = item.pro_simgs;
                let str1 = item.pro_bimgs;
                // console.log(str1);
                let simgarr = str.split(',');//小图集合
                let bimgarr = str1.split(',');//大图集合

                html1 = `
                <div class="pro_cont_left fl">
                <div id="pro_imgbox_left">
                    <div id="pro_img">
                        <div class="pro_imgbox">
                            <div id="mask"></div>
                            <img src="../img/listimgs/${bimgarr[0]}.jpg" alt="">
                        </div>
                        <ul class="pro_small_imgs">
                            <li>
                                <img src="../img/listimgs/${simgarr[0]}.jpg" alt="">
                            </li>
                            <li>
                                <img src="../img/listimgs/${simgarr[1]}.jpg" alt="">
                            </li>
                            <li>
                                <img src="../img/listimgs/${simgarr[2]}.jpg" alt="">
                            </li>
                            <li>
                                <img src="../img/listimgs/${simgarr[3]}.jpg" alt="">
                            </li>
                            <li>
                                <img src="../img/listimgs/${simgarr[4]}.jpg" alt="">
                            </li>
                        </ul>
                        <div class="pro_imgbox_big">
                            <img src="../img/listimgs/${item.pro_imgUrl}.jpg" alt="">
                        </div>

                    </div>

                </div>
            </div>
            <div class="pro_cont_right fl">
                <div class="pro_cont_top">
                    <h1 class="pro_name">${item.pro_name}</h1>
                    <span class="pro_price">原价${item.pro_oldprice}，限特价${item.pro_nowprice}</span>
                    <a href="###" class="baiduimg"></a>
                </div>
                <div class="hd_by">
                    <a href="https://www.jianke.com/app/" target="_blank" class="youhui">【戳我下载APP 立省168元】</a>
                    <a href="https://www.jianke.com/help/honor.html" target="_blank" class="zhenpin">
                        <!-- 正品保证 -->
                    </a>
                </div>
                <div class="tongcheng">通用名称：<a href="###">${item.pro_name}</a></div>
                <div class="bianhao">产品编号：<a href="###"> A14202818497 </a></div>
                <div class="wenhao">批准文号：<a href="###">国药准字H20173089 </a><span> （国家食药总局查询） </span></div>
                <div class="jiage">价格：<a href="###" id='good_price'>￥${item.pro_nowprice}.00</a></div>
                <div class="youhuijuan">优惠券：<a href="###">满2499-200</a><a href="###">满599-45</a><a
                        href="###">满399-30</a><a href="###">满199-10</a>
                </div>
                <div class='cuxiao'>促销信息：<p>健客与您健康同行10周年！店庆活动，原价${item.pro_oldprice}，限特价${item.pro_nowprice}</p>
                </div>
                <div class="zenping">
                    <div class="zengsong">
                        <a href="###">赠品</a>
                        <p>买2赠以下商品，送完为止！</p>
                        <em></em>
                    </div>
                    <div class="zengsongimg">
                        <img src="../img/detailsimgs/zengsongimg.jpg" alt="">
                    </div>
                </div>
                <dl class="jianyidapei pro_list_xuanze clearfix">
                    <dt>建议搭配：</dt>
                    <dd>
                        <a href="###" class="active">一件体验装</a>
                        <a href="###">*阳痿早泄（搭必利劲）（必利劲+金戈）</a>
                        <a href="###">治疗阳痿早泄方案（金戈）</a>
                        <a href="###">治疗阳痿早泄方案（金戈+固本口服液）</a>
                        <a href="###">补肾坚挺装（金戈+引阳索）</a>
                        <a href="###">补精神气（金戈+西洋参皇室胶囊）</a>
                        <a href="###">9.9元加购（金戈25mg*3片 ）枸橼酸西地那非片咀嚼片</a>

                    </dd>
                </dl>
                <dl class="chanpinguige pro_list_xuanze clearfix">
                    <dt>产品规格：</dt>
                    <dd>
                        <a href="javascript:void(0)" class="active">25mg*3s</a>
                        <a href="javascript:void(0)">25mg*21s</a>
                        <a href="javascript:void(0)">25mg*21s*2盒（金戈42片装）</a>
                    </dd>
                </dl>
                <dl class="shengchanshangjia pro_list_xuanze clearfix">
                    <dt>生产商家</dt>
                    <dd>广州白云山医药集团股份有限公司白云山制药总厂 </dd>
                </dl>
                <dl class="xuanzenum pro_list_xuanze clearfix">
                    <dt>数&nbsp;&nbsp;量：</dt>
                    <dd>
                        <div class="numText">
                            <input type="text" id="numText" value="1">
                        </div>
                        <div class="changeNum">
                            <input type="button" id="addnum">
                            <input type="button" id="cutnum">
                        </div>
                        <div class="kucun">
                            库存： <span>${item.stock}</span>
                        </div>
                        <a href="https://www.jianke.com/help/delivery.html">运费详细>></a>

                    </dd>
                </dl>
                <div class="btn_box">

                    <input type="button" id="addcar">
                    <input type="button" id="online_zixun">
                    <div class="tellbg_img">
                        <input type="text" title="电话回拨完全免费，请你放心拨打">
                        <a href="###"></a>
                    </div>
                </div>
                <dl class="pro_tips pro_list_xuanze">
                    <dt>提&nbsp;&nbsp;示:</dt>
                    <dd>
                        本品为处方药，请凭处方笺购买。健客网上药店只对处方药提供信息展示，不提供交易
                    </dd>
                </dl>
                <dl class="dianhua pro_list_xuanze ">
                    <dt>&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                    <dd>（如需协助请拨打 <span>400-6480-111</span> </dd>
                </dl>
                <dl class="jiankang pro_list_xuanze">
                    <dt>健康承诺:</dt>
                    <dd>
                        <em style="background-position:-443px -86px; "></em>
                        <a href="">正品保证</a>
                    </dd>
                    <dd>
                        <em style="background-position:-462px -86px;"></em>
                        <a href="">货到付款 银行汇款/转账 在线支付</a>
                    </dd>
                </dl>
            </div>

                `;

                html2 = `
                <div class="xiding_cont clearfix">
            <div class="jianke_left clearfix">
                <span class="jk_picimg">
                    <img src="../img/listimgs/${item.pro_imgUrl}.jpg" alt="">
                </span>
                <div class="jk_txt">
                    <h4>${item.pro_name}</h4>
                    <b>￥${item.pro_nowprice}.00</b>
                </div>
            </div>
            <div class="jianke_right">
                <div class="call_box">
                    <input type="text" class="calltext">
                    <a href="###"></a>
                </div>
                <div class="add_cart">
                    <a href="###"></a>
                </div>
            </div>
            <div class="jk_zx_img">
                <img src="../img/detailsimgs/floatzx.png" alt="">
                <img src="../img/detailsimgs/floatzx.png" alt="">
                <img src="../img/detailsimgs/floatzx.png" alt="">
            </div>
        </div>
                `

            })
            $('.pro_con').html(html1);
            $('.xiding_box').html(html2);
            simgToBimg(bimgarr);
            Magnifier({//放大镜插件
                ele: 'pro_img'
            });
            commentShow(id);
            kunNumchange();
            addcar(id);
            let goodname = data[0].pro_name;
            topro(goodname);
            let oldid = getCookie(`addpro_id_${id}`);

            if (oldid == id) {
                carshow(oldid);
            }
        })
        function simgToBimg(bimgarr) {

            $('.pro_small_imgs li').hover(function () {
                // console.log(bimgarr);
                let index = $(this).index();
                $('.pro_imgbox img').attr('src', '../img/listimgs/' + bimgarr[index] + '.jpg');
                $('.pro_imgbox_big img').attr('src', '../img/listimgs/' + bimgarr[index] + '.jpg');
            })

        }

        function topro(goodname) {

            $('.this_price').html(goodname + '价格');
            $('.this_img').html(goodname + '图片');
        }

        function tabimg(str) {


            // console.log(likename);
            $.ajax({

                type: 'post',
                url: '../api/like_pro.php',
                data: {
                    str: str
                },
                dataType: 'json',
                success: str => {//渲染类似商品
                    // console.log(str);
                    let html3 = '';
                    str.map(function (item, index) {
                        html3 += `
                        <li class="pro_tab_item">
                        <img src="../img/listimgs/${item.pro_imgUrl}.jpg" alt="">
                        <p>${item.pro_name})</p>
                        <h3>￥${item.pro_nowprice}.00</h3>
                            </li>
                        `
                    });
                    $('.pro_imgList').html(html3);
                }
            })
        }

        function kunNumchange() {
            $('.changeNum #addnum').click(function () {
                // console.log(1);
                let num = $('#numText').val();
                num++;
                if (num >= $('.kucun span').html()) {
                    num = $('.kucun span').html();
                }
                $('#numText').val(num);
            })
            $('.changeNum #cutnum').click(function () {
                let num = $('#numText').val();
                num--;
                if (num <= 1) {
                    num = 1;
                }
                $('#numText').val(num);
            })
        }
    }
    tabShift();
    function tabShift() {//轮播图切换
        let num = 0;
        let iw = $('.pro_tab_item').width() + 26;//li宽度加外边距
        let i = -1;
        let max_left = -num * ($('.pro_imgList .pro_tab_item').length - 5);
        console.log(max_left);
        let timer = setInterval(function () {
            i++;
            let move_left = -iw * num;
            if (i > 9) {
                i = 0;
            }
            if (i >= 5) {
                num--;
            } else if (i < 5) {
                num++;
            }
            $('.pro_imgList').animate({
                left: move_left
            });

        }, 2000)

        // console.log(iw);
        function next() {
            num++;
            if (num >= $('.pro_imgList .pro_tab_item').length) {
                num = $('.pro_imgList .pro_tab_item').length;
                // $('.tab_btn .tab_prevbtn').css('display', 'none');
            }
            $('.pro_imgList').animate({
                left: -iw * num
            });
        }
        function prev() {
            num--;
            // if (num <= 0) {
            //     num = 0;
            // }
            // $('.pro_imgList').animate({
            //     left: iw * num
            // });
        }
        $('.tab_btn .tab_prevbtn').click(function () {
            // console.log($('.pro_imgList .pro_tab_item').length);

            next();
        });
        $('.tab_btn .tab_nextbtn').click(function () {
            prev();
        })
    }
    function addcar(id) {
        //加入购物车
        $('#addcar').click(function () {
            console.log(id);
            if (getCookie('username')) {
                let shoppadd = new Promise(resolve => {
                    $.ajax({
                        type: 'get',
                        url: '../api/shoppingCar.php',
                        data: {
                            sqlname: 'addCar',
                            username: getCookie('username'),
                            shoppro_num: $('#numText').val(),
                            shoppro_id: id
                        },
                        success: str => {
                            if (str == 'yes') {
                                location.href = 'shoppingCar.html';
                            }
                        }
                    })

                })
                let pro_name = $('.pro_name').html();//商品名称
                let pro_img = $('.pro_imgbox img').attr('src');//图片路径
                let num = $('#numText').val();//商品数量

                let str = $('#good_price').html();
                let pro_price = str.slice(1);//商品价格
                console.log(pro_name);
                getname();
                getimg();
                getnum(num);
                getPrice();
                function getname() {
                    setCookie(`pro_name_${id}`, pro_name, 3);//设置Cookie
                }
                function getimg() {
                    setCookie(`pro_img_${id}`, pro_img, 3);
                }
                function getnum(num) {
                    if (getCookie(`pro_num_${id}`)) {
                        let num1 = getCookie(`pro_num_${id}`) - 0;
                        num1 += num - 0;
                        setCookie(`pro_num_${id}`, num1, 3);
                    } else {
                        setCookie(`pro_num_${id}`, num, 3);
                    }
                }
                function getPrice() {
                    setCookie(`pro_price_${id}`, pro_price, 3);
                }
                carshow(id);
            } else {
                alert('请先登录，登录之后才能加入购物车');
            }

        })

    }

    function carshow(id) {
        var idarr = [];//设置一个空id数组
        idarr.push(id);//将idpush进数组
        console.log(idarr);
        setCookie(`addpro_id_${id}`, id);
        setCookie('idarr', idarr);
        // console.log(id);
        let pro_name = getCookie(`pro_name_${id}`);
        let pro_num = getCookie(`pro_num_${id}`);
        let pro_img = getCookie(`pro_img_${id}`);
        let price = getCookie(`pro_price_${id}`);

        $('.nums').html(pro_num);
        let pro_price = pro_num * price;
        // let html = $('.details_pro').html();
        let html1 = '';
        if (pro_name && pro_num && pro_img && pro_price) {

            html1 += `
            <li class= "add_pro clearfix" >
                <div class="pro_img fl">
                    <img src="${pro_img}" alt="">
                        <p>${pro_name}</p>
                </div>
                <div class="pro_inf fr">
                    <span class="pro_num">${pro_num}</span>
                    <span class="price">￥${pro_price}</span>
                    <a href="###" class="remove_pro">x</a>
                </div>
            </li>  
        `
        } else {
            html1 = '';
            $('.nums').html(0);
            $('#abox-carttoal').html(0);
        }
        $('#abox-carttoal').html(pro_num);
        $('.details_pro').html(html1);
        $('.price_pro').html(pro_price);
        $('.check_pro_num').html(pro_num);
        remove_pro(id);
        function remove_pro(id) {
            $('.add_pro .pro_inf').find($('.remove_pro')).click(function () {
                let index = $(this).index();
                // $('.add_pro').remove();
                removeCookie(`pro_name_${id}`);
                removeCookie(`pro_img_${id}`);
                removeCookie(`pro_num_${id}`);
                removeCookie(`pro_price_${id}`);

                carshow(id);
            })
        }
    }
    comment();
    function comment() {//商品评论
        $('.comment_text').bind("input propertychange", function () {
            if ($(this).val().length >= 40) {
                $('.tips').css('display', 'block').html('你输入的字数超出范围');
            } else {
                $('.tips').css('display', 'none');
            }
        })
        $('.comment_btn').click(function () {
            let text = $.trim($('.comment_text').val());
            $('.comment_text').val('');
            if (text) {
                let username = getCookie('username');
                // console.log(username);
                if (username == '' || username == null) {
                    $('.tips').css('display', 'block').html('登陆之后才能发表评论');
                } else {
                    let idstr = getCookie('id');//获取id
                    let id = idstr.slice(9);
                    // console.log(id);
                    let date = new Date();//获取当前系统时间
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let str = year + '/' + month + '/' + day;//拼接年月日
                    $.ajax({
                        type: 'post',
                        url: '../api/comment.php',
                        data: {
                            goodid: id,
                            username: username,
                            comment: text,
                            time: str
                        },
                        success: str => {
                            // console.log(str);
                            if (str == 'yes') {
                                commentShow(id);
                                $('.tips').css({ 'display': 'block', 'color': 'green' }).html('评论成功！');
                            } else {
                                $('.tips').css('display', 'block').html('评论失败！');
                            }
                        }
                    })

                }
            } else {
                $('.tips').css('display', 'block').html('请输入评论内容');
            }
        })
    }

    function commentShow(goodid) {//商品评论渲染
        $.ajax({
            type: 'post',
            url: '../api/commentShow.php',
            data: {
                goodid: goodid
            },
            dataType: 'json',
            success: str => {
                // let html1 = $('.comment_cont').html();
                let html = '';
                html += str.map(function (item) {
                    return `
                     <li class="pro_comment clearfix">
                        <span class="comment_name fl">${item.username}说:</span>
                        <p class="comment_res fl">${item.comment}</p>
                        <span class="comment_time fr">评论时间：<span class="time">${item.time}</span></span>
                    </li>
                    `
                }).join('');

                $('.comment_cont').html(html);
            }
        })

    }
})