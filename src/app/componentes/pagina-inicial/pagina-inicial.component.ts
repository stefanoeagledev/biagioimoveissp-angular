// src/app/componentes/pagina-inicial/pagina-inicial.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaApartamentosComponent } from '../lista-apartamentos/lista-apartamentos.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, ListaApartamentosComponent],
  template: `
    <main class="pagina-inicial-container">
      <h1>Bem-vindo(a) ao Biagio Imóveis SP</h1>
      <app-lista-apartamentos></app-lista-apartamentos>
    </main>
  `,
  styles: [
    `
      .pagina-inicial-container {
        margin: 1rem;
      }
      .pagina-inicial-container h1 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.75rem;
        color: #2c3e50;
      }
    `,
  ],
})
export class PaginaInicialComponent {}
