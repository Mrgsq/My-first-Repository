"use strict";$(function(){$("#contain .header").load("header.html"),$("#contain .search_nav").load("search_nav.html"),$("#contain #footer").load("footer.html"),$("#submit_btn").click(function(){location.href="shoppingCar.html"});var n=0;function g(n){var i=[];i.push(n),console.log(i),setCookie("addpro_id_"+n,n),setCookie("idarr",i);var t=getCookie("pro_name_"+n),a=getCookie("pro_num_"+n),s=getCookie("pro_img_"+n),o=getCookie("pro_price_"+n);$(".nums").html(a);var e,l=a*o,p="";t&&a&&s&&l?p+='\n            <li class= "add_pro clearfix" >\n                <div class="pro_img fl">\n                    <img src="'+s+'" alt="">\n                        <p>'+t+'</p>\n                </div>\n                <div class="pro_inf fr">\n                    <span class="pro_num">'+a+'</span>\n                    <span class="price">￥'+l+'</span>\n                    <a href="###" class="remove_pro">x</a>\n                </div>\n            </li>  \n        ':(p="",$(".nums").html(0),$("#abox-carttoal").html(0)),$("#abox-carttoal").html(a),$(".details_pro").html(p),$(".price_pro").html(l),$(".check_pro_num").html(a),e=n,$(".add_pro .pro_inf").find($(".remove_pro")).click(function(){$(this).index(),removeCookie("pro_name_"+e),removeCookie("pro_img_"+e),removeCookie("pro_num_"+e),removeCookie("pro_price_"+e),g(e)})}function _(n){$.ajax({type:"post",url:"../api/commentShow.php",data:{goodid:n},dataType:"json",success:function(n){var i="";i+=n.map(function(n){return'\n                     <li class="pro_comment clearfix">\n                        <span class="comment_name fl">'+n.username+'说:</span>\n                        <p class="comment_res fl">'+n.comment+'</p>\n                        <span class="comment_time fr">评论时间：<span class="time">'+n.time+"</span></span>\n                    </li>\n                    "}).join(""),$(".comment_cont").html(i)}})}setInterval(function(){10<=++n&&(n=0),n%2==0?$(".nav_list_news").animate({top:"-8px"},100):$(".nav_list_news").animate({top:"-5px"},100)},200),$(".nav_left_list").hover(function(){$(".mc").css("display","block")},function(){$(".mc").css("display","none")}),$(".item").hover(function(){$(this).css("background","#fff"),5<$(this).index()?$(".list-cont").eq($(this).index()).css({display:"block",top:"28px"}):$(".list-cont").eq($(this).index()).css("display","block")},function(){$(this).css("background","rgba(0, 0, 0, 0.692)"),$(".list-cont").eq($(this).index()).css("display","none")}),function(n){var i=0;$(".nav_right_tel img").css("top","-40px"),$(".nav_right_tel img").eq(i).css("top","0");setInterval(function(){$(".nav_right_tel img").eq(i).animate({top:"40px"},500),$(".nav_right_tel img").css("top","-40px"),2<++i&&(i=0),$(".nav_right_tel img").eq(i).animate({top:"0px"},500)},2e3)}(),function(n){var i=0;$(".jk_zx_img img").css("top","-68px"),$(".jk_zx_img img").eq(i).css("top","25px");setInterval(function(){$(".jk_zx_img img").eq(i).animate({top:"68px"},500),$(".jk_zx_img img").css("top","-68px"),2<++i&&(i=0),$(".jk_zx_img img").eq(i).animate({top:"25px"},500)},2e3)}(),$(window).scroll(function(){570<=scrollY?($(".xiding_box").css("display","block"),$(".to_top").css("display","block")):($(".xiding_box").css("display","none"),$(".to_top").css("display","none"))}),$(".to_top").mouseenter(function(){$(this).css("background","#000 url(../img/detailsimgs/topreturn.png) 18px 21px no-repeat;")}).click(function(){return $("body,html").stop().animate({scrollTop:0},600),!1}),function(){console.log(1);var n=location.href.split("?");console.log(n[1]);var t=n[1].split("_")[2];new Promise(function(i){$.ajax({type:"post",url:"../api/pro_data.php",dataType:"json",data:{id:t},success:function(n){i(n)}})}).then(function(n){var i=n[0].pro_id;console.log(i);var t,a=n[0].sort,s=n[0].pro_bimgs,o=s.split(",");t=a,$.ajax({type:"post",url:"../api/like_pro.php",data:{str:t},dataType:"json",success:function(n){var t="";n.map(function(n,i){t+='\n                        <li class="pro_tab_item">\n                        <img src="../img/listimgs/'+n.pro_imgUrl+'.jpg" alt="">\n                        <p>'+n.pro_name+")</p>\n                        <h3>￥"+n.pro_nowprice+".00</h3>\n                            </li>\n                        "}),$(".pro_imgList").html(t)}});var e,l,p="",c="";n.map(function(n,i){var t=n.pro_simgs,a=n.pro_bimgs,s=t.split(","),o=a.split(",");p='\n                <div class="pro_cont_left fl">\n                <div id="pro_imgbox_left">\n                    <div id="pro_img">\n                        <div class="pro_imgbox">\n                            <div id="mask"></div>\n                            <img src="../img/listimgs/'+o[0]+'.jpg" alt="">\n                        </div>\n                        <ul class="pro_small_imgs">\n                            <li>\n                                <img src="../img/listimgs/'+s[0]+'.jpg" alt="">\n                            </li>\n                            <li>\n                                <img src="../img/listimgs/'+s[1]+'.jpg" alt="">\n                            </li>\n                            <li>\n                                <img src="../img/listimgs/'+s[2]+'.jpg" alt="">\n                            </li>\n                            <li>\n                                <img src="../img/listimgs/'+s[3]+'.jpg" alt="">\n                            </li>\n                            <li>\n                                <img src="../img/listimgs/'+s[4]+'.jpg" alt="">\n                            </li>\n                        </ul>\n                        <div class="pro_imgbox_big">\n                            <img src="../img/listimgs/'+n.pro_imgUrl+'.jpg" alt="">\n                        </div>\n\n                    </div>\n\n                </div>\n            </div>\n            <div class="pro_cont_right fl">\n                <div class="pro_cont_top">\n                    <h1 class="pro_name">'+n.pro_name+'</h1>\n                    <span class="pro_price">原价'+n.pro_oldprice+"，限特价"+n.pro_nowprice+'</span>\n                    <a href="###" class="baiduimg"></a>\n                </div>\n                <div class="hd_by">\n                    <a href="https://www.jianke.com/app/" target="_blank" class="youhui">【戳我下载APP 立省168元】</a>\n                    <a href="https://www.jianke.com/help/honor.html" target="_blank" class="zhenpin">\n                        \x3c!-- 正品保证 --\x3e\n                    </a>\n                </div>\n                <div class="tongcheng">通用名称：<a href="###">'+n.pro_name+'</a></div>\n                <div class="bianhao">产品编号：<a href="###"> A14202818497 </a></div>\n                <div class="wenhao">批准文号：<a href="###">国药准字H20173089 </a><span> （国家食药总局查询） </span></div>\n                <div class="jiage">价格：<a href="###" id=\'good_price\'>￥'+n.pro_nowprice+'.00</a></div>\n                <div class="youhuijuan">优惠券：<a href="###">满2499-200</a><a href="###">满599-45</a><a\n                        href="###">满399-30</a><a href="###">满199-10</a>\n                </div>\n                <div class=\'cuxiao\'>促销信息：<p>健客与您健康同行10周年！店庆活动，原价'+n.pro_oldprice+"，限特价"+n.pro_nowprice+'</p>\n                </div>\n                <div class="zenping">\n                    <div class="zengsong">\n                        <a href="###">赠品</a>\n                        <p>买2赠以下商品，送完为止！</p>\n                        <em></em>\n                    </div>\n                    <div class="zengsongimg">\n                        <img src="../img/detailsimgs/zengsongimg.jpg" alt="">\n                    </div>\n                </div>\n                <dl class="jianyidapei pro_list_xuanze clearfix">\n                    <dt>建议搭配：</dt>\n                    <dd>\n                        <a href="###" class="active">一件体验装</a>\n                        <a href="###">*阳痿早泄（搭必利劲）（必利劲+金戈）</a>\n                        <a href="###">治疗阳痿早泄方案（金戈）</a>\n                        <a href="###">治疗阳痿早泄方案（金戈+固本口服液）</a>\n                        <a href="###">补肾坚挺装（金戈+引阳索）</a>\n                        <a href="###">补精神气（金戈+西洋参皇室胶囊）</a>\n                        <a href="###">9.9元加购（金戈25mg*3片 ）枸橼酸西地那非片咀嚼片</a>\n\n                    </dd>\n                </dl>\n                <dl class="chanpinguige pro_list_xuanze clearfix">\n                    <dt>产品规格：</dt>\n                    <dd>\n                        <a href="javascript:void(0)" class="active">25mg*3s</a>\n                        <a href="javascript:void(0)">25mg*21s</a>\n                        <a href="javascript:void(0)">25mg*21s*2盒（金戈42片装）</a>\n                    </dd>\n                </dl>\n                <dl class="shengchanshangjia pro_list_xuanze clearfix">\n                    <dt>生产商家</dt>\n                    <dd>广州白云山医药集团股份有限公司白云山制药总厂 </dd>\n                </dl>\n                <dl class="xuanzenum pro_list_xuanze clearfix">\n                    <dt>数&nbsp;&nbsp;量：</dt>\n                    <dd>\n                        <div class="numText">\n                            <input type="text" id="numText" value="1">\n                        </div>\n                        <div class="changeNum">\n                            <input type="button" id="addnum">\n                            <input type="button" id="cutnum">\n                        </div>\n                        <div class="kucun">\n                            库存： <span>'+n.stock+'</span>\n                        </div>\n                        <a href="https://www.jianke.com/help/delivery.html">运费详细>></a>\n\n                    </dd>\n                </dl>\n                <div class="btn_box">\n\n                    <input type="button" id="addcar">\n                    <input type="button" id="online_zixun">\n                    <div class="tellbg_img">\n                        <input type="text" title="电话回拨完全免费，请你放心拨打">\n                        <a href="###"></a>\n                    </div>\n                </div>\n                <dl class="pro_tips pro_list_xuanze">\n                    <dt>提&nbsp;&nbsp;示:</dt>\n                    <dd>\n                        本品为处方药，请凭处方笺购买。健客网上药店只对处方药提供信息展示，不提供交易\n                    </dd>\n                </dl>\n                <dl class="dianhua pro_list_xuanze ">\n                    <dt>&nbsp;&nbsp;&nbsp;&nbsp;</dt>\n                    <dd>（如需协助请拨打 <span>400-6480-111</span> </dd>\n                </dl>\n                <dl class="jiankang pro_list_xuanze">\n                    <dt>健康承诺:</dt>\n                    <dd>\n                        <em style="background-position:-443px -86px; "></em>\n                        <a href="">正品保证</a>\n                    </dd>\n                    <dd>\n                        <em style="background-position:-462px -86px;"></em>\n                        <a href="">货到付款 银行汇款/转账 在线支付</a>\n                    </dd>\n                </dl>\n            </div>\n\n                ',c='\n                <div class="xiding_cont clearfix">\n            <div class="jianke_left clearfix">\n                <span class="jk_picimg">\n                    <img src="../img/listimgs/'+n.pro_imgUrl+'.jpg" alt="">\n                </span>\n                <div class="jk_txt">\n                    <h4>'+n.pro_name+"</h4>\n                    <b>￥"+n.pro_nowprice+'.00</b>\n                </div>\n            </div>\n            <div class="jianke_right">\n                <div class="call_box">\n                    <input type="text" class="calltext">\n                    <a href="###"></a>\n                </div>\n                <div class="add_cart">\n                    <a href="###"></a>\n                </div>\n            </div>\n            <div class="jk_zx_img">\n                <img src="../img/detailsimgs/floatzx.png" alt="">\n                <img src="../img/detailsimgs/floatzx.png" alt="">\n                <img src="../img/detailsimgs/floatzx.png" alt="">\n            </div>\n        </div>\n                '}),$(".pro_con").html(p),$(".xiding_box").html(c),e=o,$(".pro_small_imgs li").hover(function(){var n=$(this).index();$(".pro_imgbox img").attr("src","../img/listimgs/"+e[n]+".jpg"),$(".pro_imgbox_big img").attr("src","../img/listimgs/"+e[n]+".jpg")}),Magnifier({ele:"pro_img"}),_(i),$(".changeNum #addnum").click(function(){var n=$("#numText").val();++n>=$(".kucun span").html()&&(n=$(".kucun span").html()),$("#numText").val(n)}),$(".changeNum #cutnum").click(function(){var n=$("#numText").val();--n<=1&&(n=1),$("#numText").val(n)}),l=i,$("#addcar").click(function(){if(console.log(l),getCookie("username")){new Promise(function(n){$.ajax({type:"get",url:"../api/shoppingCar.php",data:{sqlname:"addCar",username:getCookie("username"),shoppro_num:$("#numText").val(),shoppro_id:l},success:function(n){"yes"==n&&(location.href="shoppingCar.html")}})});var n=$(".pro_name").html(),i=$(".pro_imgbox img").attr("src"),t=$("#numText").val(),a=$("#good_price").html(),s=a.slice(1);console.log(n),setCookie("pro_name_"+l,n,3),setCookie("pro_img_"+l,i,3),function(n){if(getCookie("pro_num_"+l)){var i=getCookie("pro_num_"+l)-0;setCookie("pro_num_"+l,i+=n-0,3)}else setCookie("pro_num_"+l,n,3)}(t),setCookie("pro_price_"+l,s,3),g(l)}else alert("请先登录，登录之后才能加入购物车")});var r,m=n[0].pro_name;r=m,$(".this_price").html(r+"价格"),$(".this_img").html(r+"图片");var d=getCookie("addpro_id_"+i);d==i&&g(d)})}(),function(){var i=0,t=$(".pro_tab_item").width()+26,a=-1,n=-i*($(".pro_imgList .pro_tab_item").length-5);console.log(n);setInterval(function(){var n=-t*i;9<++a&&(a=0),5<=a?i--:a<5&&i++,$(".pro_imgList").animate({left:n})},2e3);$(".tab_btn .tab_prevbtn").click(function(){!function(){++i>=$(".pro_imgList .pro_tab_item").length&&(i=$(".pro_imgList .pro_tab_item").length);$(".pro_imgList").animate({left:-t*i})}()}),$(".tab_btn .tab_nextbtn").click(function(){i--})}(),$(".comment_text").bind("input propertychange",function(){40<=$(this).val().length?$(".tips").css("display","block").html("你输入的字数超出范围"):$(".tips").css("display","none")}),$(".comment_btn").click(function(){var n=$.trim($(".comment_text").val());if($(".comment_text").val(""),n){var i=getCookie("username");if(""==i||null==i)$(".tips").css("display","block").html("登陆之后才能发表评论");else{var t=getCookie("id"),a=t.slice(9),s=new Date,o=s.getFullYear(),e=s.getMonth()+1,l=s.getDate(),p=o+"/"+e+"/"+l;$.ajax({type:"post",url:"../api/comment.php",data:{goodid:a,username:i,comment:n,time:p},success:function(n){"yes"==n?(_(a),$(".tips").css({display:"block",color:"green"}).html("评论成功！")):$(".tips").css("display","block").html("评论失败！")}})}}else $(".tips").css("display","block").html("请输入评论内容")})});