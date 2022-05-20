import { Request, response, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUserCase";



export class CreateDeliverymanController {
    async handle(req: Request, res: Response) {

        const { username, password } = req.body

        const createDeliverymanUseCase = new CreateDeliverymanUseCase()
        const result = await createDeliverymanUseCase.execute({ username, password })

        return res.json(result)
    }
}