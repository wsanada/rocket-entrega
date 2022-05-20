import { prisma } from "../../../database/prismaClient"
import { compare} from "bcrypt"
import { sign } from "jsonwebtoken"


interface IAuthenticateClient {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient){
        const secretKey = process.env.CHAVE_SECRETA_CLIENTE ?? ""

        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client){
            throw new Error("Usuário o senha inválidos")
        }

        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch){
            throw new Error("Usuário o senha inválidos")
        }

        
        const token = sign({username}, secretKey, {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}