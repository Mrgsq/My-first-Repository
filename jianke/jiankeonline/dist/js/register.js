"use strict";!function(){$(document).ready(function(){$("#agreebox").attr("checked","true"),$("#username").val(""),$("#tel").val(""),$("#phone").val(""),$("#password").val(""),$("#repeat").val(""),$("#yanzhengma").val(""),$("#phoneNum").val("")}),$("#login_btn").click(function(){location.href="login.html"}),$("#guanggao").click(function(){window.open("https://im.jianke.com/chat.aspx?utype=2&ftype=1&siteid=a1wei&number=1&uname=null&ismember=null&memToken=&eng=0&act=0&refurl=https%3A%2F%2Fwww.jianke.com%2Fuser%2Fregister")}),$("#username").blur(function(){var t=$(this).val();/^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/.test(t)?$(this).parent().find("h4").attr("isok",!0).html("用户名可用").css("color","#58bc58"):$(this).parent().find("h4").attr("isok",!1).html("用户名不合法").css("color","red")}),$("#tel").bind("input propertychange",function(){var e=this,t=$(this).val();/^1[3456789]\d{9}$/.test(t)?($.ajax({type:"post",url:"../api/reg.php",data:{tel:t,name:"checkusername"},success:function(t){console.log(t),"no"==t?$(e).parent().find("h4").attr("isok",!0).html("此手机号可以使用").css("color","green"):$(e).parent().find("h4").attr("isok",!1).html("此手机号已被注册").css("color","red")}}),$(this).parent().find("h4").attr("isok",!0).html("手机号正确").css("color","#58bc58")):$(this).parent().find("h4").attr("isok",!1).html("请输入正确的手机号").css("color","red")});var t=["../img/regimgs/reg1.jpg","../img/regimgs/reg2.jpg","../img/regimgs/reg3.jpg","../img/regimgs/reg4.jpg","../img/regimgs/reg5.jpg","../img/regimgs/reg6.jpg","../img/regimgs/reg7.jpg"],e=["nnwn","n6b4","nm3n","bmn3","6g4y","n4gc","bwm3"],r=0;function s(){r=parseInt(8*Math.random()),console.log(r),$("#yanzhengimg").attr("src",t[r])}s(),$("#updataimg").click(function(){s()}),$("#yanzhengma").change(function(){$(this).val()==e[r]?$(this).parent().find("h4").attr("isok",!0).html("验证码输入正确").css("color","#58bc58"):($(this).parent().find("h4").attr("isok",!1).html("验证码输入错误").css("color","red"),$(this).val(""),s())}),$("#password").blur(function(){var t=$(this).val(),e=/^[\w_-]{6,16}$/;console.log(e.test(t)),t?e.test(t)?$("#password").parent().find("h4").attr("isok",!0).html("密码格式正确").css("color","green"):$("#password").parent().find("h4").attr("isok",!1).html("密码格式有误").css("color","red"):$(this).parent().find("h4").attr("isok",!1).html("请输入密码").css("color","red")}),$("#repeat").blur(function(){var t=$("#password").val();if(t){var e=$(this).val();e?t==e?$(this).parent().find("h4").attr("isok",!0).html("密码一致").css("color","green"):$(this).parent().find("h4").attr("isok",!1).html("密码不一致").css("color","red"):$(this).parent().find("h4").attr("isok",!1).html("请再次密码").css("color","red")}else $("#password").parent().find("h4").attr("isok",!1).html("请输入密码").css("color","red")});var a=0;$("#duanxinbtn").click(function(){$("#tel").val()?$.ajax({type:"post",url:"../api/duanxin.php",data:{userphone:$("#tel").val()},success:function(t){console.log(t);var e=JSON.parse(t);a=e.phonecode}}):$("#tel").parent().find("h4").html("请输入手机号码").css("color","red")}),$("#phoneNum").blur(function(){var t=$(this).val();t?t==a?$(this).parent().find("h4").attr("isok",!0).html("短信验证码正确").css("color","green"):$(this).parent().find("h4").attr("isok",!1).html("短信验证码不正确").css("color","red"):$(this).parent().find("h4").attr("isok",!1).html("请输入短信验证码").css("color","red")}),$("#agreebox").click(function(){console.log($("#agreebox").prop("checked")),$("#agreebox").prop("checked")?$("#regbtn").attr("disabled","true").css("background","#32a1e8"):$("#regbtn").attr("disabled","flase").css("background","#ccc")}),$("#regbtn").click(function(){$("#username").val()&&$("#tel").val()&&$("#password").val()&&$("#phoneNum")?(console.log($(".checkinput h4").attr("isok")),$(".checkinput h4").attr("isok")&&($.ajax({type:"post",url:"../api/reg.php",data:{name:"reg",username:$("#username").val(),tel:$("#tel").val(),password:$("#password").val()},dataType:"json",success:function(t){console.log(t),"yes"==t||alert("注册失败")}}),alert("注册成功"),location.href="login.html")):($(this).attr("disable","flase").css("background","#ccc").addClass("active"),$("#tel").parent().find("h4").html("手机号不能为空").css("color","red"),$("#password").parent().find("h4").html("密码不能为空").css("color","red"),$("#phoneNum").parent().find("h4").html("手机验证码不能为空").css("color","red"))})}();