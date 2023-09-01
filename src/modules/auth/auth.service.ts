import {
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { JwtService } from '@nestjs/jwt'
// import { User } from '@prisma/client'
import * as crypto from 'crypto'
// import { I18nContext, I18nService } from 'nestjs-i18n'
import { ModuleType } from '../../common/enum/modules.enum'
import { Permission } from '../../common/enum/permissions.enum'
// import { PrismaService } from '../prisma/prisma.service'
// import { UserService } from '../user/user.service'
import { appConfig } from './../../app.config'
import { SignupDto } from './dto/signup.dto'
import { AccessTokens } from './types/access-tokens.type'

@Injectable()
export class AuthService {
  constructor(
    // private readonly prisma: PrismaService,
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
    // private i18nS: I18nService,
  ) {}

  public async createUser(requestUser: SignupDto): Promise<SignupType> {
    // const userExists = await this.userService.getByEmail(requestUser.email)

    // if (userExists) {
    //   throw new ConflictException(
    //     this.i18nS.translate('user.USER_EXISTS', { lang: I18nContext.current().lang }),
    //   )
    // }

    // const role = await this.userService.getRoleByRoleId(requestUser.role)

    // if (!role) {
    //   throw new BadRequestException('Invalid role')
    // }

    try {
      const permissions: string[] = [Permission.ALL]
      const modules: string[] = [ModuleType.USER]
      const salt: string = crypto.randomBytes(16).toString('hex')
      // const password: string = this.hashData(requestUser.password, salt)

      // const createdUser = await this.prisma.$transaction(async (prisma) => {
        delete requestUser.role
        // const user = await prisma.user.create({ data: { ...requestUser, salt, password } })

        // const permission = await prisma.permission.findMany({
        //   select: { id: true },
        //   where: { name: { in: permissions } },
        // })

        // const modulesObj = await prisma.module.findMany({
        //   select: { id: true },
        //   where: { name: { in: modules } },
        // })

        // let modulesIdArr = modulesObj.map((m) => m.id)

        // const permissionsWithRoleId = permission.map((permission) => ({
        //   permission_id: permission.id,
        //   role_id: role.id,
        //   module: modulesIdArr,
        // }))

        // if (role) {
        //   await prisma.userRole.create({
        //     data: {
        //       user_id: user.id,
        //       role_id: role.id,
        //     },
        //   })
        // }

        // await prisma.rolePermission.createMany({
        //   data: permissionsWithRoleId,
        // })

        // return user
      // })
// 
      // const { id, firstname, lastname, email } = createdUser
      // const payload = {
      //   sub: id,
      // }

      // this.eventEmitter.emit(EVENTS.USER_CREATED, {
      //   userId: payload.sub,
      //   firstname,
      //   lastname,
      //   email,
      // })
      return {firstname: requestUser.firstname, lastname : requestUser.lastname, email: requestUser.email, accessToken: null, refreshToken:null}
      // return {
      //   firstname,
      //   lastname,
      //   email,
      //   accessToken: this.jwtService.sign(payload),
      //   refreshToken: this.jwtService.sign(payload, {
      //     expiresIn: `${appConfig.JwtRefreshTokenExpiry}`,
      //   }),
      // }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  hashData(data: string, salt: string): string {
    return crypto.pbkdf2Sync(data, salt, 1000, 64, `sha512`).toString(`hex`)
  }

  async validateUser(email: string, password: string) {
    // const user = await this.userService.getByEmail(email)

  //   if (user && this.hashData(password, user.salt) == user.password) {
  //     const permissions = <[number]>(
  //       user['roles'].flatMap((userRole) =>
  //         userRole.role.rolePermissions.flatMap((rp) => rp.module),
  //       )
  //     )

  //     const modules = await this.userService.getModulesById(permissions)

  //     const moduleIdNameMap = {}
  //     modules.forEach((module) => {
  //       moduleIdNameMap[module.id] = module.name
  //     })

  //     user['roles'] = user['roles'].map((userRole) => {
  //       return {
  //         roleName: userRole.role.name,
  //         permissions: userRole.role.rolePermissions.map((rp) => {
  //           return {
  //             permissionName: rp.permission.name,
  //             modules: [...rp.module].map((mo) => moduleIdNameMap[mo]),
  //           }
  //         }),
  //       }
  //     })
  //     return user
  //   }

  //   return null
  // }
  return true
  }

  async login(user: any): Promise<AccessTokens> {
    //console.log(user['roles'])
    const payload = {
      sub: user.id,
      roles: user['roles'],
      permissions: user['permissions'],
    }

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: `${appConfig.JwtRefreshTokenExpiry}`,
      }),
    }
  }

  async refreshToken(user): Promise<AccessTokens> {
    const payload = {
      sub: user.userId,
      roles: user['roles'],
      permissions: user['permissions'],
    }

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: `${appConfig.JwtAccessTokerExpiry}}`,
      }),
    }
  }

  async profile(email) {
    // const user = await this.userService.getByEmail(email)
    //console.log(user)
  }
}
