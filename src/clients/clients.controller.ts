import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientsResponseDto } from './dto/client-response.dto';
import { ClientsService } from './clients.service';
import { LoggingInterceptor } from '../logger/logger.interceptor';

@ApiTags('Clients')
@UseInterceptors(new LoggingInterceptor)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOkResponse({ type: ClientsResponseDto, isArray: true })
  @Get()
  async getClientsByPurchaseValue(): Promise<Array<ClientsResponseDto>> {
    const clients = await this.clientsService.getClientsByPurchaseValue();
    return clients.map(client => ClientsResponseDto.newInstance(client));
  }

}
