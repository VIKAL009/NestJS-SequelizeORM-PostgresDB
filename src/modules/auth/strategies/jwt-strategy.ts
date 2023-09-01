import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { appConfig } from 'src/app.config'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${appConfig.jwtSecret}`,
    })
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, roles: payload.roles, permissions: payload.permissions }
  }
}
