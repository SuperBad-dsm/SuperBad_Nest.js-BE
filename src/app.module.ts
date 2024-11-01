import { Module } from '@nestjs/common';
import { ProductsModel } from './domain/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './domain/user/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TypeOrmModule.forRoot({
      //db type
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [ProductsModel],
      //nest js에서 작성하는 type orm 코드와 데이터베이스 자동으로 싱크를 맞출것인가.
      //개발 환경에서는 되어 있는 게 편하지만, 프로덕션 환경에서는 db 구조가 마음대로 바뀔 환경이 있어 false 해야함.
      synchronize: true,
    }),
  ],
})
export class AppModule {}
