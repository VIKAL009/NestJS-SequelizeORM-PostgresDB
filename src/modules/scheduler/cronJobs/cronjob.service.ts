// cron-jobs.ts

import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class CronJobsService {
  @Cron(CronExpression.EVERY_30_MINUTES)
  job1() {
    console.log('cron jobs every 30 minutes')
  }
}
