/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 16:50:38
 * @LastEditTime: 2019-09-02 11:52:33
 * @LastEditors: Please set LastEditors
 */
//  
// 插件制作：
// * 为了以后复用和数据的修改，把程序封装好，做成插件，以后方便调用
// * 复用性：把核心代码全部封装
//     * id只写在最外层
// * 灵活性：obj对象设置参数
//     * 图片不同
//     * 放大比例：大图
//     * 运动小图步长

// function extend(a, b) {//修改参数
//     for (var key in b) {//遍历默认参数，让参数a中没有的值由参数b赋给他
//         a[key] = b[key]
//     }
// }

function Magnifier(opt) {//传一个id
    // console.log(opt);
    var defaultOpt = {
        scal: 2,//放大比例
        // speed:
    };

    Object.assign(defaultOpt, opt)
    var fdj = document.getElementById(defaultOpt.ele);
    // console.log(fdj);
    // console.log(defaultOpt);
    var small = fdj.children[0];//第一个子元素节点//小图片盒子
    var smallimg = small.children[0];
    var big = fdj.children[2];//大图片盒子
    var mask = document.getElementById('mask');//透明块
    var bimg = big.children[0];
    var abimgs = defaultOpt.bimgs;
    // console.log(abimgs);
    var listimg = fdj.children[1];//小图片列表
    // var list = listimg.children[0];//ul


    var x = 0; var y = 0;

    small.onmouseover = function () {//鼠标进入small、让mask显示 大图片盒子显示
        mask.style.display = 'block';
        big.style.display = 'block';
    }
    small.onmouseout = function () {//鼠标移出small、让mask隐藏 大图片盒子隐藏
        mask.style.display = 'none';
        big.style.display = 'none';
    }
    var topY = 0;
    window.onscroll = function () {
        topY = scrollY;
    }
    // console.log(scrollY);
    // fdj.offsetTop += scrollY;
    small.onmousemove = function (eve) {
        // var eve = eve || window.eve;
        fdj.offsetTop += topY;
        x = eve.clientX - fdj.offsetLeft - mask.offsetWidth / 2;//设置鼠标的位置
        y = eve.clientY - fdj.offsetTop + scrollY - mask.offsetHeight / 2;

        // console.log(fdj.offsetTop);



        if (x < 0) {//水平x小于零
            x = 0;
        }
        else if (x > small.offsetWidth - mask.offsetWidth) {//临界值水平值大于
            x = small.offsetWidth - mask.offsetWidth;
        }
        if (y < 0) {
            y = 0;
        }
        else if (y > small.offsetHeight - mask.offsetHeight) {
            y = small.offsetHeight - mask.offsetHeight;
        }
        var scalX = (bimg.offsetWidth - big.offsetWidth) / (small.offsetWidth - mask.offsetWidth);//水平轴缩放比例
        var scalY = (bimg.offsetHeight - big.offsetHeight) / (small.offsetHeight - mask.offsetHeight);//垂直轴缩放比例
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';
        // mask.css('top', y + 'px');
        // console.log();
        bimg.style.left = -x * scalX + 'px';
        bimg.style.top = -y * scalY + 'px';
    }


}
