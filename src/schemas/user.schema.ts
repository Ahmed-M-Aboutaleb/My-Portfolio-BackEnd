import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;
    @Prop({ type: String, required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
