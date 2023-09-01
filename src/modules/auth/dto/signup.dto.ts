import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export class SignupDto {
  @ApiProperty({
    example: 'Jhon',
  })
  @IsNotEmpty()
  //@IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  firstname: string

  @ApiProperty({
    example: 'Doe',
  })
  lastname: string

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'password',
  })
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: 'role',
  })
  @IsNotEmpty()
  role: number
}
