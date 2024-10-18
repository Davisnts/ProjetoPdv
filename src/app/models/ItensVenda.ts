import { Venda } from "./venda";

export interface ItensVenda {
  id: number; //Chave primaria
  nomeProduto: string;
  quantidade: number;
  vrUnitario: number;
  desconto: number;
  vrTotal: number;
  idVenda: Venda;
}
