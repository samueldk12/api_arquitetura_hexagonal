import bcrypt from "bcrypt"
import ProvedorCriptografia from "@/core/usuario/service/ProvedorCriptografia"

export default class SenhaCripto
    implements ProvedorCriptografia
{
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(texto, salt)
    }

    comparar(senha: string, SenhaCripto: string): boolean {
        return bcrypt.compareSync(senha, SenhaCripto)
    }
}
