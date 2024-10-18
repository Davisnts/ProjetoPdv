import { Component, OnInit } from '@angular/core';
import { faCaretDown, faCaretUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ClienteDetalharComponent } from '../cliente-detalhar/cliente-detalhar.component';
import { Cliente } from '../../../models/Cliente';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  alterarStatusBox()
    {
      this.statusBox= "" === this.statusBox ? "collapsed-box": "" ;
    }


  buscarClientes(){

  };

  cadastrarCliente(){
    this.dialog.open(ClienteDetalharComponent,
      {
        maxWidth: '100vw',
        height: '50%',
        width: '50%',
        panelClass: 'full-screen-modal',
        data:{
          titulo: "Cadastrar Cliente",
        }
      }).afterClosed().subscribe(
        () => {
          console.log("Componente")
        }
      );
  }

  detalharCliente(cliente:Cliente){
    this.dialog.open(ClienteDetalharComponent,
      {
        height: '50%',
        width: '50%',
        panelClass: 'full-screen-modal',
        data:{
          titulo: "Editar/Detalhar Cliente",
          cliente: cliente
        }
      });
  }

}
