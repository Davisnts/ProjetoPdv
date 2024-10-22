import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ModalConfirmação',
  templateUrl: './ModalConfirmação.component.html',
  styleUrls: ['./ModalConfirmação.component.css'],
})
export class ModalConfirmaçãoComponent implements OnInit {
  mensagem = "";
  titulo = "";

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
    public dialog: MatDialogRef<any>,
    public toastr: ToastrService
  )
  {
    this.mensagem = data.mensagem;
    this.titulo = data.titulo;
  }

  faCircleExclamantion = faCircleExclamation;

  ngOnInit() { }


  confirmar() {
    this.dialog.close(true);
  }

  cancelar() {
    this.dialog.close(false);
    this.toastr.warning("Ação cancelada!");
  }
}
