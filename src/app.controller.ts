import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller handle request and response over http protocols, Uses dependency injection from service
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
