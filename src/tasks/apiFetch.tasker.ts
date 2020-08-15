import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpApi } from '../helpers/http.api';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';
import { Client } from 'src/interfaces/clients.interface';
import { File } from '../helpers/file';
import { ClientsFactory } from '../clients/clients.factory';

@Injectable()
export class ApiFetch {
  private readonly logger = new Logger(ApiFetch.name);
  private httpApi = new HttpApi();
  private file = new File();
  private clientsFactory = new ClientsFactory();

  @Cron('0 0 * * *')
  async handleCron() {
    const clients: Array<Client> = await this.httpApi.retrieveClients();
    const shoppingHistory: Array<ShoppingHistory> = await this.httpApi.retrieveShoppingHistory();
    const clientsShoppingHistory = this.clientsFactory.intercalateData(clients, shoppingHistory);

    return this.file.saveFile('clientsShopping', clientsShoppingHistory);
  }
}