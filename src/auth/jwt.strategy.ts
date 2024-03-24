import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { JwtPayload } from './interfaces/jwt.interface';
import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //   Dependency Injection
  constructor(@Inject(DataSource) private dataSource: DataSource) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  //   validate
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { username: username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
