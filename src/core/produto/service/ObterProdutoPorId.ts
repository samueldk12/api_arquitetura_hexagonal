import CasoDeUso from "@/core/shared/CasoDeUso";
import Produto from "../model/Produto";
import Usuario from "@/core/usuario/model/Usuario";

export type Entrada =  {
    produtoId: string,
    usuario: Usuario
}

export default class ObterProdutoPorId implements CasoDeUso<Entrada, Produto> {
    
    async executar(entrada: Entrada): Promise<Produto> {
        return {
               id: entrada.produtoId,
               nome: "Produto 1",
               valor: 10.0,
               compradoPor: entrada.usuario.email
        }
           
    }
}