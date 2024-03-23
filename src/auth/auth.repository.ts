import { User } from './auth.entity';
import { appDatasource } from '../tasks/app.datasource';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export const authRepository = appDatasource.getRepository(User).extend({
  async createUser(createUserDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = createUserDto;
    const user = this.create({
      username,
      password,
    });
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code == 23505) {
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  },
});
