import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
    const _header = req.headers.authorization
    const chaveSecreta = process.env.CHAVE_SECRETA_CLIENTE ?? ""

    if (!_header) {
        return res.status(401).json({ message: "Token não encontrado" })
    }

    const [, token] = _header.split(" ")

    try {
        const { sub } = verify(token, chaveSecreta) as IPayload

        req.id_client = sub

        return next();

    } catch (e) {
        res.status(401).json({ message: "Token inválido" })
    }

}