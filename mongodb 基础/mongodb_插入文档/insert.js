/*
    -插入文档
    db.<collection>.insert()
        -插入单个文档对象
            db.stuents.insert({name:"小李",age:23,gender:"男"})
        -插入多个(需要使用数组)[]
            db.stuents.insert([{name:"小1",age:23,gender:"男"},
            {name:"小2",age:25,gender:"男"}])
        
        -插入一个
            db.collection.insertOne()
        -插入多个
            db.collection.insertMany()
*/
