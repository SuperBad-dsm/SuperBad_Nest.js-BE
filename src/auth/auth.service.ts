import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/domain/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userId: string, password: string, nickname: string) {
    const userExists = await this.usersService.findOne(userId);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser(userId, hashedPassword, nickname);
  }

  async login(userId: string, password: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { userId: user.userId };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}