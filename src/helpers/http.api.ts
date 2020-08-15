const { CLIENTS_API_URL, SHOPPING_HISTORY_API_URL} = process.env;
import axios from 'axios';
import { Client } from 'src/interfaces/clients.interface';
import { ShoppingHistory } from 'src/interfaces/shoppingHistory.interface';

export class HttpApi {

    async retrieveClients (): Promise<Array<Client>> {
        try {

            const response = await axios.get(CLIENTS_API_URL);
            return response.data;
        } catch (error) {
            console.error(`[ERROR] fetching clients data - ${Date()}`)
            console.log(error)   
        }
    }

    async retrieveShoppingHistory(): Promise<Array<ShoppingHistory>> {
        try {

            const response = await axios.get(SHOPPING_HISTORY_API_URL);
            return response.data;
        } catch (error) {
            console.error(`[ERROR] fetching shopping history data - ${Date()}`)
            console.log(error)   
        }
    }
}