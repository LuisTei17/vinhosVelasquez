import { ApiProperty } from '@nestjs/swagger';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';

export class ClientsResponseDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Carlos Andrade',
  })
  name: string;

  @ApiProperty({
    description: 'Valor total',
    example: 1240,
  })
  totalValue: number;

  @ApiProperty({
    description: 'Cpf',
    example: "0000.000.000-08",
  })
  cpf: string;

  static newInstance(clientShopping: ShoppingHistory) {
    const instance = new ClientsResponseDto();
    instance.name = clientShopping.nome;
    instance.totalValue = clientShopping.valorTotal;
    instance.cpf = clientShopping.cliente
    return instance;
  }
}
