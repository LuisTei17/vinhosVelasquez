import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiFetch } from './tasks/apiFetch.tasker';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ApiFetch,
    ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
