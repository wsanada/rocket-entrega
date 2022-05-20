import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";


export class FindAllAvailableController {
    async handle(req: Request, res: Response){
        const _controller = new FindAllAvailableUseCase();

        const result = await _controller.execute();

        return res.json(result);
    }
}