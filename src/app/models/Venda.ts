import { Cliente } from "./cliente";


export interface Venda {
  id: number; //Chave primaria
  dataVenda: Date;
  cliente: Cliente;
  totalVenda: number;
}
