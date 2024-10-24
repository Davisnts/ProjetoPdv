import { Cliente } from "./Cliente";
import { ItensVenda } from "./ItensVenda";


export interface Venda {
  id: string //Chave primaria --> esta como string devido a configuração do Json-Server
  dataVenda: Date;
  cliente: Cliente;
  totalVenda: number;
  itensVenda : ItensVenda[];
}
