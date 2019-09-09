/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 10:57:42
 * @LastEditTime: 2019-09-06 10:57:42
 * @LastEditors: your name
 */
(function () {
    $('.header').load('header.html');
    $('.search_nav').load('search_nav.html');
    $('#footer').load('footer.html');
    $('#header_login').click(function () {
        console.log($(this));
        location.href = 'login.html';
    })
    $('#header_reg').click(function () {
        location.href = 'register.html';
    })
    $('.item').click(function () {
        location.href = 'list.html';
    })
    // getUserName();//获取用户名
    // function getUserName() {
    //     let username = getCookie('username');
    //     $('.header_nav_left').find('p').html(username + '欢迎光临');
    // }


    smalllunbo();//小轮播图
    function smalllunbo() {
        let iw = $('.imgbox .img_box').eq(0).outerWidth();//设置运动宽度
        $('.imgbox .img_box').css('left', iw);
        $('.imgbox .img_box').eq(0).css('left', 0);
        let now = 0;
        let timer5 = setInterval(next, 2000);
        function next() {
            $('.imgbox .img_box').eq(now).animate({ left: -iw }, 1000);//移出
            // $('.imgbox .img_box').eq(now).css('left', iw);//待入场
            now++;
            if (now > $('.imgbox .img_box').length - 1) {
                now = 0;
            }
            $('.imgbox .img_box').eq(now).css('left', iw);//待入场
            $('.imgbox .img_box').eq(now).animate({ left: 0 }, 1000);
        }
        function prev() {
            $('.imgbox .img_box').eq(now).animate({ left: iw }, 1000);//移出
            // $('.imgbox .img_box').eq(now).css('left', iw);//待入场
            now--;
            if (now < 0) {
                now = $('.imgbox .img_box').length - 1;
            }
            $('.imgbox .img_box').eq(now).css('left', -iw);//待入场
            $('.imgbox .img_box').eq(now).animate({ left: 0 }, 1000);
        }
        $('.imgbox').mouseenter(() => {
            console.log($('.imgbox'));
            // clearInterval(timer5);
            clearInterval(timer5);//清除定时器
            $(this).mouseleave(() => {
                clearInterval(timer5);
                timer5 = setInterval(next, 2000);
            })
        })
        $('.b_prevbtn').click(() => {
            prev();
        });
        $('.b_nextbtn').click(() => {
            next();
        })
    }
    let num = 0;
    let timer1 = setInterval(() => {
        num -= 30;
        if (num <= -120) {
            num = 0;
        }
        $('.logo_bottom').css('transform', `translateY(${num}px)`)

    }, 1000);
    $('.item').mouseover(function () {
        $(this).css('background', '#fff');
        // console.log($('.list-cont'));

        if ($(this).index() > 5) {
            $('.list-cont').eq($(this).index()).css({ 'display': 'block', 'top': '28px' });
        } else {
            $('.list-cont').eq($(this).index()).css('display', 'block');
        }
        $(this).mouseout(function () {
            $(this).css('background', 'rgba(0, 0, 0, 0.692)');
            $('.list-cont').eq($(this).index()).css('display', 'none');
        })

    });
    sideAnimation();
    function sideAnimation() {//侧边广告动画
        $('.nav_erweima').mouseenter(function () {
            console.log($(this));
            $('.out_erwei').css('right', '50px');
            $(this).mouseleave(function () {
                $('.out_erwei').css('right', '-400px');
            })
        })
        $(window).scroll(function () {//
            // console.log(scrollY);
            if (scrollY >= 600) {//大于600时出现
                $('.returntop').css('display', 'block').mouseenter(function () {
                    $(this).css('background', 'rgba(0, 0, 0, 0.7)').mouseleave(() => {
                        $(this).css('background', 'rgba(0, 0, 0, 0.3)');
                    });

                }).click(() => {//点击返回顶部
                    // window.animate({ sc });
                    $('body,html').stop().animate({ scrollTop: 0 }, 600);
                    return false;
                });
            } else {
                $('.returntop').css('display', 'none');
            }
        })
    };
    let n = 0;
    let z = 1;
    let bgarr = ['rgb(51,21,10)', 'rgb(71,166,244)', 'rgb(93,120,105)', 'rgb(254,163,180)', 'rgb(36,107,163)'];
    // timer();//初始化
    titles();
    next();
    let timer = setInterval(next, 2500);

    function next() {
        // titles();
        if (z > 5) {
            z = 1;
            n = 0;
            $('.bannerimgs li').css('z-index', 0);
            $('.bannerimgs li').eq(n).css('z-index', 1);
        }
        $('.bannerimgs li').eq(n).css('z-index', z);
        $('#banner').css('background', bgarr[n]);
        $('.banner_titels a').css('background', 'rgba(0,0,0,0.582)');
        $('.banner_titels a').eq(n).css('background', 'rgba(0,0,0,0.9)');
        n++;
        z++;
    }
    function prev() {
        n--;
        z++;
        if (n < 0) {
            n = 4;
        }
        if (z > 5) {
            z = 1;
            $('.bannerimgs li').css('z-index', 0);
            $('.bannerimgs li').eq(n).css('z-index', 1);
        }
        $('.bannerimgs li').eq(n).css('z-index', z);
        $('#banner').css('background', bgarr[n]);
        $('.banner_titels a').css('background', 'rgba(0,0,0,0.582)');
        $('.banner_titels a').eq(n).css('background', 'rgba(0,0,0,0.9)');

    }
    $('.bannerbox').mouseenter(function () {
        clearInterval(timer);//鼠标移入关闭定时器
        $('.bannerimgs span').css('display', 'block');
        $(this).mouseleave(function () {
            $('.bannerimgs span').css('display', 'none');
            clearInterval(timer);//开启之前先关闭
            timer = setInterval(next, 2500);
        })
    })
    let tanchuTimer = setInterval(function () {
        $('.close_tanchu').parent().css('display', 'block');

    }, 10000)
    $('.close_tanchu').click(function () {
        clearInterval(tanchuTimer);
        $(this).parent().css('display', 'none');
    })
    function titles() {

        $('.banner_titels span').mouseenter(function () {

            clearInterval(timer);//开启之前先关闭
            n = $(this).index();
            $('.bannerimgs li').css('z-index', 0);
            $('.bannerimgs li').eq(n).css('z-index', z);
            $('#banner').css('background', bgarr[n]);
            $('.banner_titels a').css('background', 'rgba(0,0,0,0.582)');
            $('.banner_titels a').eq(n).css('background', 'rgba(0,0,0,0.9)');
            $(this).mouseleave(function () {
                clearInterval(timer);//开启之前先关闭
                timer = setInterval(next, 2500);
            })
        });
    }

    $('.leftbtn').click(() => {
        prev();
    });
    $('.rightbtn').click(() => {
        next();
    })
    listapply();//渲染
    // tab();//选项卡
    function listapply() {//页面渲染
        let leftbimg = ['1f_1', '2f_1', '3f_1', '4f_1', '5f_1', '6f_1'];
        let leftaCont = [['呼吸专题', '胃病用药', '雷诺考特', '杜密克'],
        ['糖尿病专题', '牛皮藓专题', '精神分裂', '畅配专题'],
        ['前列腺专题', '优生优育', '希爱力', '益肾壮阳膏'],
        ['安宫牛黄丸', '金纳多', '云南白药', '唯依能'],
        ['羊胎盘', '碧生源常润茶', '余仁生', '中药饮片'],
        ['血压计', '鼻腔护理喷雾', '治疗仪', '雾化器']
        ];
        let title = ['家庭常备', '专科用药', '男性用药', '老年专区', '营养滋补', '医疗器械'];
        let leftaimg = [['1f_list1', '1f_list2', '1f_list3', '1f_list4'],
        ['2f_list1', '2f_list2', '2f_list3', '2f_list4'],
        ['3f_list1', '3f_list2', '3f_list3', '3f_list4'],
        ['4f_list1', '4f_list2', '4f_list3', '4f_list4'],
        ['5f_list1', '5f_list2', '5f_list3', '5f_list4'],
        ['6f_list1', '6f_list2', '6f_list3', '6f_list4'],
        ];
        let lefta_h3 = ['舒利迭', '片仔癀', '希爱力', '香丹清', '汤臣倍健蛋白粉', '雅培血糖仪'];
        let lefta_p = ['拜托哮喘 轻松生活', '用于热毒血瘀所致急慢性病毒性肝炎', '进口品质 长效自燃', '润肠通便 祛黄褐斑', '抵抗力 守护你', '雅培瞬感扫描式葡萄糖检测系统'];
        let leftbg = ['1f_2', '2f_2', '3f_2', '4f_2', '5f_2', '6f_2'];
        let rightcont = {
            p: [['小麦纤维素颗粒(非比麸)', '艾司奥美拉唑镁肠溶片(曾用名:埃索美拉唑镁肠溶片)', '丹参酮胶囊(希力)', '感冒灵颗粒(999)'],
            ['卡泊三醇软膏(达力士)', '非那雄胺片(保法止)', '恩替卡韦分散片(润众)', '拉莫三嗪片(利必通)'],
            ['枸橼酸西地那非片(金戈)', '枸橼酸西地那非片(万艾可)', '盐酸达泊西汀片(必利劲)', '金水宝金水宝胶囊 72粒装 '],
            ['安宫牛黄丸(同仁堂)', '托伐普坦片(苏麦卡)', '磷酸西格列汀片(捷诺维)', '达格列净片(安达唐)'],
            ['余仁生牌灵芝加破壁孢子粉胶囊', 'nc澳洲护肝片', '中智草晶华天麻破壁草本', '健安喜浓缩加强鱼油软胶囊(120粒)'],
            ['稳豪型血糖试纸50片', '鱼跃403C压缩空气式雾化器', '欧姆龙电子血压计HEM-8102A(上臂式)', '全日康J18B型电脑中频治疗仪(普通款)']
            ],
            img: [['1cont_list1', '1cont_list2', '1cont_list3', '1cont_list4'],
            ['2cont_list1', '2cont_list2', '2cont_list3', '2cont_list4'],
            ['3cont_list1', '3cont_list2', '3cont_list3', '3cont_list4'],
            ['4cont_list1', '4cont_list2', '4cont_list3', '4cont_list4'],
            ['5cont_list1', '5cont_list2', '5cont_list3', '5cont_list4'],
            ['6cont_list1', '6cont_list2', '6cont_list3', '6cont_list4'],
            ],
            p2: [['吸入用布地奈德混悬液(普米克令舒)', '百令胶囊(百令)', '布地奈德福莫特罗粉吸入剂(信必可都保)'],
            ['排毒养颜胶囊(盘龙云海)', '恩替卡韦分散片(雷易得)', '盐酸普拉克索片(森福罗)'],
            ['汇仁肾宝片126s', '引阳索胶囊(育林)', '龟龄集(远)'],
            ['Swisse 葡萄籽精华片', 'NC姜黄素胶囊护肝片', '健力多R氨糖软骨素钙片'],
            ['双参龙胶囊(格拉丹东)', '维D钙咀嚼片(迪巧)', '塞来昔布胶囊(西乐葆)'],
            ['仙鹤-神灯(TDP特定电磁波治疗仪)(CQ-29P型)', '诺斯清 生理性海水鼻腔护理喷雾器 80ml ', '欧姆龙电子血压计HEM-7207语音播报(上臂式)']
            ],
            img2: [['1cont_list5', '1cont_list6', '1cont_list7'],
            ['2cont_list5', '2cont_list6', '2cont_list7'],
            ['3cont_list5', '3cont_list6', '3cont_list7'],
            ['4cont_list5', '4cont_list6', '4cont_list7'],
            ['5cont_list5', '5cont_list6', '5cont_list7'],
            ['6cont_list5', '6cont_list6', '6cont_list7'],
            ]
        }
        let html1 = '';
        for (let i = 0; i < 6; i++) {
            html1 += `
            <div class="wrap_middle">
            <div class="middle_title">
                <h2>${i + 1}F ${title[i]}</h2>
            </div>
            <div class="middle_cont clearfix">
                <div class="middle_cont_left">
                    <dl class="middle_cont_nav">
                        <dt>
                            <img src="../img/indeximgs/${leftbimg[i]}.png" alt="">
                        </dt>
                        <dd>
                            <ul class="middle_cont_nav_top clearfix">
                                <li style="margin-right: 1px;"><a href="">${leftaCont[i][0]}</a></li>
                                <li><a href="">${leftaCont[i][1]}</a></li>
                                <li style="margin-bottom: 0;margin-right: 1px;"><a href="">${leftaCont[i][2]}</a></li>
                                <li style="margin-bottom: 0;"><a href="">${leftaCont[i][3]}</a></li>
                            </ul>
                            <ul class="middle_cont_nav_bottom clearfix">
                                <a href="###"><img src="../img/indeximgs/${leftaimg[i][0]}.jpg" alt=""></a>
                                <a href="###" style="border-right: none;"><img src="../img/indeximgs/${leftaimg[i][1]}.jpg"
                                        alt=""></a>
                                <a href="###" style="border-bottom: none;"><img src="../img/indeximgs/${leftaimg[i][2]}.jpg"
                                        alt=""></a>
                                <a href="###" style="border-right: none;border-bottom: none;"><img
                                        src="../img/indeximgs/${leftaimg[i][3]}.jpg" alt=""></a>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div class="middle_cont_nav2">
                    <dl>
                        <dt><img src="../img/indeximgs/${leftbg[i]}.png" alt=""></dt>
                        <dd class="middle_nav_box">
                            <h4>${lefta_h3[i]}</h4>
                            <div></div>
                            <p>${lefta_p[i]}</p>
                        </dd>
                    </dl>
                </div>
                <div class="middle_cont_right">
                    <ul class="middle_cont_list_left clearfix">
                        <li>
                            <p>${rightcont['p'][i][0]}</p>
                            <img src="../img/indeximgs/${rightcont['img'][i][0]}.jpg" alt="">
                        </li>
                        <li>
                            <p>${rightcont['p'][i][1]}</p>
                            <img src="../img/indeximgs/${rightcont['img'][i][1]}.jpg" alt="">
                        </li>
                        <li>
                            <p>${rightcont['p'][i][2]}</p>
                            <img src="../img/indeximgs/${rightcont['img'][i][2]}.jpg" alt="">
                        </li>
                        <li>
                            <p>${rightcont['p'][i][3]}</p>
                            <img src="../img/indeximgs/${rightcont['img'][i][3]}.jpg" alt="">
                        </li>
                    </ul>
                    <ul class="middle_cont_list_right clearfix">
                        <li>
                            <p>${rightcont['p2'][i][0]}</p>
                            <img src="../img/indeximgs/${rightcont['img2'][i][0]}.jpg" alt="">
                        </li>
                        <li>
                            <p>${rightcont['p2'][i][1]}</p>
                            <img src="../img/indeximgs/${rightcont['img2'][i][1]}.jpg" alt="">
                        </li>
                        <li>
                            <p>${rightcont['p2'][i][2]}</p>
                            <img src="../img/indeximgs/${rightcont['img2'][i][2]}.jpg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            `
        }
        let html = $('#wrap').html();
        html += html1;
        $('#wrap').html(html);
        // console.log($('.wrap'));
    }
    tab();
    function tab() {

        $('.bottom_b_list li').mouseenter(function () {
            // console.log($(this).index());
            let _index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.bottom_b_cont>li').eq(_index).show().siblings().hide();
        })
        $('.bottom_bottom_list li').mouseenter(function () {
            // console.log($(this).index());
            let _index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.bottom_bottom_cont>li').eq(_index).show().siblings().hide();
        })
    }
})();