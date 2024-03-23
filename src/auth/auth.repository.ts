import { User } from './auth.entity';
import { appDatasource } from '../tasks/app.datasource';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

export const authRepository = appDatasource.getRepository(User).extend({
  async createUser(createUserDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = createUserDto;
    const user = this.create({
      username,
      password,
    });
    await this.save(user);
    return user;
  },
});
