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


validarFormularioArray(campos : any[],formulario : any){
  let mensagemErro = "";
    let qtdErros = 0;
    let qtdItens  = formulario.controls.length;

    for (let i = 0; i < formulario.controls.length; i++) {
     campos.forEach((campo) =>{
        let campoFormulario = formulario.at(i).get(campo.campoNome);
        campo.validators.forEach((validator : any)=>{
          if(campoFormulario?.hasError(validator.nome)){
            campoFormulario.markAsTouched();
            mensagemErro += `<small> <b>Item: ${i}</b><br/>${validator.mensagemErro}</small><br/>  `;
            qtdErros++;
          }
        })
      })

    }
    if(qtdErros > 0){
      this.toastr.error(mensagemErro, "",{
        closeButton:false,
        timeOut: 3000,
        enableHtml: true,
      });
      return false;
    }
    else{
      return true;
    }
}

retornaValidators(campo : string,campos : any[]){
  return campos.find(c => c.campoNome == campo).validators;
}


}
