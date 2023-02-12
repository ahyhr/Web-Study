import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'nestdb',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true, // 是否自动将实体类同步到数据库
      retryDelay: 500, // 重连数据库间隔
      retryAttempts: 10, // 重连次数
      autoLoadEntities: true, // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
