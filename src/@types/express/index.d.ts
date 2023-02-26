declare namespace Express {
    export interface Request {
        id_client: string;
        id_deliveryman: string;
    }
}
//essa ppagina foi criada para que seja possível o request identificar o id_client como uma opção de escolha lá no ensureAuthenticateClient