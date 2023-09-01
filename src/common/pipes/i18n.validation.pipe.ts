// i18n-validation.pipe.ts
import { BadRequestException, Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class I18nValidationPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException(await this.formatErrors(errors))
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  private async formatErrors(errors) {
    return Promise.all(
      errors.map(async (error) => {
        for (const [constraint, message] of Object.entries(error.constraints)) {
          if (typeof message === 'string' && message.startsWith('validation.')) {
            const lang = 'fr' // replace with the desired language or language resolution logic
            error.constraints[constraint] = await this.i18n.translate(message, { lang })
          }
        }
        return error
      }),
    )
  }
}
