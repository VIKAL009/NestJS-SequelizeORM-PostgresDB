import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class RedisEvents {
  constructor() {}

  @OnEvent('REDIS_SET')
  handleRedisGetEvent(payload: any) {
    console.log('payload_redis_set:', payload)
  }
}
