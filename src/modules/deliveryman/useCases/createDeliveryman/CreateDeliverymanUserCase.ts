import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"

interface ICreateDeliveryman {
    username: string
    password: string
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        const exists = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (exists) {
            throw new Error("Deliveryman já existe")
        }

        const _hash = await hash(password, 10)

        const item = await prisma.deliveryman.create({
            data: {
                username,
                password: _hash,
            }
        })

        return item
    }
}