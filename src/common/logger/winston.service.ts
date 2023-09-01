import { Injectable } from '@nestjs/common'
import * as path from 'path'
import { ChildProcess, fork } from 'child_process'

@Injectable()
export class WinstonService {
  private readonly childProcessFilename: string

  constructor() {
    this.childProcessFilename = './winston.child-process'
  }

  forkChildProcess(): ChildProcess {
    return fork(path.resolve(__dirname, this.childProcessFilename))
  }

  log(message: any) {
    this.forkChildProcess().send({ message, type: 'info' })
  }

  error(message: any) {
    this.forkChildProcess().send({ message, type: 'error' })
  }
}
