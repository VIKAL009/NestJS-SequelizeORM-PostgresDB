import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AccessTokens } from './types/access-tokens.type'
import { RefreshJwtAuthGuard } from './guards/jwt-refresh-auth.guard'
import { WinstonService } from '../../common/logger/winston.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from './guards/roles.guard'
import { RoleTypes } from '../user/enum/roles.enum'
import { I18nValidationExceptionFilter } from 'nestjs-i18n'
import { Permissions } from '../../common/decorators/permissions.decorator'
import { Permission } from '../../common/enum/permissions.enum'
import { PermissionModule } from '../../common/decorators/module.decorator'
import { ModuleType } from '../../common/enum/modules.enum'

@ApiTags('Authentication')
@PermissionModule(ModuleType.USER)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logger: WinstonService,
  ) {}

  //@UseFilters(new I18nValidationExceptionFilter())
  @Post('signup')
  async signUp(@Body() user: SignupDto): Promise<SignupType> {
    return await this.authService.createUser(user)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() logindto: LoginDto): Promise<AccessTokens> {
    return await this.authService.login(req.user)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Request() req: any): Promise<AccessTokens> {
    return await this.authService.refreshToken(req.user)
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleTypes.USER)
  @Permissions(Permission.ALL)
  async profile(@Request() req: any) {
    //this.logger.error('how is it');
    this.logger.log(req.user)
    //console.log(req.user);
    return
    //return await this.authService.profile('s.reshman@gmail.com');
  }

  @Get('permissions')
  @Permissions(Permission.READ)
  async getPermissions() {}
}
