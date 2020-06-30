// Adicionando a informação de usuário ao Request do Express
// Substituição de tipos

declare namespace Express {
    export interface Request {
        user: {
            id: string
        }
    }
}