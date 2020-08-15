
interface Item {
    "produto": string;
    "variedade": string;
    "pais": string;
    "categoria": string;
    "safra": string;
    "preco": number;
}

export interface ShoppingHistory {
    "codigo": string;
    "data": string;
    "cliente": string;
    "itens": Array<Item>;
    "valorTotal": number;
    "cpf"?: string;
    "invalid"?: boolean;
    "nome"?: string;
    "idCliente"?: number;
}