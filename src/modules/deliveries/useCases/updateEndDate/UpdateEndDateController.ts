import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";



export class UpdateEndDateController {
    async handle(req: Request, res: Response){
        const { id_deliveryman} = req
        const { id_delivery } = req.body

        const useCase = new UpdateEndDateUseCase();
        const item = await useCase.execute({id_delivery, id_deliveryman})

        return res.json(item)
    }
}