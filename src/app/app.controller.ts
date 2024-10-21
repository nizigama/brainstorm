import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {

  }

  @HttpCode(HttpStatus.OK)
  @Delete('reset')
  async resetHistory(@Session() session: Record<string, any>){    
    await this.appService.resetEverything(session.userId)
  }
}
