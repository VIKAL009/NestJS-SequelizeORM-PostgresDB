// device-platform.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const DevicePlatform = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.headers['x-device-platform']
})
