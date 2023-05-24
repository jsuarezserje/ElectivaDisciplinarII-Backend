import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UsersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.UsersRepository.findOne({
      where: { email: createUserDto.email },
    }).then((email) => {
      if (email) return 'el email ya existe';
    });

    hash(createUserDto.password, 10).then((password) => {
      const data = this.UsersRepository.create({ ...createUserDto, password });
      this.UsersRepository.save(data);
      return 'se a registado correctamente';
    });
  }

  async login(user: LoginUserDto) {
    const { email, password } = user;
    const findUser = await this.UsersRepository.findOne({ where: { email } });

    if (!findUser) return 'el email o la passwor es incorrecta';

    const checkPass = await compare(password, findUser.password);

    if (!checkPass) return 'el email o la passwor es incorrecta';

    const data = findUser;
    return data;
  }

  findAll() {
    return this.UsersRepository.find();
  }

  findOne(id: number) {
    return this.UsersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashPass = await hash(updateUserDto.password, 10);
    return this.UsersRepository.update(
      { id },
      { ...updateUserDto, password: hashPass },
    );
  }

  remove(id: number) {
    return this.UsersRepository.delete({ id });
  }
}
