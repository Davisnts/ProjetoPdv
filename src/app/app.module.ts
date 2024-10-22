import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { VendasListaComponent } from './components/vendas/vendas-lista/vendas-lista.component';
import { ClienteDetalharComponent } from './components/clientes/cliente-detalhar/cliente-detalhar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { ModalConfirmaçãoComponent } from './shared/utils/components/ModalConfirmação/ModalConfirmação.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ModalTemplateComponent } from './shared/utils/components/ModalTemplate/ModalTemplate.component';
import { provideEnvironmentNgxCurrency, NgxCurrencyInputMode, NgxCurrencyDirective } from 'ngx-currency';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClienteListaComponent,
    VendasListaComponent,
    ClienteDetalharComponent,
    ModalConfirmaçãoComponent,
    ModalTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe,
    NgxCurrencyDirective
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNgxMask(),
    provideEnvironmentNgxCurrency({
      align: "right",
      allowNegative: true,
      allowZero: true,
      decimal: ",",
      precision: 2,
      prefix: "R$ ",
      suffix: "",
      thousands: ".",
      nullable: true,
      min: null,
      max: null,
      inputMode: NgxCurrencyInputMode.Financial,
    }),

  ],
  bootstrap: [AppComponent],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ]


})
export class AppModule { }
