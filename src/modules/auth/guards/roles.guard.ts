import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permission } from '../../../common/enum/permissions.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler())
    const module = this.reflector.get<string>('module', context.getClass())
    const request = context.switchToHttp().getRequest()

    if (request?.user) {
      //CHECK ROLES FROM REDIS IS PENDING

      console.log(request?.user)
      if (!permissions) {
        return request.user.roles.some((role: string) => roles.includes(role['roleName']))
      }
      //console.log(request.user.roles[0]['permissions'])
      if (module) {
        return request.user.roles.some((role) => {
          return (
            roles.includes(role['roleName']) &&
            role.permissions.some(
              (permission) =>
                (permissions.includes(permission.permissionName) ||
                  permission.permissionName == Permission.ALL) &&
                permission.modules.includes(module),
            )
          )
        })
      }

      return request.user.roles.some((role) => {
        return (
          roles.includes(role['roleName']) &&
          role.permissions.some(
            (permission) =>
              permissions.includes(permission.permissionName) ||
              permission.permissionName == Permission.ALL,
          )
        )
      })
    }

    return false
  }
}
