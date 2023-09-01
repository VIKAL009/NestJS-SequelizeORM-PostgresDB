import { Injectable } from '@nestjs/common';
// import { User, Module, Role } from '@prisma/client'


@Injectable()
export class UserService {
  constructor() {}

  async getByEmail(email: string): Promise<any | null> {
    // return this.prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    //   include: {
    //     roles: {
    //       select: {
    //         role: {
    //           select: {
    //             name: true,
    //             rolePermissions: {
    //               select: {
    //                 permission: {
    //                   select: {
    //                     name: true,
    //                   },
    //                 },
    //                 module: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // })
  }

  async getUserById(id: number): Promise<any | null> {
    // return this.prisma.user.findUnique({
    //   where: { id },
    // })
  }

  async getModulesById(moduleId: [number]): Promise<any| null> {
    // return this.prisma.module.findMany({
    //   select: { id: true, name: true },
    //   where: { id: { in: moduleId } },
    // })
  }

  async getAllModules(): Promise<any | null> {
    // return this.prisma.module.findMany({
    //   select: { id: true, name: true },
    // })
  }

  async getRoleByRoleId(roleId: number): Promise<any> {
    // return this.prisma.role.findUnique({
    //   where: { id: roleId },
    // })
  }
}
