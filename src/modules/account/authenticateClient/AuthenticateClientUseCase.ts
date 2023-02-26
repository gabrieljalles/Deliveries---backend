import { prisma } from '../../../database/prismaClient';
import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        //receber username, password,
        // Verificar se username cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username,
            }
        })

        if (!client) {
            throw new Error("Username or password invalid!")
        }
        // verificar se senha está correta
        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }
        // gerar token
        const token = sign({ username }, "4d9bf4d83e5474dafa166d49e81af5e960bab277", {
            subject: client.id,
            expiresIn: "1d",
        });

        return token;

    }
}

