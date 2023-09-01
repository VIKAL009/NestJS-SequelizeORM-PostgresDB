import { Module } from '@nestjs/common';
import { ConfigService } from './config.service'; // Replace with the correct path to ConfigService

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Make sure to export ConfigService
})
export class ConfigModule {}
