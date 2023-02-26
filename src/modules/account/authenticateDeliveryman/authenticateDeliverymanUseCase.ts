import { prisma } from '../../../database/prismaClient';
import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        //receber username, password,
        // Verificar se username cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username,
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid!")
        }
        // verificar se senha está correta
        const passwordMatch = await compare(password, deliveryman.password)

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }
        // gerar token
        const token = sign({ username }, "4d9bf4d83e5474dafa166d49e81af5e960bab277", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });

        return token;

    }
}

