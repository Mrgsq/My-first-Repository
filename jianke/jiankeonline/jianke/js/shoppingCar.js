/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 11:07:53
 * @LastEditTime: 2019-09-06 11:07:53
 * @LastEditors: your name
 */
$(function () {
    linkFile();
    loginShow();
    // numChange();
    shopproShow();
    function linkFile() {
        $('.header').load('header.html');
        $('#footer').load('footer.html');
    }

    function loginShow() {
        let str = getCookie('username');
        if (str) {
            $('.my_cart_log').css('display', 'none');
        } else {
            $('my_cart_log').css('display', 'block');
            $('#login').click(function () {
                let url = location.href;
                setCookie('url', url);//储存当前页面路径
                location.href = 'login.html';
                console.log(url);
            })
        }
    }
    function shopproShow() {
        let username = getCookie('username');
        if (username) {
            let pro_show = new Promise(resolve => {
                $.ajax({
                    type: 'post',
                    url: '../api/shoppingCar.php',
                    data: {
                        sqlname: 'getCar',
                        username: username
                    },
                    dataType: 'json',
                    success: str => {
                        // console.log(str);
                        // let id = str[0].id;
                        // let num = str[0].shoppro_num;
                        resolve(str);
                    }
                })
            });
            pro_show.then(data => {
                // console.log(data);
                let html = '';
                for (var i = 0; i < data.length; i++) {
                    let id = data[i].shoppro_id;
                    let num = data[i].shoppro_num;
                    $.ajax({
                        type: 'post',
                        url: '../api/pro_data.php',
                        data: {
                            id: id
                        },
                        dataType: 'json',
                        success: str => {
                            str.map(item => {
                                let stock = item.stock;//该商品库存
                                html += `
                            <li class="shop_pro" data-id='${item.pro_id}'>
                                    <dl class="product_class">
                                        <dd>
                                            <input type="checkbox" name="" id="" class='pro_checkbox'>
                                            <a href="###" class="imgbox">
                                                <img src="../img/listimgs/${item.pro_imgUrl}.jpg" alt="">
                                            </a>
                                            <div class="products_name clearfix">
                                                <p class="shop_name fl">${item.pro_name}</p>
                                                <p class="shop_spec fr">
                                                <em>规格：</em>
                                                <span title="50mg*10s">50mg*10s</span>
                                                </p>

                                        </div>
                                        <div class="price_info">
                                            <p class="pro_price">${item.pro_nowprice}.00</p>
                                        </div>
                                        <div class="shop_nums">
                                            <a href="###" class="reduce">-</a>
                                            <input type="text" value="${num}" class="shop_pro_nums" data-stock='${item.stock}'>
                                            <a href="###" class="increase">+</a>
                                        </div>
                                        <div class="xiaoji">${item.pro_nowprice * num}.00</div>
                                        <div class="del">
                                            删除
                                        </div>
                                        </dd>
                                    </dl>
                                    </li>
                                 `
                                $('.orderbox').html(html);

                                // checktoAll();
                            })
                        }
                    })

                }

            })
        } else {
            alert('请先登录账号！')
        }
    }
    numChange();//改变商品数量
    remove();//删除商品
    allcheck();//全选
    let timer = setTimeout(() => {
        checktoAll();

    }, 2500);


    function numChange() {
        $('.orderbox').bind('click', $('.shop_nums'), function (eve) {

            let target = $(eve.target);
            console.log(target);
            let stock = target.parent().find($('.shop_pro_nums')).data('stock');//获取该商品库存
            let num = target.parent().find($('.shop_pro_nums')).val();//获取文本框的值
            let id = target.parent().parent().parent().parent().data('id');
            // console.log(id);
            let good_price = target.parent().parent().find($('.pro_price')).html();
            let xiaoji = target.parent().parent().find($('.xiaoji'));
            if (target.attr('class') == 'increase') {

                // console.log(stock);
                num++;
                if (num > stock) {//临界值不能大于库存数量
                    num = stock;
                    alert('超出库存');
                }

            } else if (target.attr('class') == 'reduce') {
                num--;
                if (num < 1) {
                    num = 1;//临界值 最小为1
                    alert('不能少于一件');
                }

            }
            // target.parent().find($('.shop_pro_nums')).val(num);
            $.ajax({
                type: 'post',
                url: '../api/shoppingCar.php',
                data: {
                    sqlname: 'setNum',
                    num: num,
                    shoppro_id: id
                },
                success: str => {
                    // console.log(str);
                    // shopproShow();
                }
            })
            let xiaoji_price = num * good_price;
            target.parent().find($('.shop_pro_nums')).val(num);
            target.parent().parent().find($('.xiaoji')).html(xiaoji_price + '.00');
            priceAndnum();
        })
    }

    function remove() {//删除商品
        $('.orderbox').bind('click', $('.shop_pro'), function (eve) {
            let target = $(eve.target);
            // console.log(target);
            let id = target.parent().parent().parent().data('id');
            // console.log(id);
            if (target.attr('class') == 'del') {
                if (confirm('你确定要删除这件商品码？')) {

                    target.parent().parent().parent().remove();
                    $.ajax({
                        type: 'get',
                        url: '../api/shoppingCar.php',
                        data: {
                            sqlname: 'remove_pro',
                            shoppro_id: id
                        },
                        success: str => {
                            if (str == 'yes') {
                                alert('删除成功');
                                shopproShow();
                            } else {
                                alert('删除失败');
                            }
                        }
                    })
                }
            }
        })
    }

    function allcheck() {//全选选中所有
        $('#check_pro').click(function () {

            let checkStatus = $(this).prop('checked');//全选的状态
            $('.shopCont input:checkbox').prop('checked', checkStatus);//全部选中
            priceAndnum();
        })
        $('#checkall').click(function () {

            let checkStatus = $(this).prop('checked');//全选的状态
            $('.shopCont input:checkbox').prop('checked', checkStatus);//全部选中 
            priceAndnum();
        })
        $('#jk_check').click(function () {

            let checkStatus = $(this).prop('checked');//全选的状态
            $('.shopCont input:checkbox').prop('checked', checkStatus);//全部选中  
            priceAndnum();
        })



    }

    function checktoAll() {//选中所有全选也选中

        $('.orderbox .pro_checkbox').click(function () {
            priceAndnum();
            let inputLenth = $('.orderbox .pro_checkbox').length;
            let checkLenth = $('.orderbox .pro_checkbox:checked').length;
            console.log(inputLenth, checkLenth);
            if (inputLenth == checkLenth) {
                $('#jk_check').prop('checked', true);
                $('#check_pro').prop('checked', true);
                $('#checkall').prop('checked', true);
            } else {
                $('#checkall').prop('checked', false);
                $('#jk_check').prop('checked', false);
                $('#check_pro').prop('checked', false);
            }
            // if (checkLenth >= 1 && checkLenth <= inputLenth) {
            //     $('#submit').css('background', '#e4393c');
            // } else {
            //     $('#submit').css('background', '#ccc');
            // }

        })
        // if (inputLenth != 0 && checkLenth != 0) {

        // }

    }

    function priceAndnum() {
        let num = 0;
        let price = 0;
        // let id = '';
        // $('.orderbox .pro_checkbox').click(function () {
        if ($('.orderbox .pro_checkbox:checked').length >= 1) {
            $('#submit').css('background', '#e4393c');
            $('.orderbox .pro_checkbox:checked').each(function (index, item) {
                // id = $(this).parent().parent().parent().data('id');
                let item1 = $(item);
                // if (item1 = null) {
                // console.log(item1.parent());
                num += item1.parent().find($('.shop_pro_nums')).val() - 0;
                price += item1.parent().find($('.xiaoji')).html() - 0;
                $('.all_num').html(num);
                $('.total_price').html(price + '.00');
                // } else {
                //     $('.all_num').html(0);
                //     $('.total_price').html(0 + '.00');
                // }


            })
        } else {
            $('.all_num').html(num);
            $('.total_price').html(price + '.00');
            $('#submit').css('background', '#ccc');
        }


    }
    $('.delcheck').click(function () {
        if (confirm('你确定删除这些商品吗？')) {
            remove_group();
            shopproShow();
            priceAndnum();
            alert('删除成功');
        }


    })
    function remove_group() {
        let id = '';
        $('.orderbox .pro_checkbox:checked').each(function (index, item) {
            id = $(this).parent().parent().parent().data('id');
            let remove_group = new Promise(resolve => {
                $.ajax({
                    type: 'get',
                    url: '../api/shoppingCar.php',
                    data: {
                        sqlname: 'remove_pro',
                        shoppro_id: id
                    },
                    success: str => {
                        resolve(str);
                    }
                })
            });
            remove_group.then(str => {
                if (str == 'yes') {
                    priceAndnum();
                } else {

                }
            })
        })
    }
})