/*
    -基本概念
        数据库(database)
        集合(collection)
        文档(document)
            -在MngoDB中，数据库和集合都不需要手动创建，
            当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合

    -基本指令
        show bds
        show databases
            -显示当前所有数据库
        use 数据库名
            -进入到指定的数据库中
        db
            -显示当前所处的数据库
        show collections
            -显示数据库中所有的集合


    -数据库的CRUD(正删改查)的操作
        db.< colletion(集合名) >. insert(doc(文档))
            -向集合中插入一个文档
            -例子:向test数据库中的，studs集合中插入新的一个学生对象(需要进入test数据库)
                {name:"张三",age:18,gender:"男"}
                db.studs.insert({name:"张三",age:18,gender:"男"})
        
        db.<collection>.find()
            -查询当前集合中的所有文档
            db.studs.find()
*/