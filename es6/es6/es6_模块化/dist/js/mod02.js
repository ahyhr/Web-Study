'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//统一向外暴露
var money = 200;

function sayMoney() {
    console.log('我有' + money + '元');
}

exports.money = money;
exports.sayMoney = sayMoney;