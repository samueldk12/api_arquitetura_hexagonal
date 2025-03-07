import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import RepositorioUsuarioPg from './adapter/db/RepositorioUsuarioPg'
import SenhaCripto from './adapter/auth/SenhaCripto'
import RegistrarUsuarioController from './adapter/api/RegistrarUsuarioController'
import LoginUsuario from './core/usuario/service/LoginUsuario'
import LoginUsuarioController from './adapter/api/LoginUsuarioController'
import ObterProdutoPorId from './core/produto/service/ObterProdutoPorId'
import ObterProdutoPorIdController from './adapter/api/ObterProdutoPorIdController'
import UsuarioMiddleware from './adapter/api/UsuarioMiddleware'

const app = express()
const porta = process.env.PORT ?? 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(porta, ()=>{
    console.log(`Servidor executanto na porta ${porta}!`)
})

// ----------------------------------- ROTAS ABERTAS

const repositorioUsuario = new RepositorioUsuarioPg()
const provedorCript = new SenhaCripto()
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCript)

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCript)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)
// ------------------------------------------------ Rotas Protegidas

const usuarioMiddleware =  UsuarioMiddleware(repositorioUsuario)

const obterProdutoPorId = new ObterProdutoPorId()
new ObterProdutoPorIdController(app, obterProdutoPorId, usuarioMiddleware)