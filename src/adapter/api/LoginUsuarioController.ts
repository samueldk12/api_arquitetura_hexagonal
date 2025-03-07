import CasoDeUso from '@/core/shared/CasoDeUso';
import LoginUsuario from '@/core/usuario/service/LoginUsuario';
import { Express } from 'express'
import ProvedorJwt from './ProvedorJwt';
import UsuarioMiddleware from './UsuarioMiddleware';

export default class LoginUsuarioController{
    constructor(
        servidor: Express,
        casoDeUso: LoginUsuario
    ){
        servidor.post('/api/usuarios/login' ,async(req, resp) => {
            try{
                const usuario = await casoDeUso.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })
                
                const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!)

                resp.status(200).send({
                    token: provedorJwt.gerar(usuario) 
                })
            }catch(e: any){
                resp.status(400).send(e.message)
            }
        })
    }
}