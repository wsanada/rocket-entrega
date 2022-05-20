import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";



export class FindAllDeliveriesController {
    async handle(req: Request, res: Response){
        const { id_client } = req
        
        const useCase = new FindAllDeliveriesUseCase()
        
        const list = await useCase.execute(id_client)

        res.json(list)
    }
}