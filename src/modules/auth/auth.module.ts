import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { appConfig } from 'src/app.config'
import { WinstonModule } from '../../common/logger/winston.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthEvents } from './events/auth.events'
import { JwtStrategy } from './strategies/jwt-strategy'
import { LocalStrategy } from './strategies/local-strategy'
import { RefreshJwtStrategy } from './strategies/refresh-token-strategy'
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshJwtStrategy, AuthEvents],

  imports: [
    UserModule,
    WinstonModule,
    JwtModule.register({
      secret: `${appConfig.jwtSecret}`,
      signOptions: { expiresIn: `${appConfig.JwtAccessTokerExpiry}` },
    }),
  ],
})
export class AuthModule {}
