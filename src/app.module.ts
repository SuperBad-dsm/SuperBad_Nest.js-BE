import { Module } from '@nestjs/common';
import { ProductsModel } from './domain/entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domain/user/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModel } from './domain/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Inging2514!',
      database: 'superbad',
      entities: [UsersModel, ProductsModel],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
