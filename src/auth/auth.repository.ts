import { User } from './auth.entity';
import { appDatasource } from '../tasks/app.datasource';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
export const authRepository = appDatasource.getRepository(User).extend({
  async createUser(createUserDto: AuthCredentialsDto): Promise<User> {
    // @ts-ignore
    const logger = new Logger('AuthRepository CreateUser Method', true);
    const { username, password } = createUserDto;
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.code == 23505) {
        logger.error(error.message, error.stack);
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
