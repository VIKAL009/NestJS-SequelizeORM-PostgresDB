import { Test, TestingModule } from '@nestjs/testing'
import { UserPreferanceService } from './user-preferance.service'

describe('UserPreferanceService', () => {
  let service: UserPreferanceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPreferanceService],
    }).compile()

    service = module.get<UserPreferanceService>(UserPreferanceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
