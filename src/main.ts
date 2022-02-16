import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
    const corsOptions = {
        origin: /https?:\/\/(([^/]+\.)?iifire\.xyz)$/i,
        credentials: true,
    };
    const app = await NestFactory.create(AppModule);
    3;
    app.enableCors(corsOptions);
    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.use(csurf());
    await app.listen(3000);
}
bootstrap();
