import { Body, Controller, Get, Post } from '@nestjs/common'
import { FcmService } from './fcm.service'
import { DevicePlatform } from '../decorators/device-platform.decorator'

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post('sendNotification')
  async sendNotification(@Body('token') token: string, @Body('message') message: string) {
    const payload = {
      title: 'Test Notification',
      body: message,
    }
    return await this.fcmService.sendPushNotification(token, payload)
  }
}
