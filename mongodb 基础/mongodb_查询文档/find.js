/*
    -查询文档
        db.collection.find()
            返回为数组

        -查询指定值的文档
            db.collection.find({age:23})    {属性:值}

        -查询集合中符合条件的第一个文档
            db.collection.findOne()
                返回为文档对象
        
        -查询符合条件的数量
            db.collection.find().count()
        
*/