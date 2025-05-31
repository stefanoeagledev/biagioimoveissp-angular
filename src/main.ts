// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { PaginaInicialComponent } from './app/componentes/pagina-inicial/pagina-inicial.component';
import { ImovelDetalheComponent } from './app/componentes/imovel-detalhe/imovel-detalhe.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: PaginaInicialComponent },
      { path: 'imovel/:id', component: ImovelDetalheComponent },
      // { path: '**', redirectTo: '' }
    ]),
  ],
}).catch((err) => console.error(err));
