import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-detalhar',
  templateUrl: './cliente-detalhar.component.html',
  styleUrls: ['./cliente-detalhar.component.css']
})
export class ClienteDetalharComponent implements OnInit {

  data: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.data = data
   }

  ngOnInit() {
    console.log(this.data);
  }

}
