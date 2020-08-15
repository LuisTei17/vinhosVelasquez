require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiFetch } from './tasks/apiFetch.tasker';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT || 3000);

  const apiFetch = new ApiFetch();
  await apiFetch.getClients();
  await apiFetch.getShoppingHistory();
}
bootstrap();
