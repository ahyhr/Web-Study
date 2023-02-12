//入口文件

//模块引入
import * as m1 from './mod01.js';
import * as m2 from './mod02.js';
import * as m3 from './mod03.js';

console.log(m1);
console.log(m2);
console.log(m3);


//导入npm包
import $ from 'jquery';//const $ = require('jquery)
$('body').css('background','pink');