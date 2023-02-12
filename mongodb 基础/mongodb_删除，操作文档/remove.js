/*
    -删除
        db.collection.remove()
            -删除一个或多个，第二个参数传递true,只删除一个
            -传递空对象，会删除所有
        db.collection.deleteOne()
        db.collection.deleteMany()

        db.collection.drop() 删除集合
        db.dropDatabase() 删除数据库

            -一般数据库中的数据不会删除


            采用以下方式
            db.people.insert([{name:"一",age:22,isDel:0},
                                {name:"二",age:25,isDel:0},
                                {name:"三",age:32,isDel:1},
                                {name:"四",age:15,isDel:0}])

            db.people.find({isDel:0})




            内嵌文档
            db.people.find({"hobby.cities":"北京"})
            db.people.update({name:"二"},{$push:{"hobby.cities":"广东"}})   添加
*/  


//向数据库添加    性能差
for (let i = 0; i < 20000; i++) {
    db.arr.insert({num:i}); 
}

//性能更好
var arr =[];
for (let i = 0; i < 20000; i++) {
    arr.push({num:i});  
}
db.arr.insert(arr);


//查询num为500
db.arr.find({num:500})
db.arr.find({num:{$eq:500}})
//查询num大于500    $gt
db.arr.find({num:{$gt:500}})
//查询num小于500    $lt
db.arr.find({num:{$lt:500}})
//大于40小于50
db.arr.find({num:{$gt:40,$lt:50}})
//查询前10条        $lte
db.arr.find({num:{$lte:10}})
//或 $or
//自增  $inc

//设置显示数据的上限      limit()只显示10条
db.arr.find().limit(10)
//显示10-20              skip()跳过10条
db.arr.find().skip(10).limit(10)

    //skip(页面-1*每页显示的条数).limit(每页显示的条数)