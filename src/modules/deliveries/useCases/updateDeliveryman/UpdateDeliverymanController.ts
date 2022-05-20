import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";



export class UpdateDeliverymanController {
    async handle(req: Request, res: Response) {
        const { id_deliveryman } = req
        const { id: id_delivery } = req.params
        const useCase = new UpdateDeliverymanUseCase()
        const item = await useCase.execute({ id_deliveryman, id_delivery })

        return res.json(item);
    }
}