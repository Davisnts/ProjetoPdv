import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetorr';
  datePickerConfig = {
    drops: 'up',
    format: 'dd/MM/yyyy'
  }
  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Nenhum Item encontrado';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
}
}
