import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../../shared/utils/utils.service';
import { ClienteService } from '../../../services/clientes/Cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/Cliente';

@Component({
  selector: 'app-cliente-detalhar',
  templateUrl: './cliente-detalhar.component.html',
  styleUrls: ['./cliente-detalhar.component.css']
})
export class ClienteDetalharComponent implements OnInit {

  data: any;
  form!: UntypedFormGroup;


  modo = "CADASTRAR";
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
        },
        {
          "nome": "mask",
          "mensagemErro": "Cpf Inválido."
        }
      ]
    },
    {
      "campoNome": "limiteCredito",
      "campoTitulo": "limiteCredito:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Limite de credito é Obrigatório."
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
        },
        {
          "nome": "email",
          "mensagemErro": "Email Invalido."
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
        }
      ]
    },
  ]

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialog:MatDialogRef<any>,
    public utilService: UtilsService,
    public clienteService: ClienteService,
    private toastr: ToastrService
  )
  {
    this.data = data
    this.iniciarFormulario()
    if(data.cliente){
      this.carregarCliente(data.cliente);
      this.modo = "EDITAR";
    }
  }

  ngOnInit() {

    console.log(this.data);

  }

  iniciarFormulario(){
    this.form = this.fb.group({
      id:[null],
      nome:['',Validators.required],
      cpf:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      limiteCredito:['',Validators.required],
      dataNascimento:[''],
    })
  }


  carregarCliente(cliente: Cliente){
      this.form.patchValue(cliente);
  }

  cadastrarCliente(){

  }

  salvarAlteracoes(){
    let cliente = this.form.value;
    if(this.modo == "EDITAR"){
      this.clienteService.editarCliente(cliente,cliente.id).subscribe({
        next:()=>{
          this.toastr.success("Cliente editado com sucesso");
          this.dialog.close();
          this.clienteService.carregarClientes.emit();
        },
        error:(error)=>{
          this.toastr.error(error.error,"Falha ao tentar editar cliente!");
        }
      })
    }
    else if(this.modo == "CADASTRAR"){
      console.log(cliente);
      this.clienteService.cadastrarCliente(cliente).subscribe({
        next:()=>{
          this.toastr.success("Cliente cadastrado com sucesso!");
          this.dialog.close();
        },
        error:(error) => {
          this.toastr.error(error.error,"Falha ao tentar cadastrar cliente!")
        }
      })
    }
  }

  retornaLog(t: any){
    console.log(t);
  }

  getMaskCPF(){
    return '000.000.000-09';
  }
}
