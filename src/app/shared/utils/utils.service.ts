import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor(private toastr: ToastrService) { }

validarFormulario(campos : any[],formulario : any){
  let mensagemErro = "";
  let qtdErros = 0;
  campos.forEach(campo => {
    let campoFormulario = formulario.get(campo.campoNome);
    campo.validators.forEach((validator: any )  =>{
      if(campoFormulario.hasError(validator.nome)){
        mensagemErro += `${validator.mensagemErro}<br/>`;
        qtdErros++;
      }
    })
  })
  if(qtdErros > 0){
    this.toastr.error(mensagemErro, "",{
      closeButton:false,
      timeOut: 3000,
      enableHtml: true,
    });
  }
}

}
