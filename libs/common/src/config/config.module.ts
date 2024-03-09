import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigureModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigureModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
