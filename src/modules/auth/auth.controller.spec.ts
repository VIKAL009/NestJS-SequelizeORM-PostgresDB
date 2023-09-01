import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { HttpStatus, InternalServerErrorException } from '@nestjs/common'
import { WinstonService } from '../../common/logger/winston.service'

// This is a mock for the AuthService.
const mockAuthService = () => ({
  login: jest.fn(),
  createUser: jest.fn(),
  refreshToken: jest.fn(),
})

const mockWinstonService = () => ({
  error: jest.fn(),
  log: jest.fn(),
})

describe('AuthController', () => {
  let authController: AuthController
  let authService: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useFactory: mockAuthService },
        { provide: WinstonService, useFactory: mockWinstonService },
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('should call AuthService createUser method and return the result', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'password',
      firstname: 'test',
      lastname: 'test',
      role: 1,
    }
    const mockResult = {
      firstname: 'test',
      lastname: 'test',
      email: 'test@test.com',
      accessToken: 'mockToken',
      refreshToken: 'mockRefreshToken',
    }

    authService.createUser.mockResolvedValue(mockResult)

    expect(await authController.signUp(mockUser)).toBe(mockResult)
    expect(authService.createUser).toHaveBeenCalledWith(mockUser)
  })

  it('should throw an error if createUser throws an InternalServerErrorException', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'password',
      firstname: 'test',
      lastname: 'test',
      role: 1,
    }

    authService.createUser.mockImplementation(() => {
      throw new InternalServerErrorException()
    })

    await expect(authController.signUp(mockUser)).rejects.toThrow(InternalServerErrorException)
    expect(authService.createUser).toHaveBeenCalledWith(mockUser)
  })

  it('should call AuthService login method and return the result', async () => {
    const mockUser = { email: 'test', password: 'password' }
    const mockRequest = { user: mockUser }
    const mockResult = { accessToken: 'mockToken', refreshToken: 'mockRefreshToken' }

    authService.login.mockResolvedValue(mockResult)

    expect(await authController.login(mockRequest, mockUser)).toBe(mockResult)
    expect(authService.login).toHaveBeenCalledWith(mockUser)
  })

  it('should call AuthService refreshToken method and return the result', async () => {
    const mockUser = { userId: 1 }
    const mockRequest = { user: mockUser }
    const mockResult = {
      accessToken: 'newMockToken',
      refreshToken: 'newMockRefreshToken',
    }

    authService.refreshToken.mockResolvedValue(mockResult)

    expect(await authController.refreshToken(mockRequest)).toBe(mockResult)
    expect(authService.refreshToken).toHaveBeenCalledWith(mockUser)
  })
})
