"use strict";$(function(){$(".header").load("header.html"),$(".search_nav").load("search_nav.html"),$("#footer").load("footer.html");var n=0;setInterval(function(){10<=++n&&(n=0),n%2==0?$(".nav_list_news").animate({top:"-8px"},100):$(".nav_list_news").animate({top:"-5px"},100)},200);$(".nav_left_list").hover(function(){$(".mc").css("display","block")},function(){$(".mc").css("display","none")}),$(".item").hover(function(){$(this).css("background","#fff"),5<$(this).index()?$(".list-cont").eq($(this).index()).css({display:"block",top:"28px"}):$(".list-cont").eq($(this).index()).css("display","block")},function(){$(this).css("background","rgba(0, 0, 0, 0.692)"),$(".list-cont").eq($(this).index()).css("display","none")}),function(){var n=0;$(".nav_right_tel img").css("top","-40px"),$(".nav_right_tel img").eq(n).css("top","0");setInterval(function(){$(".nav_right_tel img").eq(n).animate({top:"40px"},500),$(".nav_right_tel img").css("top","-40px"),2<++n&&(n=0),$(".nav_right_tel img").eq(n).animate({top:"0px"},500)},2e3)}();var t=0,o=16,c=1;function s(i){new Promise(function(a){$.ajax({type:"get",url:"../api/init.php",data:{name:i.name,nowpage:o*(c-1),page_pro:o,max:i.max,min:i.min},dataType:"json",success:function(n){a(n)}})}).then(function(n){var a="";a+=n.map(function(n,a){return'\n                    <li data-id="pro_list_'+n.pro_id+'">\n                                <div class="imgbox"><a href="###">\n                                        <img src="../img/listimgs/'+n.pro_imgUrl+'.jpg" alt="">\n                                    </a></div>\n                                <div class="pro_inf">\n                                    <span class="nowprice">￥'+n.pro_nowprice+".00</span>\n                                    <s>￥"+n.pro_oldprice+"</s>\n                                    <p><em></em>"+n.pro_name+'</p >\n                                <div class="checkinf">\n                                    <a href="###">查看详情</a>\n                                </div>\n                                </div >\n                    </li >\n                    '}).join(""),$(".pro_con").html(a),e({name:i.name}),$(".pro_con li").click(function(){var n=$(this).data("id"),a=getCookie("id");a?a!=n?setCookie("id",n):setCookie("id",""):setCookie("id",n),location.href="details.html?"+n})})}function e(e){$.ajax({type:"get",url:"../api/pro.php",data:{name:e.name,max:e.max,min:e.min},success:function(n){t=Math.ceil(n/o),$(".pagetotalNum").html(t);for(var a="",i=0;i<t;i++)a+=' <input type="button" value="'+(i+1)+'">';$(".pageNums").html(a),function(n){function a(){$(".pageNums input").eq(c-1).addClass("active").siblings().removeClass("active")}a(),c<=1?$("#prevpage").attr("disabled","true").css("color","#ccc"):$("#prevpage").removeAttr("disabled").css("color","#666"),t<=c?$("#nextpage").attr("disabled","true").css("color","#ccc"):$("#nextpage").removeAttr("disabled").css("color","#666"),$(".pageNums input").click(function(){c=1*$(this).val(),a(),s({nowpage:c,name:n})}),$("#prevpage").click(function(){c--,console.log(c),c<1&&(c=1),a(),s({nowpage:c,name:n})}),$("#nextpage").click(function(){t<++c&&(c=t),a(),s({nowpage:c,name:n})}),$("#getpage").bind("input propertychange",function(){$(this).val()>=t?$(this).val(t):$(this).val()<=1&&$(this).val(1)}),$("#getpageBtn").click(function(){console.log(1,$("#getpage").val()),c=$("#getpage").val(),a(),s({nowpage:c,name:n})})}(e.name)}})}s({nowpage:c,name:"init"}),function(){var n=getCookie("id").split("_")[2];console.log(n);var a=new Promise(function(a){$.ajax({type:"get",url:"../api/pro_data.php",data:{id:n},dataType:"json",success:function(n){a(n)}})}),i=$("#VistedProducts").html();console.log(i),a.then(function(n){n.map(function(n){i+='\n                <li class="Visted_pro">\n                            <a href="###"><img src="../img/listimgs/'+n.pro_imgUrl+'.jpg" alt=""></a>\n                            <p>'+n.pro_name+"</p>\n                            <span>￥"+n.pro_nowprice+"</span>\n                        </li>\n                "}),$("#VistedProducts").html(i)})}();$("#chaxun").click(function(){var n=$.trim($("#minPrice").val()),a=$.trim($("#maxPrice").val());s({max:a,min:n,name:"priceSearch",nowpage:c}),e({max:a,min:n,name:"priceSearch"})}),$("#paixu").click(function(){"价格升序"==$(this).val()?(s({name:"Upsort",nowpage:c}),e({name:"Upsort"}),$(this).val("价格降序")):(s({name:"Downsort",nowpage:c}),e({name:"Downsort"}),$(this).val("价格升序"))}),$("#man").click(function(){s({name:"man_pro",nowpage:c}),e({name:"man_pro"})}),$("#woman").click(function(){s({name:"woman_pro",nowpage:c}),e({name:"woman_pro"})}),$("#child").click(function(){s({name:"child_pro",nowpage:c}),e({name:"child_pro"})}),$("#old").click(function(){s({name:"old_pro",nowpage:c}),e({name:"old_pro"})})});