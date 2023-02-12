/*
    URL 对地址进行解析
    url.parse("sting地址",true(query),true(host,port))
        -解析地址 成对象

    url.format({对象})
        -将对象解析成正常地址

    url.resolve(from,to)
        -将两段地址解析成一个
*/

var url = require("url");
console.log(url.parse("https://www.bilibili.com/",true,true));

var fm = url.format({
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'www.bilibili.com',
    port: null,
    hostname: 'www.bilibili.com',
    hash: null,
    search: null,
    query: "[Object: null prototype] {}",
    pathname: '/',
    path: '/',
    href: 'https://www.bilibili.com/'
  });

console.log(fm);

console.log(url.resolve("https://w","ww.bilibili.com/"));