import { JwtStrategy } from './jwt-strategy'
import { Test } from '@nestjs/testing'

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile()

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy)
  })

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined()
  })

  it('should validate and return user id and roles', async () => {
    const payload = {
      sub: '1',
      roles: [
        {
          roleName: 'USER',
          permissions: [
            {
              permissionName: 'ALL',
              modules: ['USER'],
            },
          ],
        },
      ],
    }
    expect(await jwtStrategy.validate(payload)).toEqual({
      userId: payload.sub,
      roles: payload.roles,
    })
  })
})
