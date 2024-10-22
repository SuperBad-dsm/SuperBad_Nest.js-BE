import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MysqlSequelizeModule } from './mysql_sequelize/mysql_sequelize.module';

@Module({
  imports: [PostsModule, UserModule, PostModule, MysqlSequelizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
