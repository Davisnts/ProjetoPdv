import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../../models/Venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

baseURL = `${environment.apiURL}/vendas`;

constructor(private http:HttpClient) { }

carregarVendas = new EventEmitter<void>()

recarregarVendas(){
  this.carregarVendas.emit();
}

public obterVendas() : Observable<Venda[]>{
  return this.http.get<Venda[]>(`${this.baseURL}?_expand=cliente`);
}

public cadastrarVenda(venda : Venda) : Observable<Venda>{
  return this.http.post<Venda>(`${this.baseURL}`,venda);
}

public editarVenda(venda : Venda) : Observable<Venda[]>{
  return this.http.put<Venda[]>(`${this.baseURL}/${venda.id}`,venda);
}

public excluirVenda(vendaId : string) : Observable<any>{
  return this.http.delete(`${this.baseURL}/${vendaId}`);
}



}
