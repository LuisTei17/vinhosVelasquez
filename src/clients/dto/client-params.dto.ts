import { ApiProperty } from '@nestjs/swagger';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';

export class ClientsParamsDto {
  @ApiProperty({
    description: 'Ano',
    example: '2016',
  })
  year: string;
}
