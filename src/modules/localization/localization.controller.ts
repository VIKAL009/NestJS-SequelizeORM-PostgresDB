import { Controller, Get, Param } from '@nestjs/common'
import { LocalizationService } from './localization.service'
@Controller('localization')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}
  // GET request handler for the route '/localization/language/:key'
  // @Param('key'): Captures the 'key' parameter from the URL path
  @Get('/language/:key')
  async getLangOptions(@Param('key') langkey: string) {
    // Call the service method to get language options based on the 'langkey'
    return await this.localizationService.getLangOptions(langkey)
  }
}
