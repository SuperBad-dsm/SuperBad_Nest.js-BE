import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domain/user/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersModel } from './domain/entities/users.entity';
import { ProductsModel } from './domain/entities/products.entity';
import { ProductsModule } from './domain/product/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [UsersModel, ProductsModel],
        synchronize: true,
      }),
    }),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
