import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
    async handle(req: Request, res: Response){
        const { username, password } = req.body

        const createClientUseCase = new CreateClientUseCase

        const result = await createClientUseCase.execute({ password, username })

        return res.json(result)
    }
}