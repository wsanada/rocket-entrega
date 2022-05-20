import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableUseCase {
    async execute() {
        const list = await prisma.deliveries.findMany({
            where: {
                end_at: null,
                id_deliveryman: null,
            },
            include: {
                deliveryman: true,
                client: true
            },
        })

        return list;
    }
}