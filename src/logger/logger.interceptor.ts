import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerFactory } from './logger.factory';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const loggerFactory = new LoggerFactory();
    const { url, method, body, statusCode } = loggerFactory.extractLoggerData(context.getArgs());

    console.log(`CALLED ${method.toUpperCase()} - ${url} `);
    console.log(`STATUS - ${statusCode} `)

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Request ended in ${Date.now() - now}ms`)),
      );
  }
}
