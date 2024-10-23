import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';

import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
