import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator'
export class UserPreferenceDto {
  @ApiProperty({
    example: 1,
  })  
  @IsNotEmpty()
  @Type(() => String)
  username: string

  @IsString()
  preferencesMenu: string

  
  @IsNotEmpty()
  tenantId: string

  @IsEmpty()
  darkTheme: boolean
  
  @IsEmpty()
  @IsString()
  colorScheme:string

  @IsString()
  userRole:string

  @IsString()
  label:string

  @IsString()
  parent:string

  @IsString()
  icon:string

  @IsString()
  path:string

  @IsString()
  type:string

}

export class UserPreferenceRequestDto {
  @ApiProperty({
    example: 1,
  })  
  @IsNotEmpty()
  @Type(() => String)
  username: string

 
  
  @IsNotEmpty()
  tenantId: string


}