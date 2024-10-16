import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message';
import { Idea } from './entities/idea';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT,10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      Message,
      Idea
    ],
    autoLoadEntities: true,
    synchronize: process.env.APP_ENV !== "production",
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}