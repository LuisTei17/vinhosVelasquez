import { Client } from "src/interfaces/clients.interface";
import { ShoppingHistory } from "src/interfaces/shoppingHistory.interface";
import { ClientsResponseDto } from "./dto/client-response.dto";
import { group } from "console";

export class ClientsFactory {

    private removeExtraCharacters(text: String) {
        return text.replace(/[0,.,-]/g, '');
    }

    intercalateData(clients: Array<Client>, shoppingHistory: Array<ShoppingHistory>) {
        return shoppingHistory.map(purchase => {
            const client = clients.find(client => {
                const cpf = this.removeExtraCharacters(client.cpf);
                const cliente = this.removeExtraCharacters(purchase.cliente);
                return cliente === cpf
            });

            if (!client) {
                purchase.invalid = true;
            } else {
                purchase.nome = client.nome;
                purchase.idCliente = client.id       
            }

            return purchase;
        })
    }

    sortClientsByPurchaseValue(clientsShopping: Array<ShoppingHistory>): Array<ShoppingHistory> {
        let groupedClientsShopping: Array<ShoppingHistory> = [];

        clientsShopping.forEach(clientShopping => {
            let foundedClient = false;

            groupedClientsShopping = groupedClientsShopping.map(groupedClient => {
                if (groupedClient.cliente === clientShopping.cliente) {
                    groupedClient.valorTotal += clientShopping.valorTotal;
                    foundedClient = true;
                }
                return groupedClient;
            });

            if (!foundedClient)
                groupedClientsShopping.push(clientShopping);
        })
        return groupedClientsShopping.sort((prev, curr) => curr.valorTotal - prev.valorTotal);
    }
}