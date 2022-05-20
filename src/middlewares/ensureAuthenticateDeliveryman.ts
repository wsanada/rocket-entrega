import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateDeliveryman(req: Request, res: Response, next: NextFunction) {
    const _header = req.headers.authorization;
    const chaveSecreta = process.env.CHAVE_SECRETA_ENTREGADOR ?? ""

    if (!_header) {
        return res.status(401).json({ message: "Token não encontrado" })
    }

    const [, token] = _header.split(" ")

    try {
        const {sub } = verify(token, chaveSecreta) as IPayload

        req.id_deliveryman = sub

        return next();

    } catch (e) {
        res.status(401).json({ message: "Token inválido" })
    }

}