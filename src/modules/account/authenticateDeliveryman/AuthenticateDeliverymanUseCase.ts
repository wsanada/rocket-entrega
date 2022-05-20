import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        const chaveSecreta = process.env.CHAVE_SECRETA_ENTREGADOR ?? ""
        const item = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!item) {
            throw new Error("Usuário o senha inválidos")
        }

        const passwordMatch = await compare(password, item.password)

        if (!passwordMatch) {
            throw new Error("Usuário o senha inválidos")
        }

        const token = sign({ username }, chaveSecreta, {
            subject: item.id,
            expiresIn: "1d"
        })

        return token
    }
}