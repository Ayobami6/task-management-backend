import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './auth.entity';
import { authRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenResponse, JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: AuthCredentialsDto): Promise<User> {
    return authRepository.createUser(userDto);
  }

  async signIn(userDto: AuthCredentialsDto): Promise<AccessTokenResponse> {
    const { username, password } = userDto;
    const user = await authRepository.findOne({
      where: { username: username },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
