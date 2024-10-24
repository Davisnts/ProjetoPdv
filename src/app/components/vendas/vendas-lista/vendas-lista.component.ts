import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTemplateComponent } from '../../../shared/utils/components/ModalTemplate/ModalTemplate.component';
import { VendasDetalharComponent } from '../vendas-detalhar/vendas-detalhar.component';
import { Venda } from '../../../models/Venda';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ModalConfirmaçãoComponent } from '../../../shared/utils/components/ModalConfirmação/ModalConfirmação.component';
import { VendaService } from '../../../services/vendas/Venda.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vendas-lista',
  templateUrl: './vendas-lista.component.html',
  styleUrls: ['./vendas-lista.component.css']
})
export class VendasListaComponent implements OnInit {

  vendas: Venda[] = [];

  faEllipsis = faEllipsis;

  constructor(public dialog: MatDialog,
              public vendasService: VendaService,
              public toastr : ToastrService
  ) {
    this.vendasService.carregarVendas.subscribe(
      () => {this.carregarVendas()}
    );
  }

  ngOnInit() {
    this.carregarVendas();
  }



  carregarVendas(){
    this.vendasService.obterVendas().subscribe({
      next:(vendas) => {
        this.vendas = vendas;
      },
      error:() => {
        this.toastr.error("Falha ao tentar carregar vendas");
      }
    })
  }
  cadastrarVenda(){
    this.dialog.open(ModalTemplateComponent,{
      height: '90%',
      width: '90%',
      panelClass: 'full-width-dialog',
      data:{
        component: VendasDetalharComponent,
        tituloModal: 'Cadastrar Venda'
      }
    })
  }

  editarVenda(venda : Venda){
    this.dialog.open(ModalTemplateComponent,{
      height: '90%',
      width: '90%',
      panelClass: 'full-width-dialog',
      data:{
        component: VendasDetalharComponent,
        tituloModal: 'Editar Venda',
        venda: venda
      }
    })
  }

  abrirModalExcluirVenda(vendaId : string){
    this.dialog.open(ModalConfirmaçãoComponent,{
      height: 'auto',
      width: '80%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data:{
        titulo : 'Excluir Venda',
        mensagem: 'Deseja Realmente Excluir Venda?'
      }
    }).afterClosed().subscribe(result =>{
      console.log(result);
      if(result){
        this.excluirVenda(vendaId);
      }
    })
  }

  excluirVenda(vendaId : string){
    this.vendasService.excluirVenda(vendaId).subscribe({
      next:() => {
        this.toastr.success("Venda Excluida com Sucesso!");
        this.vendasService.recarregarVendas();
      },
      error:(error) => {
        this.toastr.error(error.error,'Falha ao tentar excluir venda');
      }
    })
  }
}
