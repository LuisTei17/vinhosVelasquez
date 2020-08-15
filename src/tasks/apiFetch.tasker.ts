import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpApi } from '../helpers/http.api';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';
import { Client } from 'src/interfaces/clients.interface';
import { File } from '../helpers/file';

@Injectable()
export class ApiFetch {
  private readonly logger = new Logger(ApiFetch.name);
  private httpApi = new HttpApi();
  private file = new File();

  @Cron('0 12 * * *')
  handleCron() {
    this.getClients();
    this.getShoppingHistory();
  }

  async getClients() {
    const clients: Array<Client> = await this.httpApi.retrieveClients();
    return this.file.saveFile('clients', clients);
  }

  async getShoppingHistory() {
    const shoppingHistory: Array<ShoppingHistory> = await this.httpApi.retrieveShoppingHistory();
    return this.file.saveFile('shoppingHistory', shoppingHistory);
  }
}