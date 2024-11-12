import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/global/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('myInfo')
  async getProfile(@Request() req: any) {
    const userId = req.user.userId;
    return this.usersService.findOne(userId);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.findOneWithProducts(userId);
  }
}
