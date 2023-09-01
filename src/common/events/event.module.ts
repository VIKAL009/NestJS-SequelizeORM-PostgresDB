import { Module } from '@nestjs/common'
import { RedisEvents } from './event-redis.service'

@Module({
  providers: [RedisEvents],
})
export class EventModule {}
