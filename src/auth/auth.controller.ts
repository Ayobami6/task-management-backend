import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AccessTokenResponse } from './interfaces/jwt.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // inject the task service
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() credentialDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(credentialDto);
  }
  @Post('/signin')
  signIn(
    @Body() credentialDto: AuthCredentialsDto,
  ): Promise<AccessTokenResponse> {
    return this.authService.signIn(credentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req: string): string {
    console.log(req);
    return 'Testing';
  }
}
