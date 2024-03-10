1 . Install mongoose

```bash
    npm i @nestjs/mongoose mongoose
```

2. Install nestjs config

```bash
    npm i @nestjs/config
```

3. New configure database on common

```bash
    nest generate module database -p common
```

then

```bash
    nest generate module config -p common
```

update on config.module.ts

```ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigureModule } from '@nestjs/config';

@Module({
  imports: [NestConfigureModule.forRoot()],
})
export class ConfigModule {}
```

then remove common module, service and controller
then update database module

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:<password>@<host>:<ip>/<database>',
    ),
  ],
})
export class DatabaseModule {}
```

then update on index.ts

```ts
export * from './database/database.module';
export * from './config/config.module';
```

import database module on app module

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

why database module import on **_@app/common_**? can you check on **_tsconfig.json_**

RUN

```bash
  yarn start:dev
```

to check mongoose initilize success on log commands then
![success](image.png)

To the feature to easy maintain and develop on feature can we need to configure env variable

```bash
  touch .env.example
```

Edit and new DATABASE_URI on .env.example file then copy file to rename is .env

```bash
  nano .env.example
```

![env example](image-1.png)

install joi to config validate object

```
npm i joi
```

Because we need use variable so can not to check the DATABASE URI, so we will update and check connect success

```ts
// in database.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

```ts
// in Config Module
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
```
DATABASE_URI=mongodb+srv://root:mypassword@localhost.ed4pplj.mongodb.net/