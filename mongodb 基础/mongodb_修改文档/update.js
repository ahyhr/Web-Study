/*
    -修改文档
        db.collection.update(查询条件，新对象)
            db.collection.update({name:"张"},{age:11})
                -默认情况会替换
            $set 修改文档中指定的属性
            $unset 删除文档指定的属性
            $push 向数组中添加一个新元素
            $addToSet 向数组中添加一个新元素，如果已经存在，则不添加
            db.collection.update({name:"张"},{$set:{name:"李"})


        db.collection.updateMany()
            -修改多个符合条件的文档
        db.collection.updateOne()
            -修改一个符合条件的文档
        db.collection.replaceOne()
            -替换一个
            
        db.stuents.updateMany({age:23},{$set:{name:"替换"}})
*/
