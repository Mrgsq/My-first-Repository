/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 20:45:43
 * @LastEditTime: 2019-09-06 20:09:50
 * @LastEditors: Please set LastEditors
 */
(function () {

    let ipage = 0;//当前页下标
    let pagetotal = 5;//每页显示的条数
    let totalpages = 0;//总页数
    init();
    function init() {//初始化
        let showinit = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: '../api/userinf.php',
                dataType: 'json',
                data: {
                    sqlname: 'showData',
                    ipage: ipage * pagetotal,
                    pagetotal: pagetotal
                },
                success: data => {
                    resolve(data);

                }
            });
        });
        showinit.then(data => {
            let html = '';
            data.map(function (item) {
                return html += `
                    <tr>
                    <td><input type="checkbox" class='check_box'></td>
                    <td class='uid'>${item.userid}</td>
                    <td class='username'>${item.username}</td>
                    <td class='password'>${item.password}</td>
                    <td class='phonenum'>${item.phonenum}</td>
                    <td>
                        <input type="button" class="save" value="修改并保存">
                        <input type="button" class="del" value="删除">
                        <input type="button" class="edit" value="Edit">
                    </td>
                </tr>
                    `
            }).join('');
            // $('#tbody').html(html);
            // getpages();
            editinf(html);
            // revise();
            del();
            checkall();
        })

    }

    function editinf(html) {//编辑信息
        $('#tbody').html(html);
        $('.edit').click(function () {
            $(this).parent().prev().attr('contenteditable', 'true');
            $(this).parent().prev().prev().attr('contenteditable', 'true');
            $(this).parent().prev().prev().prev().attr('contenteditable', 'true');
            $(this).parent().prev().prev().prev().focus();
            revise();
        });
    }

    function revise() {//修改信息
        $('#tbody tr').on('click', '.save', function () {
            console.log($(this).index());
            console.log($(this).index());
            let uid = $('#tbody tr').find('.uid').eq($(this).index()).html();
            let username = $('#tbody tr').find('.username').eq($(this).index()).html();
            let phonenum = $('#tbody tr').find('.phonenum').eq($(this).index()).html();
            let password = $('#tbody tr').find('.password').eq($(this).index()).html();
            console.log(uid, username, phonenum, password);
            if (confirm('你确定要修改信息？')) {
                $.ajax({
                    type: 'get',
                    url: '../api/userinf.php',
                    data: {
                        sqlname: 'changeUserinf',
                        userid: uid,
                        username: username,
                        password: password,
                        phonenum: phonenum
                    },
                    success: str => {
                        console.log(str);
                        if (str == 'yes') {
                            alert('修改成功');
                        } else {
                            alert('修改失败');
                        }
                    }
                })
            }
        })
        // $('#tbody .save').click(function () {

        // })
    }

    function del() {//删除

        $('#tbody tr').on('click', '.del', function () {
            let uid = $(this).parent().parent().find('.uid').html();
            // let uid = $(this).parent();
            console.log(uid);
            if (confirm('你确定要删除这条数据？')) {
                $.ajax({
                    type: 'post',
                    url: '../api/userinf.php',
                    data: {
                        sqlname: 'delUser',
                        userid: uid - 0
                    },
                    success: str => {
                        console.log(str);
                        if (str == 'yes') {
                            init();
                            alert('删除成功');
                        } else {
                            alert('删除失败');
                        }
                    }
                })
            }

        });
    }
    getpages();
    pageshift();
    // checkall();
    // prevAndnext();
    function getpages() { //获取页码个数
        $.ajax({
            type: 'post',
            url: '../api/userinf.php',
            data: {
                sqlname: 'getPage',
            },
            success: str => {
                totalpages = Math.ceil(str / pagetotal);//总页码数
                // console.log(totalpage);
                let html = '';
                for (let i = 0; i < totalpages; i++) {
                    html += `
                    <input type="button" value="${i + 1}" id="btn_${i + 1}">
                    `
                }
                // console.log($('.n'))
                $('.numbtns').html(html);
                pagebtnlight();
                prevAndnext();
            }
        })
    }
    function pagebtnlight() {
        $('.numbtns input').eq(ipage).addClass('active').siblings().removeClass('active');
    }
    function pageshift() {
        $('.numbtns').on('click', 'input', function () {
            ipage = $(this).val() - 1;
            // $(this)
            init();
            pagebtnlight();
            prevAndnext();
        })
        $('.pagebtns').on('click', '#nextbtn', function () {
            ipage++;
            console.log(ipage);
            if (ipage >= totalpages - 1) {
                ipage = totalpages - 1;
            }
            init();
            pagebtnlight();
            prevAndnext();
        })
        $('.pagebtns').on('click', '#prevbtn', function () {
            ipage--;
            if (ipage <= 0) {
                ipage = 0;
            }
            init();
            pagebtnlight();
            prevAndnext();
        })
        $('.pagebtns').on('click', '#firstbtn', function () {
            ipage = 0;
            init();
            pagebtnlight();
            prevAndnext();
        })
        $('.pagebtns').on('click', '#lastbtn', function () {
            ipage = totalpages - 1;
            init();
            pagebtnlight();
            prevAndnext();
        })
    }
    function prevAndnext() {
        if (ipage <= 0) {//页数小于等于第一页上一页按钮不可用

            $('#prevbtn').attr('disabled', true).css('background', '#ccc');
        } else {
            $('#prevbtn').attr('disabled', false).css('background', '#f5f5f5');
        }
        if (ipage >= totalpages - 1) {//页数大于最后一页下一页不可用
            $('#nextbtn').attr('disabled', true).css('background', '#ccc');
        } else {
            $('#nextbtn').attr('disabled', false).css('background', '#f5f5f5');
        }
        if (ipage == 0) {//如果页面为第一页first按钮不可用
            $('#firstbtn').attr('disabled', true).css('background', '#ccc');
        } else {
            $('#firstbtn').attr('disabled', false).css('background', '#f5f5f5');
        }
        if (ipage == totalpages - 1) {
            $('#lastbtn').attr('disabled', true).css('background', '#ccc');
        } else {
            $('#lastbtn').attr('disabled', false).css('background', '#f5f5f5');
        }
    }
    function checkall() {//全选
        $('#checkall').click(function () {
            let statu = $('#checkall').prop('checked');
            $('#tbody .check_box').prop('checked', statu);
        })
        $('#tbody .check_box').click(function () {
            let checkLength = 0;
            let allLength = $('#tbody .check_box').length;
            // console.log(allLength);
            $('#tbody .check_box:checked').each(function (index, item) {
                checkLength++;
                // console.log(checkLength);
                if (checkLength == allLength) {
                    $('#checkall').prop('checked', true);
                } else {
                    $('#checkall').prop('checked', false);
                }
            })

        })
    }


})();