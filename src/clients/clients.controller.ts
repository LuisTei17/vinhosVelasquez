import { Controller, Get, UseInterceptors, Param, HttpException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientsResponseDto } from './dto/client-response.dto';
import { ClientsService } from './clients.service';
import { LoggingInterceptor } from '../logger/logger.interceptor';
import { ClientsParamsDto } from './dto/client-params.dto';

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
  
  @ApiOkResponse({ type: ClientsResponseDto })
  @Get('/bigger-purchase/:year')
  async getBiggerPurchaseClient(@Param() params: ClientsParamsDto): Promise<ClientsResponseDto> {
    const client = await this.clientsService.getBiggerPurchaseClient(params.year);

    if (!client)
      throw new HttpException({ status: 204, error: 'NO_DATA'}, 204)

    return ClientsResponseDto.newInstance(client);
  }

  @ApiOkResponse({ type: ClientsResponseDto, isArray: true })
  @Get('/loyal-customers')
  async getLoyalCustomers(): Promise<Array<ClientsResponseDto>> {
    const clients = await this.clientsService.getLoyalCustomers();
    return clients.map(client => ClientsResponseDto.newInstance(client));
  }

}
