'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sayName = sayName;
//export    单个向外暴露
var name = exports.name = 'yhr';

function sayName() {
    console.log('我叫' + name);
}