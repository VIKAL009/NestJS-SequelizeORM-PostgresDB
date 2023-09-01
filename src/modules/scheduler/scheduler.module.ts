import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { CronJobsService } from './cronJobs/cronjob.service'

@Module({
  controllers: [],
  providers: [CronJobsService],
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
