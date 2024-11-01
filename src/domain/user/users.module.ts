import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from '../entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]), // UsersModel 머시꺵이
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
