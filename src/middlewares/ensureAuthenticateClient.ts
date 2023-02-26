import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, nextFunction: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing",
        });
    }

    //Bearer dkasdjdlsakjdadj-sdjakj3455
    // [0] = Bearer
    // [1] = dkasdjdlsakjdadj-sdjakj3455
    const [, token] = authHeader.split("")

    try {

        const { sub } = verify(token, "4d9bf4d83e5474dafa166d49e81af5e960bab277") as IPayload;
        request.id_client = sub;

        console.log(sub)
    } catch (err) {
        return response.status(401).json({
            message: "Invalid token",
        });
    }
}