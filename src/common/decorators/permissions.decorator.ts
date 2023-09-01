import { SetMetadata } from '@nestjs/common'
import { Permission } from '../enum/permissions.enum'

export const Permissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions)
