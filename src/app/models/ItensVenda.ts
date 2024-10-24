
export interface ItensVenda {
  id: number; //Chave primaria
  nomeProduto: string;
  quantidade: number;
  vlUnitario: number;
  desconto: number;
  vlTotal: number;
  idVenda: number;
}
