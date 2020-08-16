import { Client } from "src/interfaces/clients.interface";
import { ShoppingHistory, Item } from "src/interfaces/shoppingHistory.interface";
import { ClientsResponseDto } from "./dto/client-response.dto";
import { group } from "console";

export class ClientsFactory {

    private removeExtraCharacters(text: String) {
        return text.replace(/[0,.,-]/g, '');
    }

    private extractYearFromDate(date: string) {
        const dateArray = date.split('-')
        const dateYear = dateArray[dateArray.length - 1];
        return dateYear;

    }

    private getAverageYearSalesQtt(clientsShopping: Array<ShoppingHistory>) {
        let averageYears = [];

        clientsShopping.forEach(clientShopping => {
            const dateYear = this.extractYearFromDate(clientShopping.data);
            let foundYear = false;
            averageYears = averageYears.map(averageYear => {
                if (averageYear.year === dateYear) {
                    averageYear.count += 1;
                    foundYear = true;
                }
                return averageYear;
            })

            if (!foundYear) {
                averageYears.push({count: 1, year: dateYear});
            }
        });

        return averageYears;
    }

    private groupSalesByClient(clientsShopping: Array<ShoppingHistory>) {
        let groupedClientsShopping: Array<ShoppingHistory> = [];

        clientsShopping.forEach(clientShopping => {
            let foundedClient = false;

            groupedClientsShopping = groupedClientsShopping.map(groupedClient => {
                if (groupedClient.cliente === clientShopping.cliente) {
                    groupedClient.valorTotal += clientShopping.valorTotal;
                    groupedClient.count += 1;
                    foundedClient = true;
                }
                return groupedClient;
            });

            if (!foundedClient) {
                clientShopping.count = 1;
                groupedClientsShopping.push(clientShopping);
            }
        });

        return groupedClientsShopping;
    }

    private filterClientsShoppingByYear(clientsShopping: Array<ShoppingHistory>, year) {
        return clientsShopping.filter(clientShopping => {
            if(!clientShopping.data) {
                return false;
            }
            const dateYear = this.extractYearFromDate(clientShopping.data);

            return dateYear === year;
        })
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
        let groupedClientsShopping: Array<ShoppingHistory> = this.groupSalesByClient(clientsShopping);

        return groupedClientsShopping.sort((prev, curr) => curr.valorTotal - prev.valorTotal);
    }

    getBiggerPurchaseClient(clientsShopping: Array<ShoppingHistory>, year = '2016') {
        clientsShopping = this.filterClientsShoppingByYear(clientsShopping, year)

        return this.sortClientsByPurchaseValue(clientsShopping)[0];
    }

    getLoyalCustomers(clientsShopping: Array<ShoppingHistory>) {
        if (!clientsShopping)
            return [];

        const yearsData = this.getAverageYearSalesQtt(clientsShopping);
        let loyalCustomers = [];
        yearsData.forEach(yearData => {
            const filteredClientsShoppings: Array<ShoppingHistory> = this.filterClientsShoppingByYear(clientsShopping, yearData.year);
            const groupedClientsShopping: Array<ShoppingHistory> = this.groupSalesByClient(filteredClientsShoppings);
            const average = Math.ceil(yearData.count/groupedClientsShopping.length);

            groupedClientsShopping.forEach(groupedClientShopping => {
                if (groupedClientShopping.count > average) {
                    loyalCustomers.push(groupedClientShopping)
                }
            })
        });

        return this.groupSalesByClient(loyalCustomers);
    }

    getWineRecommendation(clientsShopping: Array<ShoppingHistory>, id: number): Item {
        const wines: Array<Array<Item>> = clientsShopping.map(clientShopping => clientShopping.itens);
        const flattenedWines: Array<Item> = [].concat.apply([], wines);

        let wineVariations: Array<any> = [];


        flattenedWines.forEach(wine => {
            let foundVariation = wineVariations.find(wineVariation => wineVariation.count === wine.variedade);

            if (!foundVariation)
                wineVariations.push({variety: wine.variedade, count: 0});
        });
        const filteredClientsShoppings = clientsShopping.filter(client => client.idCliente === Number(id));

        const purchasedItens = [].concat.apply([], filteredClientsShoppings.map(shopping => shopping.itens));
        purchasedItens.forEach(item => {
            wineVariations = wineVariations.map(wine => {
                if (wine.variety === item.variedade)
                    wine.count += 1;
                return wine;
            });
        });

        const mostPurchasedVariation = wineVariations.sort((prev, curr) => curr.count -prev.count)[0];

        return purchasedItens.find(item => item.variedade === mostPurchasedVariation.variety);
    }
}