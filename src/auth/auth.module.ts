import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';

const jwtOptions = {
    /**
     * Async loading for jwt secret from env variables it
     * if we load it without async it will give empty secret key error
     * * CHANGE JWT_SECRET TO YOUR ENV VARIABLE JWT SECRET NAME
     */

    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        return {
            secret: configService.get<string>('JWT_SECRET'),
        };
    },
    inject: [ConfigService],
};

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync(jwtOptions),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
