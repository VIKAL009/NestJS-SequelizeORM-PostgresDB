import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from 'kafkajs'
import { appConfig } from 'src/app.config'

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect()
    }
  }

  private readonly kafka = new Kafka({
    brokers: [`${appConfig.kafkaServer}:${appConfig.kafkaPort}`],
  })

  private readonly consumers: Consumer[] = []

  async consume(groupId: string, topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer: Consumer = this.kafka.consumer({ groupId })
    await consumer.connect().catch((e) => console.log(e))
    await consumer.subscribe(topic)
    await consumer.run(config)
    this.consumers.push(consumer)
  }
}
