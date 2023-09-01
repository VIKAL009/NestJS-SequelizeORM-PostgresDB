import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cors from 'cors'; // Import the 'cors' middleware
import { appConfig } from './app.config'
import { AppModule } from './app.module'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Admin API - NestJs')
    .setDescription('Admin API API')
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/swagger', app, document)
  app.useGlobalPipes(new ValidationPipe())

  // I18nValidationPipe can be used for dto validation
  //app.useGlobalPipes(new I18nValidationPipe());

  app.use(
    cors({
      origin: '*', // Allow all origins
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
      allowedHeaders: '*',
    }),
  )

  await app.listen(appConfig.port)
}
bootstrap()
