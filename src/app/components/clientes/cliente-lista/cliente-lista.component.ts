import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp, faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDetalharComponent } from '../cliente-detalhar/cliente-detalhar.component';
import { Cliente } from '../../../models/Cliente';
import { ClienteService } from '../../../services/clientes/Cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmaçãoComponent } from '../../../shared/utils/components/ModalConfirmação/ModalConfirmação.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FiltroClientes } from '../../../models/FiltroClientes';
import { ModalTemplateComponent } from '../../../shared/utils/components/ModalTemplate/ModalTemplate.component';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {
  statusBox = '';
  caretup = faCaretUp;
  carretDown = faCaretDown;
  faSearch = faSearch;
  faEllipsis = faEllipsis;
  clientes: Cliente[] = [];
  filtroCliente: FiltroClientes;

  form!: UntypedFormGroup;

  constructor(public dialog: MatDialog,
              private clienteService: ClienteService,
              private fb: UntypedFormBuilder,
              private toastr: ToastrService
  ) {
    this.clienteService.carregarClientes.subscribe(()=>{
      this.buscarClientes();
    })

    this.filtroCliente = {
      'nome': '',
      'cpf': ''
    }
  }


  ngOnInit() {
    this.buscarClientes();
  }

  alterarStatusBox()
    {
      this.statusBox= "" === this.statusBox ? "collapsed-box": "" ;
    }


  buscarClientes(){
    let {nome} = this.filtroCliente;
    let {cpf} = this.filtroCliente;

    console.log(nome);
    console.log(cpf);


    this.clienteService.obterClienteListaPorFiltro(nome,cpf).subscribe({
      next:(clientes: Cliente[])=>{
        this.clientes = clientes;
      },
      error:(error)=>{
        this.toastr.error(error.error,"Falha ao tentar buscar clientes!")
      }
    })

  };

  cadastrarCliente(){
    this.dialog.open(ModalTemplateComponent,
      {
        height: '50%',
        width: '60%',
        panelClass: 'full-screen-modal',
        disableClose: true,
        data:{
          component: ClienteDetalharComponent,
          tituloModal: "Cadastrar Cliente",
        }
      });
  }

  detalharCliente(cliente:Cliente){
    this.dialog.open(ModalTemplateComponent,
      {
        height: '50%',
        width: '60%',
        panelClass: 'full-screen-modal',
        disableClose: true,
        data:{
          component: ClienteDetalharComponent,
          tituloModal: "Editar - Detalhar Cliente",
          cliente: cliente
        }
      });
  }

  abrirModalExcluirCliente(clienteId : string){
    this.dialog.open(ModalConfirmaçãoComponent,{
      height: 'auto',
      width: 'auto',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data:{
        titulo : 'Excluir Cliente',
        mensagem: 'Deseja realmente excluir cliente?'
      }
    }).afterClosed().subscribe(result =>{
      console.log(result);
      if(result){
        this.excluirCliente(clienteId)
      }
    })
  }

  excluirCliente(clienteId : string){
    this.clienteService.excluirCliente(clienteId).subscribe({
      next:() => {
        this.toastr.success("Cliente excluido com sucesso!");
        this.clienteService.recarregarClientes();
      },
      error:(error) => {this.toastr.error(error.error,"Falha ao tentar Excluir Cliente")}
    })
  }

  getMaskCPF(){
    return '000.000.000-09';
  }

}
