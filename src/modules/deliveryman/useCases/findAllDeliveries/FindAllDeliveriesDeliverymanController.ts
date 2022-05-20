import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";



export class FillAllDeliveriesDeliverymanController {
    async handle(req: Request, res: Response) {
        const { id_deliveryman } = req

        const useCase = new FindAllDeliveriesDeliverymanUseCase();

        const list = await useCase.execute(id_deliveryman);

        return res.json(list);
    }
}