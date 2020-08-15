import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiFetch } from './tasks/apiFetch.tasker';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ApiFetch
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
