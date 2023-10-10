import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/database/schemas/user.schema';
import { Model } from 'mongoose';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserDataDto } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(dto: SignupDto) {
    const hashedPassport = await hash(dto.password);
    const user = new this.userModel({
      password: hashedPassport,
    });
    await user.save();

    const token = this.generateToken(user);
    return {
      id: user._id,
      token,
    };
  }

  getUser(user: UserDataDto) {
    return user;
  }

  async validateUser(id: string, password: string) {
    const user = await this.userModel.findOne({ _id: id });

    const isValid = await verify(user.password, password);
    if (!isValid) return false;

    return user;
  }

  generateToken(user: UserDocument): string {
    return this.jwtService.sign({ id: user._id });
  }
}
