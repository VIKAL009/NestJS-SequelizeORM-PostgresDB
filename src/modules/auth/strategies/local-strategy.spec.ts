import { UnauthorizedException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { LocalStrategy } from './local-strategy'
import { beforeEach } from 'node:test'
// import { User } from '@prisma/client'

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy
  let authService: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile()

    localStrategy = moduleRef.get<LocalStrategy>(LocalStrategy)
    authService = moduleRef.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(localStrategy).toBeDefined()
  })

  it('should validate and return user', async () => {
    const user: any = {
      id: 1,
      firstname: 'test',
      lastname: 's',
      email: 'test@example.com',
      password: '123456',
      salt: '12222222244444444',
      createdAt: null,
      updatedAt: null,
    }
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user)
    expect(await localStrategy.validate(user.email, user.password)).toEqual(user)
    expect(authService.validateUser).toHaveBeenCalledWith(user.email, user.password)
  })

  it('should throw an unauthorized exception', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null)
    await expect(localStrategy.validate('wrong@example.com', 'wrongpass')).rejects.toThrow(
      UnauthorizedException,
    )
    expect(authService.validateUser).toHaveBeenCalledWith('wrong@example.com', 'wrongpass')
  })
})
