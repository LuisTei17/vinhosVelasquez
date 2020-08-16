import { ApiProperty } from '@nestjs/swagger';
import { ShoppingHistory, Item } from 'src/interfaces/shoppingHistory.interface';

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

export class WineRecommendationResponseDto {
  @ApiProperty({
    description: 'Produto',
    example: 'Avondale',
  })
  produto: string;
  
  @ApiProperty({
    description: 'Variedade',
    example: 'Muscat de Frontignon',
  })
  variedade: string;
  
  @ApiProperty({
    description: 'Pais',
    example: 'Africa do Sul',
  })
  pais: string;
  
  @ApiProperty({
    description: 'Categoria',
    example: 'Rosé',
  })
  categoria: string;
  
  @ApiProperty({
    description: 'Safra',
    example: '2010',
  })
  safra: string;
  
  @ApiProperty({
    description: 'Preço',
    example: 66.8,
  })
  preco: number;

  static newInstance(item: Item) {
    const instance = new WineRecommendationResponseDto();
    instance.produto = item.produto;
    instance.variedade = item.variedade;
    instance.pais = item.pais;
    instance.categoria = item.categoria;
    instance.safra = item.safra;
    instance.preco = item.preco;
    return instance;
  }
}