import { ApiProperty } from '@nestjs/swagger';

export class ClientsParamsDto {
  @ApiProperty({
    description: 'Ano',
    example: '2016',
  })
  year: string;
}

export class WinesParamsDto {
  @ApiProperty({
    description: 'Id do cliente',
    example: 4,
  })
  id: number;
}
