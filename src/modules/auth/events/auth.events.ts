import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { EVENTS } from '../../../common/constants/event.constants'

@Injectable()
export class AuthEvents {
  constructor() {}

  @OnEvent(EVENTS.USER_CREATED)
  handleUserCreatedEvent(payload: any) {
    console.log('payload:', payload)
  }
}
