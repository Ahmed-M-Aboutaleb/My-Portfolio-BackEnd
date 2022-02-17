import {
    Body,
    Controller,
    Post,
    Request,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/baseUser.dto';
import { MongoExceptionFilter } from 'src/auth/mongo-exception.filter';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    @Post('signup')
    @UseFilters(MongoExceptionFilter)
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
