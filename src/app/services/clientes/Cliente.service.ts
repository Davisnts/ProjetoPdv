import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/Cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseURL = `${environment.apiURL}/clientes`;

constructor(private http:HttpClient) { }

carregarClientes = new EventEmitter<void>()

recarregarClientes(){
  this.carregarClientes.emit();
}

public obterClientePorId(id : number) : Observable<Cliente>{
  return this.http.get<Cliente>(`${this.baseURL}/${id}`);
}

public obterClienteLista(): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.baseURL}`);
}

public obterClienteListaPorFiltro(nome : any,cpf : any): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.baseURL}/?nome_like=${nome}&&cpf_like=${cpf}`)
}

public cadastrarCliente(cliente : Cliente) : Observable<any>{
  return this.http.post<Cliente>(`${this.baseURL}`,cliente);
}

public editarCliente(cliente : Cliente, clienteId: number) : Observable<any>{
  return this.http.put<Cliente>(`${this.baseURL}/${clienteId}`,cliente);
}
public excluirCliente(clienteId : any) : Observable<any>{
  return this.http.delete(`${this.baseURL}/${clienteId}`);
}



}
