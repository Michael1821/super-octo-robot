import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDataDto } from '@app/common/dto/user-data.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req): UserDataDto {
    return this.authService.getUser(req.user);
  }
  @Post('signup')
  signUp(@Body() dto: SignupDto): Promise<UserDataDto & { token: string }> {
    return this.authService.createUser(dto);
  }
  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signIn(@Req() req): string {
    return this.authService.generateToken(req.user);
  }
}
