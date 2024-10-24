export interface Cliente {
 id: string //Chave primaria --> esta como string devido a configuração do Json-Server
 nome: string;
 cpf: string;
 email: string;
 limiteCredito: string;
 dataNascimento: Date;
}
