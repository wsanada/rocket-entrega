import { prisma } from "../../../../database/prismaClient"
import { hash } from "bcrypt"

interface ICreateClient {
    username: string;
    password: string
}
export class CreateClientUseCase{
    async execute({ password, username}: ICreateClient){

        const clientExists = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (clientExists){
            throw new Error("Cliente já cadastrado")
        }

        const _hash = await hash(password, 10)

        const item = await prisma.clients.create({
            data: {
                username,
                password: _hash,
            }
        })

        return item
    }
}