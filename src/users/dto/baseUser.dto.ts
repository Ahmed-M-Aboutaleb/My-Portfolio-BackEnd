import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @Length(1, 15)
    @IsString()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
