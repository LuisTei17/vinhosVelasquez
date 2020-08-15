
interface Item {
    "produto": String;
    "variedade": String;
    "pais": String;
    "categoria": String;
    "safra": String;
    "preco": Number;
}

export interface ShoppingHistory {
    "codigo": String;
    "data": String;
    "cliente": String;
    "itens": Array<Item>;
    "valorTotal": Number;
}