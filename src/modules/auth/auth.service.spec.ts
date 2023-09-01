import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'
import { SignupDto } from './dto/signup.dto'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { I18nService, I18nContext } from 'nestjs-i18n'
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'
import { Permission } from '../../common/enum/permissions.enum'

describe('Authentication Service', () => {
  let authService: AuthService
  let prismaService: PrismaService
  let userService: UserService
  let jwtService: JwtService
  let eventEmitter: EventEmitter2
  let i18nService: I18nService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
            rolePermission: { createMany: jest.fn() },
            permission: { findMany: jest.fn() },
            module: { findMany: jest.fn() },
            userRole: { create: jest.fn() },
            $transaction: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn(),
            getRoleByRoleId: jest.fn(),
            getModulesById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: I18nService,
          useValue: {
            translate: jest.fn(),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    prismaService = module.get<PrismaService>(PrismaService)
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService)
    eventEmitter = module.get<EventEmitter2>(EventEmitter2)
    i18nService = module.get<I18nService>(I18nService)
  })

  describe('createUser', () => {
    const signupDto: SignupDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 1,
    }

    it('should create a new user and return signup data', async () => {
      jest.spyOn(userService, 'getByEmail').mockResolvedValueOnce(null)
      jest
        .spyOn(userService, 'getRoleByRoleId')
        .mockResolvedValue({ id: 1, name: 'USER', createdAt: null, updatedAt: null })

      jest.spyOn(prismaService, '$transaction').mockResolvedValue(signupDto)
      jest
        .spyOn(prismaService.permission, 'findMany')
        .mockResolvedValue([{ id: 1, name: 'ALL', createdAt: null, updatedAt: null }])
      jest
        .spyOn(prismaService.module, 'findMany')
        .mockResolvedValue([{ id: 1, name: 'USER', createdAt: null, updatedAt: null }])

      jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce({
        id: 1,
        salt: expect.any(String),
        createdAt: null,
        updatedAt: null,
        ...signupDto,
      })

      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('access-token')
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('refresh-token')

      const result = await authService.createUser(signupDto)

      expect(result).toEqual({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      })

      expect(eventEmitter.emit).toHaveBeenCalled()
    })

    it('should throw ConflictException if user already exists', async () => {
      jest
        .spyOn(userService, 'getByEmail')
        .mockResolvedValue({ ...signupDto, id: 1, salt: 'salt', createdAt: null, updatedAt: null })
      jest.spyOn(i18nService, 'translate').mockReturnValue('User already exists!')
      jest.spyOn(I18nContext, 'current').mockReturnValue({ lang: 'en' } as any)
      await expect(authService.createUser(signupDto)).rejects.toThrow(
        new ConflictException('User already exists!'),
      )
    })

    it('should throw BadRequestException for invalid role', async () => {
      signupDto.role = 10000
      jest.spyOn(userService, 'getByEmail').mockResolvedValue(null)
      jest.spyOn(userService, 'getRoleByRoleId').mockResolvedValue(null)
      await expect(authService.createUser(signupDto)).rejects.toThrow(
        new BadRequestException('Invalid role'),
      )
    })
  })

  describe('login', () => {
    const signupDto: SignupDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 1,
    }

    it('should return access and refresh tokens', async () => {
      const payload = { sub: 1 }
      const mockTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' }
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('access-token')
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('refresh-token')

      const result = await authService.login({
        ...signupDto,
        id: 1,
        password: expect.any(String),
        salt: expect.any(String),
        createdAt: null,
        updatedAt: null,
      })

      expect(jwtService.sign).toHaveBeenCalledWith(payload)
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: expect.anything() })
      expect(result).toEqual(mockTokens)
    })
  })

  describe('refresh', () => {
    const signupDto: SignupDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 1,
    }

    it('should return access and refresh tokens', async () => {
      const payload = { sub: 1 }
      const mockTokens = { accessToken: 'access-token', refreshToken: 'refresh-token' }
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('access-token')
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('refresh-token')

      const result = await authService.login({
        ...signupDto,
        id: 1,
        password: expect.any(String),
        salt: expect.any(String),
        createdAt: null,
        updatedAt: null,
      })

      expect(jwtService.sign).toHaveBeenCalledWith(payload)
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: expect.anything() })
      expect(result).toEqual(mockTokens)
    })
  })

  describe('validateUser', () => {
    const signupDto: SignupDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 1,
    }

    it('should return the user object when valid email and password are provided', async () => {
      const mockEmail = 'john.doe@example.com'
      const mockPassword = 'password'
      const mockUser = {
        email: mockEmail,
        password: 'password',
        salt: 'salt',
        roles: [
          {
            role: {
              name: 'USER',
              rolePermissions: [
                {
                  permission: {
                    name: Permission.ALL,
                  },
                  module: [2],
                },
              ],
            },
          },
        ],
      }

      jest.spyOn(userService, 'getByEmail').mockResolvedValue({
        id: 1,
        createdAt: null,
        updatedAt: null,
        ...signupDto,
        salt: mockUser.salt,
        roles: mockUser.roles,
      })
      jest.spyOn(authService, 'hashData').mockReturnValueOnce(mockUser.password)
      jest.spyOn(userService, 'getModulesById').mockResolvedValueOnce([
        {
          id: 2,
          name: 'USER',
        },
      ])

      const result = await authService.validateUser(mockEmail, mockPassword)
      expect(userService.getByEmail).toHaveBeenCalledWith(mockEmail)
      expect(authService.hashData).toHaveBeenCalledWith(mockPassword, mockUser.salt)
      expect(userService.getModulesById).toHaveBeenCalledWith([2])
      expect(result).toEqual({
        id: 1,
        createdAt: null,
        updatedAt: null,
        ...signupDto,
        salt: mockUser.salt,
        roles: [
          {
            roleName: 'USER',
            permissions: [
              {
                permissionName: Permission.ALL,
                modules: ['USER'],
              },
            ],
          },
        ],
      })
    })

    it('should return null when user is not found', async () => {
      const mockEmail = 'john.doe@example.com'
      const mockPassword = 'password'

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(null)
      const result = await authService.validateUser(mockEmail, mockPassword)
      expect(userService.getByEmail).toHaveBeenCalledWith(mockEmail)
      expect(result).toBeNull()
    })
  })
})
