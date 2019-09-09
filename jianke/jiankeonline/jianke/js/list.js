/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 11:02:14
 * @LastEditTime: 2019-09-06 11:02:14
 * @LastEditors: your name
 */
$(function () {
    $('.header').load('header.html');
    $('.search_nav').load('search_nav.html');
    $('#footer').load('footer.html');
    let num = 0;
    let timer_new = setInterval(() => {
        // console.log(num);
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
    function imgshift() {
        let n = 0;
        $('.nav_right_tel img').css('top', '-40px');
        $('.nav_right_tel img').eq(n).css('top', '0');
        let timer = setInterval(() => {
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
    let totalPage = 0;//总页数
    let page_pro = 16;//每个页面显示的商品条数
    let nowpage = 1;//当前页为第1页
    init({ nowpage: nowpage, name: 'init' });//初始化页面

    function init(obj) {
        let group = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: '../api/init.php',
                data: {
                    name: obj.name,
                    nowpage: page_pro * (nowpage - 1),
                    page_pro: page_pro,
                    max: obj.max,
                    min: obj.min
                },
                dataType: 'json',
                success: str => {
                    resolve(str);
                }
            })
        })
        group.then(data => {
            // console.log(str);
            // let data = JSON.parse(str);
            let html = '';
            html += data.map(function (item, index) {
                return `
                    <li data-id="pro_list_${item['pro_id']}">
                                <div class="imgbox"><a href="###">
                                        <img src="../img/listimgs/${item['pro_imgUrl']}.jpg" alt="">
                                    </a></div>
                                <div class="pro_inf">
                                    <span class="nowprice">￥${item['pro_nowprice']}.00</span>
                                    <s>￥${item['pro_oldprice']}</s>
                                    <p><em></em>${item['pro_name']}</p >
                                <div class="checkinf">
                                    <a href="###">查看详情</a>
                                </div>
                                </div >
                    </li >
                    `
            }).join('');
            $('.pro_con').html(html);
            getpages({ name: obj.name });
            toDetails();
            // visited();
        })
    }
    function toDetails() {
        $('.pro_con li').click(function () {
            let str = $(this).data('id');
            // console.log(str);
            let newId = getCookie('id');//存之前先获取
            if (newId) {//不能存在则存
                if (newId != str) {
                    setCookie('id', str);
                } else {
                    setCookie('id', '');
                }
            }
            else {
                // localStorage('id',str);
                setCookie('id', str);

            }


            location.href = 'details.html?' + str;


        })
    }
    visited();
    function visited() {//浏览过的商品足迹

        let CookieArr = [];
        let arr = getCookie('id');
        let arr2 = arr.split('_');
        let id = arr2[2];
        // alert(arr);
        console.log(id);
        let visited_pro = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: '../api/pro_data.php',
                data: {
                    id: id,
                },
                dataType: 'json',
                success: str => {
                    resolve(str)
                }
            })
        });
        // let html = '';
        let html1 = $('#VistedProducts').html();
        console.log(html1);
        visited_pro.then(data => {
            // let html = '';
            data.map(item => {
                html1 += `
                <li class="Visted_pro">
                            <a href="###"><img src="../img/listimgs/${item.pro_imgUrl}.jpg" alt=""></a>
                            <p>${item.pro_name}</p>
                            <span>￥${item.pro_nowprice}</span>
                        </li>
                `
            })
            $('#VistedProducts').html(html1);
        })
        // location.href = 'details.html?' + str;
    }

    function getpages(obj) {//页码
        // let name = obj.name;
        // console.log(obj);
        $.ajax({
            type: 'get',
            url: '../api/pro.php',
            data: {
                name: obj.name,
                max: obj.max,
                min: obj.min
            },
            success: str => {
                // console.log(str);
                totalPage = Math.ceil(str / page_pro);
                $('.pagetotalNum').html(totalPage);
                let html = '';
                for (let i = 0; i < totalPage; i++) {
                    html += ` <input type="button" value="${i + 1}">`
                }
                $('.pageNums').html(html);
                // pagelight();
                // prevtopage();
                // nexttopage();
                // topage({ name: obj.name });
                // console.log(nowpage);
                pageshift(obj.name);
            }
        })
    }
    function pageshift(name) {
        pagelight();
        prevtopage();
        nexttopage();
        function pagelight() {//按钮高亮
            // console.log(nowpage);
            $('.pageNums input').eq(nowpage - 1).addClass('active').siblings().removeClass('active');
        }
        $('.pageNums input').click(function () {
            // topage();
            nowpage = $(this).val() * 1;//等于当前的值
            // topage();
            pagelight();
            init({ nowpage: nowpage, name: name });
        });
        function prevtopage() {//上一页
            if (nowpage <= 1) {
                $('#prevpage').attr('disabled', 'true').css('color', '#ccc');
            } else {
                $('#prevpage').removeAttr('disabled').css('color', '#666');
            }
        }
        function nexttopage() {//下一页
            // console.log(totalPage);
            if (nowpage >= totalPage) {
                $('#nextpage').attr('disabled', 'true').css('color', '#ccc');
            } else {
                $('#nextpage').removeAttr('disabled').css('color', '#666');
            }
        }
        $('#prevpage').click(function () {
            nowpage--;
            console.log(nowpage);
            if (nowpage < 1) {
                nowpage = 1;
            }
            pagelight();
            init({ nowpage: nowpage, name: name });
        })
        $('#nextpage').click(function () {
            // console.log(1)
            nowpage++;
            if (nowpage > totalPage) {
                nowpage = totalPage;
            }
            pagelight();
            init({ nowpage: nowpage, name: name });
        })
        $('#getpage').bind("input propertychange", function () {
            if ($(this).val() >= totalPage) {
                $(this).val(totalPage);
            } else if ($(this).val() <= 1) {
                $(this).val(1);
            }
        })
        $('#getpageBtn').click(function () {
            console.log(1, $('#getpage').val());
            nowpage = $('#getpage').val();
            pagelight();
            init({ nowpage: nowpage, name: name });
        })
    }


    let minPrice = 0;
    let maxPrice = 0;
    $('#chaxun').click(function () {
        // console.log(1);
        let minPrice = $.trim($('#minPrice').val());
        let maxPrice = $.trim($('#maxPrice').val());
        init({
            max: maxPrice,
            min: minPrice,
            name: 'priceSearch',
            nowpage: nowpage
        });
        getpages({
            max: maxPrice,
            min: minPrice,
            name: 'priceSearch'
        })
    })


    $('#paixu').click(function () {//价格排序
        let sortname = $(this).val();

        if (sortname == '价格升序') {
            init({
                name: 'Upsort',
                nowpage: nowpage
            });
            getpages({
                name: 'Upsort'
            })
            $(this).val('价格降序');
        } else {
            init({
                name: 'Downsort',
                nowpage: nowpage
            });
            getpages({
                name: 'Downsort'
            })
            $(this).val('价格升序')
        }
    })
    proSort();
    function proSort() {//商品分类
        $('#man').click(function () {
            init({
                name: 'man_pro',
                nowpage: nowpage
            });
            getpages({
                name: 'man_pro'
            })
        })
        $('#woman').click(function () {
            init({
                name: 'woman_pro',
                nowpage: nowpage
            });
            getpages({
                name: 'woman_pro'
            })
        })
        $('#child').click(function () {
            init({
                name: 'child_pro',
                nowpage: nowpage
            });
            getpages({
                name: 'child_pro'
            })
        })
        $('#old').click(function () {
            init({
                name: 'old_pro',
                nowpage: nowpage
            });
            getpages({
                name: 'old_pro'
            })
        })
    }

});