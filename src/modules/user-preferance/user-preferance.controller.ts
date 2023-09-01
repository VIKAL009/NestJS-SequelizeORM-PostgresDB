import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express'; // Import Request from express
import { UserPreferenceDto, UserPreferenceRequestDto } from './user-preferance.dto';
import { UserPreferanceService } from './user-preferance.service';

@Controller('user-preferance')
export class UserPreferanceController {
  constructor(private readonly userPreferanceService: UserPreferanceService) {}
  @Post('/userPreferance')
  async getUserPreferance(@Req() req: Request,@Body() userPreferenceDto: UserPreferenceRequestDto) {
    const authorizationHeader : string = req.headers['authorization'];
    const data = await this.userPreferanceService.getUserPreferance(userPreferenceDto,authorizationHeader)
    if (data !== null) {
      return { status: HttpStatus.OK, message: 'success', data: data }
    } else {
      return { status: HttpStatus.UNAUTHORIZED, message: 'Error to fecth user preference' }
    }
  }

  @Post('/favoriteMenu')
  // @Body('id', ParseIntPipe): Captures the 'id' parameter from the request body and parses it as an integer using ParseIntPipe
  async postFavoriteMenu(@Req() req: Request,@Body() userPreferenceDto: UserPreferenceDto) {
    const authorizationHeader : string = req.headers['authorization'];
    const { username, preferencesMenu , tenantId} = userPreferenceDto
    // Call the 'postFavoriteMenu' method of the 'UserPreferanceService' to update the user's favorite menu preferences
    const res = await this.userPreferanceService.postFavoriteMenu(userPreferenceDto,authorizationHeader)
    if (res != null) {
      return {
        status: HttpStatus.OK,
        message: 'User preference data updated successfully',
        data: res,
      }
    } else {
      return { status: HttpStatus.UNAUTHORIZED, message: 'Error updating user preference' }
    }
  }
}
