import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/functions/hashFunction';
import { User, userDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/baseUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<userDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const password = createUserDto.password;
        const hash = await hashPassword(password);
        createUserDto.password = hash;
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({ username: username });
    }
}
