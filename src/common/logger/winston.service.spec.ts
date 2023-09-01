import { Test, TestingModule } from '@nestjs/testing'
import { WinstonService } from './winston.service'

describe('WinstonService', () => {
  let service: WinstonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinstonService],
    }).compile()

    service = module.get<WinstonService>(WinstonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
