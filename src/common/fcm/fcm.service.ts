import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'
import * as path from 'path'

@Injectable()
export class FcmService {
  constructor() {
    /*firebase.initializeApp({
      credential: firebase.credential.cert(
        path.join(__dirname, 'key', 'boilerplate-fcm-firebase-adminsdk-8cjz2-236adc8ceb.json'),
      ),
    });*/
  }

  async sendPushNotification(token: string, notification): Promise<any> {
    const response = await firebase.messaging().send({
      notification,
      token,
      //android: { priority: 'high' },
    })
    console.log(response)
    return response
  }
}
