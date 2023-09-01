import { RefreshJwtStrategy } from './refresh-token-strategy'
import { Test } from '@nestjs/testing'

describe('RefreshJwtStrategy', () => {
  let refreshJwtStrategy: RefreshJwtStrategy

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RefreshJwtStrategy],
    }).compile()

    refreshJwtStrategy = moduleRef.get<RefreshJwtStrategy>(RefreshJwtStrategy)
  })

  it('should be defined', () => {
    expect(refreshJwtStrategy).toBeDefined()
  })

  it('should validate and return user id', async () => {
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

    expect(await refreshJwtStrategy.validate(payload)).toEqual({
      userId: payload.sub,
      roles: payload.roles,
    })
  })
})
