import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { JwtPayload } from './interfaces/jwt.interface';
import { User } from './auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //   Dependency Injection
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
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
