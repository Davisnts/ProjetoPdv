import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ModalTemplate',
  templateUrl: './ModalTemplate.component.html',
  styleUrls: ['./ModalTemplate.component.css']
})
export class ModalTemplateComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  fechar(){
    this.dialog.close();
  }

}
