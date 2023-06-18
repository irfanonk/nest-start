import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('nest-start')
    .setDescription('initial')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  //path for the api doc
  SwaggerModule.setup('/', app, document);
  await app.listen(8002);
}
bootstrap();
