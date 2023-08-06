
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from 'src/user/user.service';
import { sign,verify } from "jsonwebtoken";
import {sign as signAsync,verify as verifyAsync} from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email as string);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateTokens(user:any){
    const {password:_,...payload} = user;
    const accessToken = sign(
      payload,
      process.env.ACCESS_SECRET,
      {
        expiresIn:process.env.ACCESS_SECRET_EXPIRES_IN
      }
    );
    // remove role from payload to generate refresh token
    const {role,...refreshTokenPayload} = payload;
    // refresh token sign
    const refreshToken = sign(
      refreshTokenPayload,
      process.env.REFRESH_SECRET,
      {
        expiresIn:process.env.REFRESH_SECRET_EXPIRES_IN
      }
    );
    return {accessToken,refreshToken};
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // check username, password here
    
    const payload = { sub: user._id, email: user.email, role: user.role };

    return this.generateTokens(payload);
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload =  verify(refreshToken,process.env.REFRESH_SECRET);
      const user = JSON.parse(payload as any);
      if(typeof user._id!=="string") throw new UnauthorizedException();
      const dbUser = await this.userService.findById(user.sub);
      return this.generateTokens(dbUser);
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

}
