import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello-word')
  getHello(): string {
    return this.appService.getHello();
  }
}
