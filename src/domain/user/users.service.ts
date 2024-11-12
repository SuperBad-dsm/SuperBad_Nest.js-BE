import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from 'src/domain/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async findOne(userId: string) {
    return this.usersRepository.findOne({ where: { userId } });
  }

  async createUser(userId: string, password: string, nickname: string) {
    const newUser = this.usersRepository.create({
      userId,
      password,
      nickname,
    });
    return this.usersRepository.save(newUser);
  }

  async findOneWithProducts(userId: string) {
    return this.usersRepository.findOne({
      where: { userId },
      relations: ['products'],
    });
  }
}
