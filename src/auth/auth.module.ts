import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/domain/user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'keykeykeyfmfgksrnrdjfhgkausdufthl',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController, JwtStrategy],
  providers: [AuthService],
})
export class AuthModule {}
