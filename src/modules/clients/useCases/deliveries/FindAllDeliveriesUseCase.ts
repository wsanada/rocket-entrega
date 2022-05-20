import { prisma } from "../../../../database/prismaClient";



export class FindAllDeliveriesUseCase{
    async execute(id_client: string){

        const list = await prisma.clients.findFirst({
            where:{
                id: id_client,
            },
            select: {
                id: true,
                username: true,
                deliveries: true
            }
        })

        return list;
    }
}