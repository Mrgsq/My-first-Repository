/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:51:37
 * @LastEditTime: 2019-09-06 10:51:37
 * @LastEditors: your name
 */
$(function () {
    let ipage = 1;//初始页为第一页
    let pagetotal = 15;//每页显示条数为15条
    let total = 0;//总页数为0;
    let delarr = [];//准备一个空数组 存放删除的元素
    init();
    getpage();
    function init() {
        let showlist = new Promise(resolve => {
            $.ajax({
                type: 'post',
                url: '../api/pro_list.php',
                data: {
                    ipage: (ipage - 1) * pagetotal,
                    pagetotal: pagetotal,
                    sqlname: 'getlist'
                },
                dataType: 'json',
                success: str => {
                    resolve(str);
                }
            })
        });
        showlist.then(data => {
            let html = '';
            html += data.map(function (item) {
                return `
                <tr class="pro_li">
                    <td class="pro_item check_box"><input type="checkbox"></td>
                    <td class="pro_item userid">${item.pro_id}</td>
                    <td class="pro_item pro_name">${item.pro_name}</td>
                    <td class="pro_item pro_oldprice">￥${item.pro_oldprice}</td>
                    <td class="pro_item pro_nowprice">￥${item.pro_nowprice}</td>
                    <td class="pro_item pro_sort">${item.sort}</td>
                    <td class="pro_item pro_stock">${item.stock}件</td>
                    <td class="pro_item pro_imgUrl">${item.pro_imgUrl}</td>
                </tr>
                `
            })
            $('.pro_con').html(html);
            allcheck();
        })
    }
    function getpage() {//获取页码
        let pageshow = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: "../api/pro_list.php",
                data: {
                    sqlname: 'getpage'
                },
                success: str => {
                    resolve(str);
                }
            })
        })
        pageshow.then(data => {
            let html = '';
            total = data / pagetotal;
            for (let i = 0; i < total; i++) {
                html += `
                <input type="button" value="${i + 1}"> 
                `
            }
            $('.page').html(html);
            $('.page').children().eq(0).addClass('active');//第一个按钮高亮
            pageshift();
            pagelight();
        })
    }

    function pageshift() {//页面切换
        $('.page').on('click', 'input', function () {
            ipage = $(this).val();

            $(this).addClass('active').siblings().removeClass('active');
            init();
            pagelight();
            // allcheck();
        })
        $('.pagebtn').on('click', '#prev', function () {
            ipage--;
            if (ipage < 1) {
                ipage = 1;
            }
            init();
            pagelight();
            // allcheck();
        })
        $('.pagebtn').on('click', '#next', function () {
            ipage++;
            if (ipage > total) {
                ipage = total;
            }
            init();
            pagelight();
        })
    }
    function pagelight() {
        $('.page input').eq(ipage - 1).addClass('active').siblings().removeClass('active');
        if (ipage <= 1) {
            $('#prev').css({
                'background': '#eee',
                'color': '#ccc'
            }).attr('disabled', true);
        } else {
            $('#prev').css({
                'background': '#ccc',
                'color': '#fff'
            }).attr('disabled', false);
        }

        if (ipage >= total) {
            $('#next').css({
                'background': '#eee',
                'color': '#ccc'
            }).attr('disabled', true);
        } else {
            $('#next').css({
                'background': '#ccc',
                'color': '#fff'
            }).attr('disabled', false);
        }
    }
    function allcheck() {
        $('#allcheck').click(function () {
            let status = $(this).prop('checked');
            $('.pro_con input:checkbox').prop('checked', status);
        })
        $('.pro_con').on('click', 'input:checkbox', function () {
            let num1 = 0;
            let num2 = $('.pro_con input:checkbox').length;
            $.each($('.pro_con input:checked'), function (index, item) {
                num1++;
                let thisitem = $(item);
                // delarr.push(thisitem);
                if (num1 == num2) {
                    $('#allcheck').prop('checked', true);
                }

            })
            // console.log(delarr);
        })
    }
    del();
    function del() {
        $('.delbtn').click(function () {//删除
            $.each($('.pro_con input:checked'), function (index, item) {
                let uid = $(item).parent().next().html();
                delarr.push(uid - 0);
            })
            delarr = [...new Set(delarr)];//数组去重
            // console.log(delarr);
            if (confirm('你确定要删除这些商品吗？')) {
                let delgroup = new Promise(resolve => {
                    for (let i = 0; i < delarr.length; i++) {
                        $.ajax({
                            type: 'post',
                            url: '../api/pro_list.php',
                            data: {
                                sqlname: 'delPro',
                                pro_id: delarr[i]
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
                    }
                })
            }
        })
    }

})