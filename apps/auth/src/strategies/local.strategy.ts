import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { UserDocument } from '@app/database/schemas/user.schema';
import { validate } from 'class-validator';
import e from 'express';
import { SigninDto } from '../dto/signin.dto';
import { plainToInstance } from 'class-transformer';
import { HttpErrors } from '@app/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
    });
  }

  async validate(id: string, password: string): Promise<UserDocument> {
    const user = await this.authService.validateUser(id, password);
    if (!user)
      throw new UnauthorizedException({
        error_message: HttpErrors.BAD_CREDENTIALS,
      });
    return user;
  }

  async authenticate(req: e.Request, options?: any) {
    const body = plainToInstance(SigninDto, req.body);
    const errors = await validate(body, {});
    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );
    if (errorMessages.length > 0) {
      // return bad request if validation fails
      return req.res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: errorMessages,
      });
    }

    super.authenticate(req, options);
  }
}
