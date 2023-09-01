import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  allMenuItems(): any {
    return 'Hello World!'
  }
}
