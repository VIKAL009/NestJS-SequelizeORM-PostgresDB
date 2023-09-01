import { Module } from '@nestjs/common';
import { userPreferencesProviders } from 'src/modules/user-preferance/user-preferance.provider';
import { DatabaseModule } from './../../database/database.module';
import { UserPreferanceController } from './user-preferance.controller';
import { UserPreferanceService } from './user-preferance.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserPreferanceController],
  providers: [UserPreferanceService, ...userPreferencesProviders],
  exports: [UserPreferanceService],   
})
export class UserPreferanceModule {}
