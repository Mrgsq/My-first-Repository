/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:49:26
 * @LastEditTime: 2019-09-06 10:49:26
 * @LastEditors: your name
 */
$(function () {
    let ipage = 1;//初始页为第一页
    let pagetotal = 5;//每页显示条数
    let total = 0;//初始化总页数为0页
    init();

    function init() {//初始化渲染数据
        let showdata = new Promise(resolve => {
            $.ajax({
                type: 'post',
                url: '../api/shopmanage.php',
                data: {
                    sqlname: 'getlist',
                    ipage: (ipage - 1) * pagetotal,
                    pagetotal: pagetotal
                },
                dataType: 'json',
                success: str => {
                    resolve(str);

                }
            })
        })
        showdata.then(data => {
            // console.log(data);
            let shoppro_id = [];//商品id
            let shoppro_num = [];//商品数量
            let username = [];//用户名
            let order_id = [];//订单id
            data.map(item => {
                shoppro_id.push(item.shoppro_id);
                shoppro_num.push(item.shoppro_num);
                username.push(item.username);
                order_id.push(item.order_id);
            })
            let html = '';
            for (let i = 0; i < shoppro_id.length; i++) {
                $.ajax({
                    type: 'post',
                    url: '../api/shopmanage.php',
                    dataType: 'json',
                    data: {
                        sqlname: 'getshop_inf',
                        pro_id: shoppro_id[i]
                    },
                    success: str => {
                        // console.log(str);
                        html += `
                                <tr class="shop_li">
                                    <td class="shop_item check_box"><input type="checkbox" class='checkbox' data-id=${order_id[i]}></td>
                                        <td class="shop_item shop_id">${str[0].pro_id}</td>
                                        <td class="shop_item shop_name">${str[0].pro_name}</td>
                                        <td class="shop_item shop_price">￥${str[0].pro_nowprice}</td>
                                        <td class="shop_item shop_num">${shoppro_num[i]}</td>
                                        <td class="shop_item shop_user">${username[i]}</td>
                                        <td class="shop_item oprate">
                                            <input type="button" class="editbtn" value="编辑">
                                            <input type="button" class="savebtn" value="保存">
                                            <input type="button" class="delbtn" value="删除">
                                        </td>
                                    </tr>
                            `
                        $('#tbody').html(html);
                        allcheck();//全选
                        change();//修改保存
                    }
                })
            }
        })
    }
    pageshow();
    pageshift();
    let delarr = [];
    function pageshow() {//渲染按钮个数
        let getpage = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: '../api/shopmanage.php',
                data: {
                    sqlname: 'getpage'
                },
                success: str => {
                    resolve(str);
                }
            })
        })
        getpage.then(str => {
            let html = '';
            total = Math.ceil(str / pagetotal);
            for (let i = 0; i < total; i++) {
                html += `
                        <input type="button" value="${i + 1}">
                        `
            }
            $('.pages').html(html);
            $('.pages input').eq(0).addClass('active');

            pagelight();
        })
    }

    function pageshift() {
        $('.pages').on('click', 'input', function () {
            ipage = $(this).val();
            $(this).addClass('active').siblings().removeClass('active');
            init();
            pagelight();
            pagenumlight();
        })
        $('.pagebtn').on('click', '#prevbtn', function () {
            ipage--;
            if (ipage <= 1) {
                ipage = 1;
            }
            init();
            pagelight();
            pagenumlight();
        })
        $('.pagebtn').on('click', '#nextbtn', function () {
            // console.log(1);
            ipage++;
            if (ipage >= total) {
                ipage = total;
            }
            // console.log(ipage);
            init();
            pagelight();
            pagenumlight();
            // console.log(ipage, total);
        })
    }
    function pagelight() {
        if (ipage <= 1) {
            $('#prevbtn').attr('disabled', true).css('background', '#bbb');
        } else {
            $('#prevbtn').attr('disabled', false).css('background', '#ddd');
        }
        if (ipage >= total) {
            $('#nextbtn').attr('disabled', true).css('background', '#bbb');
        } else {
            $('#nextbtn').attr('disabled', false).css('background', '#ddd');
        }
        // console.log(ipage, total);
    }
    function pagenumlight() {
        $('.pages input').eq(ipage - 1).addClass('active').siblings().removeClass('active');
    }
    function allcheck() {
        $('.allcheckbox').on('click', '#allcheck', function () {
            let statu = $(this).prop('checked');
            $('#tbody .checkbox').prop('checked', statu);
        })

        $('#tbody').on('click', '.checkbox', function () {
            let num1 = 0;
            let num2 = $('#tbody .checkbox').length;
            $('#tbody .checkbox:checked').each(function (index, item) {
                num1++;
                // console.log(num2);
                if (num1 == num2) {
                    $('#allcheck').prop('checked', true);
                } else {
                    $('#allcheck').prop('checked', false);
                }
            })
        })
    }
    del();
    function del() {
        $('#del').click(function () {

            $('#tbody .checkbox:checked').each(function (index, item) {
                let id = $(item).data('id');//id
                delarr.push(id - 0);
            })
            delarr = [...new Set(delarr)];//数组去重

            if (confirm('你确定要删除这些商品吗？')) {
                let delgroup = new Promise(resolve => {
                    for (let i = 0; i < delarr.length; i++) {
                        $.ajax({
                            type: 'post',
                            url: '../api/shopmanage.php',
                            data: {
                                sqlname: 'delshop',
                                order_id: delarr[i]
                            },
                            success: str => {
                                resolve(str);
                            }
                        })
                    }
                })
                delgroup.then(str => {
                    if (str == 'yes') {
                        alert('删除成功');
                        init();
                        pageshow()
                    }
                })
            }
        })
    }

    function change() {
        // $('.editbtn').click(function () {
        //     console.log(1);
        // })
        $('.oprate').on('click', '.editbtn', function () {
            alert('你现在可以修改该商品的数量啦！')
            $(this).parent().parent().find('.shop_num').attr('contenteditable', 'true').focus();
            $('.oprate').on('click', '.savebtn', function () {
                let order_id = $(this).parent().parent().find('.check_box').children().data('id');
                console.log(order_id);
                let shop_num = $(this).parent().parent().find('.shop_num').html();
                console.log(shop_num);
                alert('保存成功');
                $.ajax({
                    type: 'post',
                    url: '../api/shopmanage.php',
                    data: {
                        sqlname: 'saveinf',
                        order_id: order_id,
                        shop_num: parseInt(shop_num)
                    },
                    success: str => {
                        console.log(str);
                    }
                })
            })
        })
        $('.oprate').on('click', '.delbtn', function () {
            let order_id = $(this).parent().parent().find('.check_box').children().data('id');
            console.log(order_id);
            if (confirm('你确定删除这条数据？')) {
                $.ajax({
                    type: 'post',
                    url: '../api/shopmanage.php',
                    data: {
                        order_id: order_id,
                        sqlname: 'delshop'
                    },
                    success: str => {

                        console.log(str);
                        if (str == 'yes') {
                            alert('删除成功');
                            init();
                        } else {
                            alert('删除失败');
                        }
                    }
                })

            }
        })
    }

})