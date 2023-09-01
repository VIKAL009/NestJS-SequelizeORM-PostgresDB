import { Test, TestingModule } from '@nestjs/testing'
import { UserPreferanceController } from './user-preferance.controller'
import { UserPreferanceService } from './user-preferance.service'

describe('UserPreferanceController', () => {
  let controller: UserPreferanceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPreferanceController],
      providers: [UserPreferanceService],
    }).compile()

    controller = module.get<UserPreferanceController>(UserPreferanceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
