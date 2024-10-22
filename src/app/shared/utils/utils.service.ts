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
  console.log(formulario);

  campos.forEach(campo => {
    let campoFormulario = formulario.get(campo.campoNome);
    console.log(campoFormulario);
    campo.validators.forEach((validator: any )  =>{
      if(campoFormulario.hasError(validator.nome)){
        campoFormulario.markAsTouched();
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
    return false;
  }
  else{
    return true
  }
}

retornaValidators(campo : string,campos : any[]){
  return campos.find(c => c.campoNome == campo).validators;
}

}
