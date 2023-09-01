import { SetMetadata } from '@nestjs/common'

export const PermissionModule = (moduleName: string) => SetMetadata('module', moduleName)
