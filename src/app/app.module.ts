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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClienteListaComponent,
    VendasListaComponent,
    ClienteDetalharComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ]

})
export class AppModule { }
