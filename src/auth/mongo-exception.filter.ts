import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const duplicateErrorCode = 11000;
        switch (exception.code) {
            case duplicateErrorCode:
                const ctx = host.switchToHttp();
                const response = ctx.getResponse<Response>();
                response.status(HttpStatus.FORBIDDEN).json({
                    statusCode: HttpStatus.FORBIDDEN,
                    message: 'There is user with that username',
                    error: true,
                });
        }
    }
}
