import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-cliente-detalhar',
  templateUrl: './cliente-detalhar.component.html',
  styleUrls: ['./cliente-detalhar.component.css']
})
export class ClienteDetalharComponent implements OnInit {

  data: any;
  form!: FormGroup;

  campos = [
    {
      "campoNome": "nome",
      "campoTitulo": "Nome:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Nome é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "cpf",
      "campoTitulo": "Cpf:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Cpf é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "email",
      "campoTitulo": "Email:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Email é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "dataNascimento",
      "campoTitulo": "Data Nascimento:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Data Nascimento é Obrigatória."
        },
        {
          "nome": "format",
          "mensagemErro": "Data Nascimento é Invalida."
        }
      ]
    },
  ]

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    public utilService: UtilsService,
  )
  {
    this.data = data
    this.iniciarFormulario()
  }

  ngOnInit() {

    console.log(this.data);

  }

  iniciarFormulario(){
    this.form = this.fb.group({
      id:[0],
      nome:['',Validators.required],
      cpf:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      limiteCredito:['',Validators.required],
      dataNascimento:['',Validators.required],
    })
  }


  carregarCliente(){

  }
}
