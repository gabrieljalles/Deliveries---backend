import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, nextFunction: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing",
        })
    }

    const [, token] = authHeader.split("")

    try {
        const { sub } = verify(token, "4d9bf4d83e5474dafa166d49e81af5e960bab277") as IPayload;

        request.id_deliveryman = sub

    } catch (err) {
        return response.status(401).json({
            message: "Invalid token",
        })
    }
}