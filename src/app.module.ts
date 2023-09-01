import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UserPreferanceModule } from './modules/user-preferance/user-preferance.module'
// import { AuthModule } from './modules/auth/auth.module'
//import { UserModule } from './modules/user/user.module'
///import { RedisModule } from './common/redis/redis.module';
//import { RedisService } from './common/redis/redis.service';
//import { KafkaModule } from './common/kafka/kafka.module';
@Module({
  imports: [
    // SharedModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [RedisModule],
    //   useFactory: async (redisService: RedisService) => ({
    //     store: redisService as unknown as CacheStore
    //   }),
    //   inject: [RedisService],
    // }),
    // I18nModule.forRoot({
    //   fallbackLanguage: 'en',
    //   loaderOptions: {
    //     path: path.join(__dirname, 'common', 'i18n'),
    //     watch: true,
    //   },
    //   resolvers: [
    //     {
    //       use: QueryResolver,
    //       options: ['lang'],
    //     },
    //     AcceptLanguageResolver,
    //   ],
    // }),
    // EventEmitterModule.forRoot(),
    // AuthModule,
    
    // WinstonModule,
    // SchedulerModule,
    // FcmModule,
    // EventModule,

    // LocalizationModule,
    DatabaseModule,
    UserPreferanceModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

