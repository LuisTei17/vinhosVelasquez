import { Injectable } from '@nestjs/common';
import { File } from '../helpers/file';
import { ClientsFactory } from './clients.factory';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';

@Injectable()
export class ClientsService {
    private file = new File();
    private clientsFactory = new ClientsFactory();

    async getClientsByPurchaseValue(): Promise<Array<ShoppingHistory>> {
        const clientsShopping = await this.file.retrieveFileData('clientsShopping');
        return this.clientsFactory.sortClientsByPurchaseValue(clientsShopping)
    }
}
