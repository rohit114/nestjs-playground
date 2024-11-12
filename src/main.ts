import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateENVVars } from './config/app.env';
import { ValidationPipe } from '@nestjs/common';
import { getLoggingUtil } from './utils';
import { initMySQL } from './config/mysql.config';
const logger = getLoggingUtil('MAIN');


async function bootstrap() {
  validateENVVars();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/apis/my-backend');
  //app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //app.useGlobalFilters(new ExceptionFilterEx()); //todo
  await initDatabases();
  await app.startAllMicroservices();
  const PORT: number = 3001;
  logger.info('BOOTSTRAP', `NESTJS_PLAYGROUND_API_STARTED - PORT: ${PORT}`);

  await app.listen(PORT);
}
async function initDatabases() {
  logger.info('BOOTSTRAP', 'INITIALIZING DATABASE');
  await initMySQL();
  logger.info('BOOTSTRAP', 'INITIALIZED DATABASE');
}

bootstrap();
