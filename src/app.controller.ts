import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('a')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/b')
  getHello(): string {
    return this.appService.getHello()
  }

  @Get()
  allMenuItems(): any {
    return this.appService.allMenuItems()
  }
}
