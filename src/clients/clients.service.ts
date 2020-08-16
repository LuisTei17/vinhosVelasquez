import { Injectable } from '@nestjs/common';
import { File } from '../helpers/file';
import { ClientsFactory } from './clients.factory';
import { ShoppingHistory, Item } from 'src/interfaces/shoppingHistory.interface';

@Injectable()
export class ClientsService {
    private file = new File();
    private clientsFactory = new ClientsFactory();
    private FILE_NAME = 'clientsShopping'

    async getClientsByPurchaseValue(): Promise<Array<ShoppingHistory>> {
        const clientsShopping = await this.file.retrieveFileData(this.FILE_NAME);
        return this.clientsFactory.sortClientsByPurchaseValue(clientsShopping)
    }

    async getBiggerPurchaseClient(year: string): Promise<ShoppingHistory> {
        const clientsShopping = await this.file.retrieveFileData(this.FILE_NAME);
        return this.clientsFactory.getBiggerPurchaseClient(clientsShopping, year)
    }

    async getLoyalCustomers(): Promise<Array<ShoppingHistory>> {
        const clientsShopping = await this.file.retrieveFileData(this.FILE_NAME);
        return this.clientsFactory.getLoyalCustomers(clientsShopping);
    }

    async getWineRecommendation(id: number): Promise<Item> {
        const clientsShopping = await this.file.retrieveFileData(this.FILE_NAME);
        return this.clientsFactory.getWineRecommendation(clientsShopping, id);
    }
}
