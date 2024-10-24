import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/clientes/Cliente.service';
import { UtilsService } from '../../../shared/utils/utils.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Cliente } from '../../../models/Cliente';
import { VendaService } from '../../../services/vendas/Venda.service';
import { faCaretDown, faCaretUp, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ItensVenda } from '../../../models/ItensVenda';


@Component({
  selector: 'app-vendas-detalhar',
  templateUrl: './vendas-detalhar.component.html',
  styleUrls: ['./vendas-detalhar.component.css']
})
export class VendasDetalharComponent implements OnInit {

  data: any;
  form!: UntypedFormGroup;
  modo = "CADASTRAR";
  clientes: Cliente[] = [];
  statusBox = '';
  caretup = faCaretUp;
  carretDown = faCaretDown;
  plus = faPlus;
  faTrash = faTrash;

  campos = [
    {
      "campoNome": "clienteId",
      "campoTitulo": "Cliente:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Cliente é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "dataVenda",
      "campoTitulo": "Data Venda",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Data da venda é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "totalVenda",
      "campoTitulo": "totalVenda",
      "validators": []
    },
  ]

  camposItens = [
    {
      "campoNome": "nomeProduto",
      "campoTitulo": "Nome Produto:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Nome do produto é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "quantidade",
      "campoTitulo": "quantidade:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Quantidade do produto é Obrigatório."
        }
      ]
    },

    {
      "campoNome": "vlUnitario",
      "campoTitulo": "Valor Unitario:",
      "validators": [
        {
          "nome": "required",
          "mensagemErro": "Valor Unitario do produto é Obrigatório."
        }
      ]
    },
    {
      "campoNome": "desconto",
      "campoTitulo": "Desconto:",
      "validators": []
    },
    {
      "campoNome": "vlTotal",
      "campoTitulo": "Valor Total:",
      "validators": []
    },
  ]

  constructor(
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialog:MatDialogRef<any>,
    public utilService: UtilsService,
    public clienteService: ClienteService,
    public vendaService: VendaService,
    private toastr: ToastrService,
    private config: NgSelectConfig,
  ){
    this.data = data;
    this.iniciarFormulario();
    this.carregarClientes();
    if(data.venda){
      this.carregarVenda(data.venda);
      this.modo = "EDITAR";
    }
    this.config.notFoundText = 'Nenhum Cliente encontrado';


  }

  ngOnInit() {
  }

  iniciarFormulario(){
    this.form = this.fb.group({
      id:[null],
      clienteId:['',Validators.required],
      dataVenda:['',Validators.required],
      totalVenda: [0,Validators.required],
      itens: this.fb.array([])
    })
  }

  alterarStatusBox()
  {
    this.statusBox= "" === this.statusBox ? "collapsed-box": "" ;
  }


  carregarClientes(){
    this.clienteService.obterClienteLista().subscribe({
      next:(clientes: Cliente[])=>{
        this.clientes = clientes;
      },
      error:(error) => {
        this.toastr.error(error.error,"Falha ao tentar carregar clientes");
      }
    })
  }

  carregarVenda(venda : any){
    this.form.patchValue(venda);
    console.log(this.form.value);
    console.log(venda);
    venda.itens.forEach((item : ItensVenda) =>{
      this.itensForms.push(this.gerarItem(item));
    })
  }


  salvarAlteracoes(){
    let venda = this.form.value;

    if(this.modo == "EDITAR"){
      this.vendaService.editarVenda(venda).subscribe({
        next:() => {
          this.toastr.success("Venda Editada com succeso!");
          this.dialog.close();
          this.vendaService.recarregarVendas();
        },
        error: (error) => {
          this.toastr.error(error.error,"Falha ao tentar Cadastrar Venda!");
        }
      })
    }
    else{
      let venda = this.form.value;
      this.vendaService.cadastrarVenda(venda).subscribe({
        next:() => {
          this.toastr.success("Venda Cadastrada com succeso!");
          this.dialog.close();
          this.vendaService.recarregarVendas();
        },
        error: (error) => {
          this.toastr.error(error.error,"Falha ao tentar Cadastrar Venda!");
        }
      })
    }
  }

  get itensForms(){
    return <FormArray<UntypedFormGroup>>this.form.controls["itens"];
  }

  addItem(){
    this.itensForms.push(this.gerarItem({ id: 0 , quantidade: 1 } as ItensVenda));
  }

  gerarItem(item : ItensVenda) : UntypedFormGroup{
    return this.fb.group({
      id:[item.id],
      nomeProduto:[item.nomeProduto,Validators.required],
      quantidade:[item.quantidade,Validators.required],
      vlUnitario:[item.vlUnitario,Validators.required],
      desconto:[item.desconto],
      vlTotal:[item.vlTotal],
    });
  }

  deleteItem(index : number){
    this.itensForms.removeAt(index);
    this.calcularTotalVenda();

  }


  calcularTotal(i : number){

    console.log(i);
    const {quantidade , vlUnitario , desconto} = this.itensForms.at(i).value;

    let valor = vlUnitario * quantidade;

    console.log(valor);

    if(desconto > valor && quantidade > 0){
      this.itensForms.at(i).get("desconto")?.setValue(0);
      this.toastr.error("Desconto maior que o valor do produto")
    }
    else{
      valor -= desconto;
      this.itensForms.at(i).get("vlTotal")?.setValue(valor);
      this.calcularTotalVenda();
    }
  }

  calcularTotalVenda(){
    let valorTotal = 0;

    for (let i = 0; i < this.itensForms.controls.length; i++) {
      valorTotal += this.itensForms.at(i).get("vlTotal")?.value;
    }

    this.form.get("totalVenda")?.setValue(valorTotal);
  }

  excluirItem(i : number){
    this.itensForms.removeAt(i);
    this.calcularTotalVenda();
  }
}
