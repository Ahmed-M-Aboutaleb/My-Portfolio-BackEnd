import { Injectable, UnauthorizedException } from '@nestjs/common';
import { isMatch } from 'src/functions/hashFunction';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user) {
            const matchPassword = await isMatch(password, user.password);
            if (matchPassword) {
                const { password, ...result } = user;
                return result;
            }
        } else {
            throw new UnauthorizedException();
        }
        return null;
    }
    async login(User: any) {
        const user = {
            id: User._doc._id.toHexString(),
            username: User._doc.username,
        };
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
