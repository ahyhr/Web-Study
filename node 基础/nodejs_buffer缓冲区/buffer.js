/*
    Buffer(缓冲区)
        -存储二进制数据
*/

var str = "hello 你好";
//将一个字符串保存到buffer中
var buf = Buffer.from(str);

console.log("buf "+buf.length);//占用内存的大小
console.log("str "+str.length);//字符串长度

//创建一个10字节的buffer
var buf2 = Buffer.alloc(10);
//在控制台输出为10进制
console.log(buf2);
//通过索引操作元素
buf2[0] = 88;
buf2[1] = 255;
buf2[2] = 0xaa;
buf2[3] = 255;

//创建10字节的buffer，可能包含敏感数据，不安全
var buf3 = Buffer.allocUnsafe(10);

//toString()       将缓冲区内容转换成字符串
console.log(buf.toString());
