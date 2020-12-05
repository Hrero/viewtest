import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './filter/not-found-exceptions.filter';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            envFilePath: path.resolve(`./static/env/${ process.env.NODE_ENV || 'development' }.env` ),
            isGlobal: true
        })
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter,
        },
    ],
})
export class AppModule {
}
