/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 17:55:28
 * @LastEditTime: 2019-09-06 18:02:58
 * @LastEditors: Please set LastEditors
 */
//写任务，让gulp帮忙执行，就可以了

//https://www.cnblogs.com/2050/p/4198792.html

/*
 task（） 布置任务

	三个参数：

	第一个参数：任务名称  默认任务 default

	第二个参数：该任务依赖的其他任务，是一个数组（可选）

	第三个参数：任务回调函数（任务执行）
 */

let gulp = require('gulp');//引入模块，才能调用这个模块的方法：类似于new一个对象

//布置任务 task() ：第二个参数的好处，就是你写完了所有的任务后，写好依赖关系，一次性就可以执行所有的任务，自动化
gulp.task('default', ['htmlmin', 'cssmin', 'jsmin'], function () {//default任务依赖sing和coding
	console.log('default 默认任务打印');
});


//1.压缩html

var minifyhtml = require('gulp-htmlmin');//引入插件gulp-htmlmin 

gulp.task('htmlmin', function () {
	var options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};
	return gulp.src('jianke/html/*.html')
		.pipe(minifyhtml(options))
		.pipe(gulp.dest('dist/html'));
});


//2.压缩css
var minifycss = require('gulp-cssmin');

gulp.task('cssmin', function () {
	return gulp.src('jianke/css/*.css')
		.pipe(gulp.dest('dist/css'));
});



//3.压缩js
var minifyjs = require('gulp-uglify');//压缩js的模块
var babel = require('gulp-babel');//把ES6转成ES5

gulp.task('jsmin', function () {
	return gulp.src('jianke/js/*.js')
		.pipe(babel({//es6转es5
			'presets': ['es2015']
		}))
		.pipe(minifyjs())//压缩js
		.pipe(gulp.dest('dist/js'));//ES6不能直接压缩，需要先转成es5
});
